import model from '../../models';
import Helper from '../utils/helper';

const { Route } = model;
const helper = new Helper();

class Routes {
  static create(req, res) {
    const response = req.t('route_message.created_successfully');
    const Allrequired = req.t('route_message.fields_required');
    const emptySource = req.t('route_message.empty_source');
    const InvalidSource = req.t('route_message.Invalid_source');
    const emptyDestination = req.t('route_message.empty_destination');
    const InvalidDestination = req.t('route_message.Invalid_destination');
    const emptyDistance = req.t('route_message.empty_distance');
    const InvalidDistance = req.t('route_message.Invalid_distance');
    const uniqueBusstop = req.t('route_message.uniqueBusstop');
    const empptyBusstop = req.t('route_message.emptybusstop');
    const missingBusstop = req.t('route_message.missingBusstop');
    const duplicatesBusstop = req.t('route_message.duplicateBusstop');
    const { source, destination, distance, busStop } = req.body;

    if (source.length === 0) {
      return res.status(400).json({
        message: `${emptySource}`,
      });
    }
    if (!/^[A-Za-z]+$/.test(source)) {
      return res.status(400).json({
        message: `${InvalidSource}`,
      });
    }
    if (destination.length === 0) {
      return res.status(400).json({
        message: `${emptyDestination}`,
      });
    }
    if (!/^[A-Za-z]+$/.test(destination)) {
      return res.status(400).json({
        message: `${InvalidDestination}`,
      });
    }
    if (distance.length === 0) {
      return res.status(400).json({
        message: `${emptyDistance}`,
      });
    }
    if (!/^[+-]?\d+(\.\d+)?$/.test(distance)) {
      return res.status(400).json({
        message: `${InvalidDistance}`,
      });
    }
    if (busStop.length === 0) {
      return res.status(400).json({
        message: `${empptyBusstop}`,
      });
    }
    if (
      source === '' ||
      destination === '' ||
      distance === '' ||
      busStop === ''
    ) {
      return res.status(400).send({
        message: `${Allrequired}`,
      });
    }
    for (let i = 0; i <= busStop.length; i++) {
      if (busStop[i] === '') {
        return res.status(400).json({
          message: `${missingBusstop}`,
        });
      }
      i = i + 1;
    }
    for (let j = 0; j <= busStop.length; j++) {
      for (let k = 0; k <= busStop.length; k++) {
        if (j !== k) {
          if ((busStop[j] || busStop[k]) === '') {
            return res.status(400).json({
              message: `${missingBusstop}`,
            });
          }
          if (busStop[j] === busStop[k]) {
            return res.status(400).json({
              message: `${duplicatesBusstop}`,
            });
          }
        }
      }
    }

    return helper
      .checkPermission(req.user.user.roleId, 'create route')
      .then((rolepermission) => {
        if (rolepermission) {
          Route.create({
            source,
            destination,
            distance,
            busStop,
          })
            .then((routeData) =>
              res.status(201).send({
                success: true,
                message: `${response}`,
                routeData,
              })
            )
            .catch((error) =>
              res.status(400).json({
                message: `${uniqueBusstop}`,
                error,
              })
            );
        }
      })
      .catch((err) => res.status(400).json({ message: err.message }));
  }

  // list all routes
  static listAll(req, res) {
    const Badresponse = req.t('route_message.Routes_notFound');
    return Route.findAll()
      .then((routeobject) => {
        if (!routeobject) {
          res.status(200).json({
            message: `${Badresponse}`,
          });
        } else {
          res.status(200).json({
            routeobject,
          });
        }
      })
      .catch((error) =>
        res.status(404).json({
          status: 404,
          error,
        })
      );
  }

  // list one route
  static list(req, res) {
    const response = req.t('route_message.getaRoute');
    const Badresponse = req.t('route_message.route_notFound');
    const id = req.params.id;
    Route.findByPk(id)
      .then((createdata) => {
        if (createdata) {
          res.json({
            success: true,
            message: `${response}`,
            data: createdata,
          });
        } else {
          res.status(404).json({
            status: 404,
            message: `${Badresponse}`,
          });
        }
      })
      .catch((error) =>
        res.status(400).json({
          error,
        })
      );
  }

  // update route
  static modify(req, res) {
    const response = req.t('route_message.updated_successfully');
    const Routeexists = req.t('route_message.AlreadyexistsRoute');
    const Updatefails = req.t('route_message.update_fails');
    const { source, destination, distance, busStop } = req.body;
    if (
      source === '' ||
      destination === '' ||
      distance === '' ||
      busStop === ''
    ) {
      return res.status(400).send({
        message: `${Updatefails}`,
      });
    }
    return helper
      .checkPermission(req.user.user.roleId, 'update route')
      .then((rolepermission) => {
        if (rolepermission)
          Route.findByPk(req.params.id)
            .then((route) => {
              route
                .update({
                  source: source || route.source,
                  destination: destination || route.destination,
                  distance: distance || route.distance,
                  busStop: busStop || route.busStop,
                })
                .then((updatedRoute) => {
                  res.status(200).json({
                    message: `${response}`,
                    data: {
                      source: source || updatedRoute.source,
                      destination: destination || updatedRoute.destination,
                      distance: distance || updatedRoute.distance,
                      busStop: busStop || updatedRoute.busStop,
                    },
                  });
                })
                .catch((error) =>
                  res.status(400).json({
                    message: `${Routeexists}`,
                    error,
                  })
                );
            })
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
      })
      .catch((err) => res.status(400).json({ message: err.message }));
  }

  static delete(req, res) {
    const response = req.t('route_message.delete_successfully');
    const feedback = req.t('route_message.delete_impossible');
    return helper
      .checkPermission(req.user.user.roleId, 'delete route')
      .then((rolepermission) => {
        if (rolepermission) {
          Route.findByPk(req.params.id)
            .then((route) => {
              if (!route) {
                return res.status(400).json({
                  message: `${feedback}`,
                });
              }
              return route
                .destroy()
                .then(() =>
                  res.status(200).json({
                    message: `${response}`,
                  })
                )
                .catch((error) =>
                  res.status(400).json({
                    error,
                  })
                );
            })
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        }
      })
      .catch((err) => res.status(400).json({ message: err.message }));
  }
}
export default Routes;
