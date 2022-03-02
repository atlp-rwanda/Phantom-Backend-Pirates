import model from '../../models'

const { Route } = model

class Routes {
  static create (req, res) {
    const { source, destination, distance, busStop } = req.body
    return Route
      .create({
        source,
        destination,
        distance,
        busStop
      })
      .then(userData => res.status(201).send({
        success: true,
        message: 'Route successfully created',
        userData
      }))
      .catch(error => res.status(400).send('already exist'))
  }

  // list all routes
  static listAll (req, res) {
    return Route
      .findAll()
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error))
  }

  // list one user route
  static list (req, res) {
    const id = req.params.id
    Route.findByPk(id)
      .then(createdata => {
        if (createdata) {
          res.json({
            success: true,
            message: 'Route fetch Successfully',
            data: createdata
          })
        } else {
          res.status(400).send({ status: 400, message: 'route id not found' })
        }
      })
      .catch(error => res.status(400).send(error))
  }

  // update  route
  static modify (req, res) {
    try {
      const id = req.params.id
      Route.update(req.body, {
        where: { id: id }
      })
        .then(finddata => {
          if (finddata == 1) {
            res.send({
              success: true,
              message: 'Route Updated Successfully',
              data: finddata
            })
          } else {
            res.send({
              message: `Cannot delete Route with id=${id}. Maybe route was not found!`
            })
          }
        })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        success: false,
        message: 'Something went wrong!'
      })
    }
  }

  static delete (req, res) {
    return Route
      .findByPk(req.params.id)
      .then(route => {
        if (!route) {
          return res.status(400).send({
            message: 'route Not Found'
          })
        }
        return route
          .destroy()
          .then(() => res.status(200).send({
            message: 'route successfully deleted'
          }))
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  }
}

export default Routes
