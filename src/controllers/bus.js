import model from '../../models'

const { Bus, Route } = model

class Buses {
  // create bus
  static create (req, res) {
    const busSuccessResponse = req.t('bus_message.created_success')
    const busExistResponse = req.t('bus_message.bus_exist')
    const busFieldResponse = req.t('bus_message.empty_field')
    const busPlateResponse = req.t('bus_message.invalid_plate')
    const busCategoryResponse = req.t('bus_message.category_valid')
    const busSeatResponse = req.t('bus_message.seat_valid')
    const { plate, category, seat, status } = req.body
    const { cid } = req.params

    if (plate === '' || category === '' || seat === '') {
      return res.status(400).send({
        message: `${busFieldResponse}`
      })
    }
    if (!/^[R]*[A-Z]{2}[0-9]{3}[A-Z]{1}$/.test(plate)) {
      return res.status(400).send({
        message: `${busPlateResponse}`
      })
    }
    if (!/^[A-Za-z]+$/.test(category)) {
      return res.status(400).send({
        message: `${busCategoryResponse}`
      })
    }
    if (!/^[0-9]*$/.test(seat)) {
      return res.status(400).send({
        message: `${busSeatResponse}`
      })
    }
    return Bus.create({
      plate,
      category,
      seat,
      status,
      cid
    })
      .then((bus) =>
        res.status(201).send({
          message: `${busSuccessResponse}`,
          bus
        })
      )
      .catch((error) => {
        res.status(400).send({ message: `${busExistResponse}` })
        console.log(error)
      })
  }

  // list all buses
  static listAll (req, res) {
    const Norecord = req.t('bus_message.no_record')
    return Bus.findAll()
      .then((listbus) => {
        if (listbus.length === 0) {
          res.status(400).send({
            message: `${Norecord}`
          })
        } else {
          res.status(200).send(listbus)
        }
      })
      .catch((error) => res.status(400).send(error))
  }

  // list Bus by Id
  static findbus (req, res) {
    const Badresponse = req.t('bus_message.id_not_found')
    const id = req.params.id

    return Bus.findAll({
      where: {
        id: id
      },
      attributes: {
        exclude: ['cid', 'rout_id', 'createdAt', 'updatedAt']
      },
      include: {
        model: Route,
        attributes: ['source', 'destination', 'busStop']
      }
    })
      .then((busObject) => {
        if (busObject.length === 0) {
          res.status(400).json({
            message: `${Badresponse}`
          })
        } else {
          res.status(200).json({
            busObject
          })
        }
      })
      .catch((error) => res.status(400).json({ status: 400, error }))
  }

  // update

  static modify (req, res) {
    const busUpdatedResponse = req.t('bus_message.bus_updated')
    const busExistResponse = req.t('bus_message.bus_exist')
    const busFieldResponse = req.t('bus_message.empty_field')
    const busPlateResponse = req.t('bus_message.invalid_plate')
    const busNotFoundResponse = req.t('bus_message.id_not_found')
    const busCategoryResponse = req.t('bus_message.category_valid')
    const busSeatResponse = req.t('bus_message.seat_valid')
    const { plate, category, seat } = req.body
    if (plate === '' || category === '' || seat === '') {
      return res.status(400).send({
        message: `${busFieldResponse}`
      })
    }
    if (!/^[R]*[A-Z]{2}[0-9]{3}[A-Z]{1}$/.test(plate)) {
      return res.status(400).send({
        message: `${busPlateResponse}`
      })
    }
    if (!/^[A-Za-z]+$/.test(category)) {
      return res.status(400).send({
        message: `${busCategoryResponse}`
      })
    }
    if (!/^[0-9]*$/.test(seat)) {
      return res.status(400).send({
        message: `${busSeatResponse}`
      })
    }
    return Bus.findByPk(req.params.id)
      .then((bus) => {
        bus
          .update({
            plate: plate || bus.plate,
            category: category || bus.category,
            seat: seat || bus.seat
          })
          .then((updatedBus) => {
            res.status(200).send({
              message: `${busUpdatedResponse}`,
              data: {
                plate: plate || updatedBus.plate,
                category: category || updatedBus.category,
                seat: seat || updatedBus.seat
              }
            })
          })
          .catch((error) => {
            res.status(400).send({
              message: `${busExistResponse}`
            })
            console.log(error)
          })
      })
      .catch((error) => {
        res.status(400).send({
          message: `${busNotFoundResponse}`
        })
        console.log(error)
      })
  }
  // delete

  static delete (req, res) {
    const busNotFoundResponse = req.t('bus_message.id_not_found')
    const busDeleteResponse = req.t('bus_message.bus_deleted')
    return Bus.findByPk(req.params.id)
      .then((bus) => {
        if (!bus) {
          return res.status(400).send({
            message: `${busNotFoundResponse}`
          })
        }
        return bus.destroy().then(() =>
          res.status(200).send({
            message: `${busDeleteResponse}`
          })
        )
      })
      .catch((error) => res.status(400).send(error))
  }
}

export default Buses
