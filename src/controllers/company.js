import model from '../../models';
const { Company } = model;

class Companies {
  static create(req, res) {
    const companySuccessResponse = req.t('company_message.created_success');
    const companyExistResponse = req.t('company_message.company_exist');
    const companyFieldResponse = req.t('company_message.empty_field');
    const { name, email } = req.body;
    if (name === '' || email === '') {
      return res.status(400).send({
        message: `${companyFieldResponse}`,
      });
    }
    return Company.create({
      name,
      email,
    })
      .then((userData) =>
        res.status(201).send({
          success: true,
          message: `${companySuccessResponse}`,
          userData,
        })
      )
      .catch((error) => {
        res.status(400).send(`${companyExistResponse}`);
        console.log(error);
      });
  }

  // list all Company
<<<<<<< HEAD
  static listAll (req, res) {
    const Norecord = req.t('company_message.no_record')
    return Company
      .findAll()
      .then(companies => {
        if (companies.length === 0) {
          return res.status(400).send({
            message: `${Norecord}`
          })
<<<<<<< HEAD
=======
        } else {
          return res.status(200).send(companies)
=======
  static listAll(req, res) {
    const companyNotFoundResponse = req.t('company_message.id_not_found');
    return Company.findAll()
      .then((users) => {
        if (users === 0) {
          return res.status(400).send({
            message: `${companyNotFoundResponse}`,
          });
>>>>>>> 12a507c (crud bus feature)
>>>>>>> 9a3fc3d (crud bus feature)
        }
        return res.status(200).send(users);
      })

      .catch((error) => res.status(400).send(error));
  }

<<<<<<< HEAD
  // list one Company
  static list (req, res) {
    const companyNotFoundResponse = req.t('company_message.id_not_found')
    const id = req.params.id
=======
  // list one uCompany
  static list(req, res) {
    const companyNotFoundResponse = req.t('company_message.id_not_found');
    const id = req.params.id;
>>>>>>> 12a507c (crud bus feature)
    Company.findByPk(id)
      .then((createdata) => {
        if (createdata) {
          res.json({
            success: true,
            data: createdata,
          });
        } else {
          res.status(400).send(`${companyNotFoundResponse}`);
        }
      })
      .catch((error) => res.status(400).send(error));
  }

  // update  Company
  static modify(req, res) {
    const companySuccessResponse = req.t('company_message.company_updated');
    const companyExistResponse = req.t('company_message.company_exist');
    const companyFieldResponse = req.t('company_message.empty_field');
    const companyNotFoundResponse = req.t('company_message.id_not_found');
    try {
      const { name, email } = req.body;
      if (name === '' || email === '') {
        return res.status(400).send({
          message: `${companyFieldResponse}`,
        });
      }
      const id = req.params.id;
      Company.update(req.body, {
        where: { id: id },
      }).then((finddata) => {
        if (req.body === '') {
          return res.status(400).send({
            message: `${companyFieldResponse}`,
          });
        }
        if (finddata === 1) {
          res.send({
            success: true,
            message: `${companySuccessResponse}`,
            data: finddata,
          });
        } else {
          res.send({
            message: `${companyNotFoundResponse}`,
          });
        }
      });
    } catch (err) {
      res.status(500).json(`${companyExistResponse}`);
    }
  }

  // delete
  static delete(req, res) {
    const companyNotFoundResponse = req.t('company_message.id_not_found');
    const companyDeleteResponse = req.t('company_message.company_deleted');
    return Company.findByPk(req.params.id)
      .then((company) => {
        if (!company) {
          return res.status(400).send({
            message: `${companyNotFoundResponse}`,
          });
        }
        return company.destroy().then(() =>
          res.status(200).send({
            message: `${companyDeleteResponse}`,
          })
        );
      })
      .catch((error) => res.status(400).send(error));
  }
}

export default Companies;
