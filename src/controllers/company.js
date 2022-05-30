import model from '../../models'
const { Company } = model

class Companies {
  // create company
  static create (req, res) {
    const companySuccessResponse = req.t('company_message.created_success')
    const companyExistResponse = req.t('company_message.company_exist')
    const companyFieldResponse = req.t('company_message.empty_field')
    const companyValidName = req.t('company_message.valid_name')
    const companyValidEmail = req.t('company_message.valid_email')
    const { name, email } = req.body
    if (name === '' || email === '') {
      return res.status(400).json({
        message: `${companyFieldResponse}`
      })
    }
    if (!/^[A-Za-z0-9!@#$&()`.+,\\\/"-]+$/.test(name)) {
      return res.status(400).json({
        message: `${companyValidName}`
      })
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      return res.status(400).json({
        message: `${companyValidEmail}`
      })
    }
    return Company.create(
      {
      name,
      email
    }
    )
      .then((userData) =>
      {
        res.status(201).json({
          success: true,
          message: `${companySuccessResponse}`,
          userData
        })
      }
      )
      .catch((error) => {
        res.status(400).json({
          message: `${companyExistResponse}`
        })
      })
  }

  // list all Company
  static listAll (req, res) {
    const Norecord = req.t('company_message.no_record')
    return Company.findAll()
      .then((companies) => {
        if (companies.length === 0) {
          return res.status(200).json({
            data: companies,
            message: `${Norecord}`
          })
        }else {
          res.status(200).json(companies)
        }
      })

      .catch((error) => res.status(400).json(error))
  }

  // list one Company
  static list (req, res) {
    const companyNotFoundResponse = req.t('company_message.id_not_found')
    const id = req.params.id
    Company.findByPk(id)
      .then((createdata) => {
        if (createdata) {
          res.json({
            success: true,
            data: createdata
          })
        } else {
          res.status(400).json({
            message: `${companyNotFoundResponse}`
          })
        }
      })
      .catch((error) => res.status(400).json(error))
  }

  // update  Company
  static modify (req, res) {
    const companySuccessResponse = req.t('company_message.company_updated')
    const companyExistResponse = req.t('company_message.company_exist')
    const companyFieldResponse = req.t('company_message.empty_field')
    const companyNotFoundResponse = req.t('company_message.id_not_found')
    const companyValidName = req.t('company_message.valid_name')
    const companyValidEmail = req.t('company_message.valid_email')
    const { name, email } = req.body
    if (name === '' || email === '') {
      return res.status(400).json({
        message: `${companyFieldResponse}`
      })
    }
    if (!/^[A-Za-z0-9!@#$&()`.+,\\\/"-]+$/.test(name)) {
      return res.status(400).json({
        message: `${companyValidName}`
      })
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      return res.status(400).json({
        message: `${companyValidEmail}`
      })
    }
    return Company.findByPk(req.params.id)
      .then((company) => {
        company
          .update({
            name: name || company.name,
            email: email || company.email
          })
          .then((updatedCompany) => {
            res.status(200).json({
              message: `${companySuccessResponse}`,
              data: {
                name: name || updatedCompany.name,
                email: email || updatedCompany.email
              }
            })
          })
          .catch((error) => {
            res.status(400).json({
              message: `${companyExistResponse}`
            })
          })
      })
      .catch((error) => {
        res.status(400).json({
          message: `${companyNotFoundResponse}`
        })
      })
  }

  // delete
  static delete (req, res) {
    const companyNotFoundResponse = req.t('company_message.id_not_found')
    const companyDeleteResponse = req.t('company_message.company_deleted')
    return Company.findByPk(req.params.id)
      .then((company) => {
        if (!company) {
          return res.status(400).json({
            message: `${companyNotFoundResponse}`
          })
        }
        return company.destroy().then(() =>
          res.status(200).json({
            message: `${companyDeleteResponse}`
          })
        )
      })
      .catch((error) => res.status(400).json(error))
  }
}

export default Companies
