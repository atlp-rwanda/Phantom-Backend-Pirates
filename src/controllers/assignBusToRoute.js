import model from '../../models'

const { Bus } = model

class Buses {
  static assignBus (req, res) {
    const assignSucces = req.t('assign_bus.assign_success')
    const assignExist = req.t('assign_bus.assign_exist')

    const busId = req.params.busId
    const routeId = req.params.routeId

    return Bus.findByPk(busId)
      .then((found) => {
        found.rout_id
          ? res.status(400).json({
            message: `${assignExist}`
          })
          : Bus
            .update({
              rout_id: routeId
            },{
              return: true
            }
            )
            .then((bus) => {
              res.status(200).json({
                message: `${assignSucces}`,
                bus
              })
            })
      })
      .catch((error) => res.status(400).json({ error }))
  }

  static busAssociatedToRoute (req, res) {
    const noBusAssigned = req.t('assign_bus.no_bus_assigned')
    const routeNotFound = req.t('assign_bus.no_route')
    return Bus.findAll({
      where: { rout_id: req.params.routeId }
    })
      .then((routes) => {
        routes.length === 0
          ? res.json({ message: `${noBusAssigned}` })
          : res.status(200).json({ success: true, routes })
      })
      .catch((err) => {
        res.status(400).json({ message: `${routeNotFound}`, err })
      })
  }
}

export default Buses
