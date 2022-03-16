import model from '../../models'

const { Route, Bus } = model

class Routes {
  static findbus (req, res) {
    const Badresponse = req.t('view_bus.view_message')
    const { source, destination } = req.body
    return Route
      .findAll({
        where: {
          source: source,
          destination: destination
        },
        attributes: {
          exclude: ['id', 'distance', 'createdAt', 'updatedAt']
        },
        include: {
          model: Bus,
          attributes: ['plate', 'seat']
        },
        order: [
          ['id', 'DESC'],
          [{ model: Bus }, 'createdAt', 'DESC']
        ]
      })
      .then(routeobject => {
        if (routeobject.length === 0) {
          res.status(400).json({
            message: `${Badresponse}`
          })
        } else {
          res.status(200).json({
            routeobject
          })
        }
      })
      .catch(error => res.status(400).json({
        status: 400,
        error
      })
      )
  }
}
export default Routes
