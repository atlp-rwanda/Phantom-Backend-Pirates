import model from '../../models'

const { Company } = model

class Companies {
  static create (req, res) {
    const { name, email } = req.body
    if (name === '' || email === '') {
      return res.status(400).send({
        message: 'all field required'
      })
    }
    return Company
      .create({
        name,
        email
      })
      .then(userData => res.status(201).send({
        success: true,
        message: 'Company successfully created',
        userData
      }))
      .catch(error => res.status(400).send('already in use'))
  }

  // list all Company
  static listAll (req, res) {
    return Company
      .findAll()
      .then(users => {
        if (users == 0) {
          return res.status(400).send({
            message: 'company Not Found'
          })
        }
        return res.status(200).send(users)
      })

      .catch(error => res.status(400).send(error))
  }

  // list one uCompany
  static list (req, res) {
    const id = req.params.id
    Company.findByPk(id)
      .then(createdata => {
        if (createdata) {
          res.json({
            success: true,
            message: 'Company fetch Successfully',
            data: createdata
          })
        } else {
          res.status(400).send('Company not found')
        }
      })
      .catch(error => res.status(400).send(error))
  }

  // update  Company
  static modify (req, res) {
    try {
      const id = req.params.id
      Company.update(req.body, {
        where: { id: id }
      })
        .then(finddata => {
          if (req.body == '') {
            return res.status(400).send({
              message: 'all field required'
            })
          }
          if (finddata == 1) {
            res.send({
              success: true,
              message: 'Company Updated Successfully',
              data: finddata
            })
          } else {
            res.send({
              message: `Cannot delete Company with id=${id}. Maybe user was not found!`
            })
          }
        })
    } catch (err) {
      console.log(err)
      res.status(500).json(err.message)
    }
  }

  // delete
  static delete (req, res) {
    return Company
      .findByPk(req.params.id)
      .then(company => {
        if (!company) {
          return res.status(400).send({
            message: 'Company Not Found'
          })
        }
        return company
          .destroy()
          .then(() => res.status(200).send({
            message: 'Company successfully deleted'
          }))
          .catch(error => res.status(400).send(error))
      })
      .catch(error => res.status(400).send(error))
  }
}

export default Companies
