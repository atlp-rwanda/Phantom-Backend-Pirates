import model from '../../models';
import Helper from '../utils/helper';

const { Bus } = model;
const helper = new Helper();

class Buses {
  static assignBus(req, res) {
    console.log(req.user.user.roleId);
    const assignSucces = req.t('assign_bus.assign_success');
    const assignExist = req.t('assign_bus.assign_exist');

    const busId = req.params.busId;
    const routeId = req.params.routeId;

    return helper
      .checkPermission(req.user.user.roleId, 'assign drive to bus')
      .then((rolePerm) => {
        if (rolePerm) {
          Bus.findByPk(req.params.busId)
            .then((bus) => {
              bus.rout_id
                ? res.status(400).json({
                    message: `${assignExist}`,
                  })
                : bus
                    .update({
                      rout_id: req.params.routeId,
                    })
                    .then((updatedBus) => {
                      res.status(200).json({
                        message: `${assignSucces}`,
                        bus,
                      });
                    });
            })
            .catch((error) =>
              res.status(400).json({ message: 'bus not found' })
            );
        }
      })
      .catch((err) => res.status(400).json({ message: err.message }));
  }

  static busAssociatedToRoute(req, res) {
    const noBusAssigned = req.t('assign_bus.no_bus_assigned');
    const routeNotFound = req.t('assign_bus.no_route');
    return Bus.findAll({
      where: { rout_id: req.params.routeId },
    })
      .then((routes) => {
        routes.length === 0
          ? res.json({ message: `${noBusAssigned}` })
          : res.status(200).json({ success: true, routes });
      })
      .catch((err) => {
        res.status(400).json({ message: `${routeNotFound}`, err });
      });
  }
}

export default Buses;
