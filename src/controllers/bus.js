import model from '../../models'

const { Bus } = model

class Buses {
  static create (req, res) {
    const { plate, category, seat } = req.body
    const { cid } = req.params
    const re = new RegExp('^[R]*[A-Z]{2}[\w ][0-9]{3}[\w ][A-Z]{1}$')
    if (!re.test(plate)) {
      return res.status(400).send({
        message: 'Enter valid plate number'
      })
    }
    if (plate === '' || category === '' || seat === '') {
      return res.status(400).send({
        message: 'all field required'
      })
    }

    return Bus
      .create({
        plate,
        category,
        seat,
        cid
      })
      .then(bus => res.status(201).send({
        message: `Your Bus with the plate ${plate} has been created successfully `,
        bus
      }))
      .catch(error => res.status(400).send({
        message: 'insert valid data'
      }))
  }

  // list all buses
  static listAll (req, res) {
    return Bus
      .findAll()
      .then(listbus => {
        if (!listbus) {
          res.status(200).send('no record')
        } else {
          res.status(200).send(listbus)
        }
      })
      .catch(error => res.status(400).send(error))
  }

  // list Bus by Id
  static list (req, res) {
    const id = req.params.id
    Bus.findByPk(id)
      .then(createdata => {
        if (createdata) {
          res.json({
            success: true,
            message: 'Bus fetch Successfully',
            data: createdata
          })
        } else {
          res.status(400).send('Bus not found')
        }
      })
      .catch(error => res.status(400).send(error))
  }

  static delete (req, res) {
    return Bus
      .findByPk(req.params.id)
      .then(bus => {
        if (!bus) {
          return res.status(400).send({
            message: 'Bus Not Found'
          })
        }
        return Bus
          .destroy()
          .then(() => res.status(200).send({
            message: 'bus successfully deleted'
          }))
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  }

  // update

  static modify (req, res) {
    const { plate, category, seat } = req.body
    if (plate == '' || category == '' || seat == '') {
      return res.status(400).send({
        message: 'all field required'
      })
    }
    return Bus
      .findByPk(req.params.bId)
      .then((bus) => {
        bus.update({
          plate: plate || bus.plate,
          category: category || bus.category,
          seat: seat || bus.seat
        })
          .then((updatedBus) => {
            res.status(200).send({
              message: 'Bus updated successfully',
              data: {
                plate: plate || updatedBus.plate,
                category: category || updatedBus.category,
                seat: seat || updatedBus.seat
              }
            })
          })
          .catch(error => res.status(400).send({ message: 'Already exist' }))
      })
      .catch(error => res.status(400).send(error))
  }
}

export default Buses
