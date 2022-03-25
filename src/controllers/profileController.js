import model from '../../models'

const { Profile } = model
const { Employee } = model
const { Role } = model
class Profiles {
  static create (req, res) {
    const { telephone, firstname, lastname, profilePic, address, dateOfBirth, gender } = req.body
    const { employeeId } = req.params
    const invalidFirstName = req.t('field_error_message.first_name_message.invalid_first_name')
    const empytFirstName = req.t('field_error_message.first_name_message.empty_first_name')
    const invalidLastName = req.t('field_error_message.last_name_message.invalid_last_name')
    const empytLastName = req.t('field_error_message.last_name_message.empty_last_name')
    const emptyTelephone = req.t('profile-update.telephone.empty')
    const invalidTelephone = req.t('profile-update.telephone.invalid')
    const createdSuccess = req.t('profile-update.create.success')
    const invalidDateOfBirth = req.t('profile-update.dateOfBirth.invalid')
    const emptyDateOfBirth = req.t('profile-update.dateOfBirth.empty')

    const getAge = (birthDateString) => {
      const today = new Date()
      const birthDate = new Date(birthDateString)
      const yearsDifference = today.getFullYear() - birthDate.getFullYear()
      if (
        today.getMonth() < birthDate.getMonth() ||
         (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
      ) {
        return yearsDifference - 1
      }

      return yearsDifference
    }

    if (firstname.length === 0) {
      return res.status(400).json({
        message: `${empytFirstName}`
      })
    }
    if (!(/^[A-Za-z]+$/).test(firstname)) {
      return res.status(400).json({
        message: `${invalidFirstName}`
      })
    }
    if (lastname.length === 0) {
      return res.status(400).json({
        message: `${empytLastName}`
      })
    }
    if (!(/^[A-Za-z]+$/).test(lastname)) {
      return res.status(400).json({
        message: `${invalidLastName}`
      })
    }
    if (telephone.length === 0) {
      return res.status(400).json({
        message: `${emptyTelephone}`
      })
    }
    /* eslint-disable */
    if (!(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(telephone))) {
      return res.status(400).json({
        message: `${invalidTelephone}`
      }).catch((error) => console.log(error))
    }
    if (dateOfBirth.length === 0) {
      return res.status(400).json({
        message: `${emptyDateOfBirth}`
      })
        .catch((error) => console.log(error))
    }
    if (!(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).test(dateOfBirth)) {
      return res.status(400).json({
        message: `${invalidDateOfBirth}`
      })
    }
    if ((getAge(dateOfBirth) < 18) || (getAge(dateOfBirth) > 60)) {
      return res.status(400).json({
        message: 'Your not of legal working age'
      })
        .catch((error) => console.log(error))
    }

    return Profile
      .create({
        telephone, firstname, lastname, profilePic, address, dateOfBirth, gender, employeeId
      })
      .then((profile) => {
        res.status(201).json({
          success: true,
          message: `${createdSuccess}`,
          profile: {
            telephone: profile.telephone,
            firstname: profile.firstname,
            lastname: profile.lastname,
            profilePic: profile.profilePic,
            address: profile.address,
            dateOfBirth: profile.dateOfBirth,
            gender: profile.gender,
            employeeId: profile.employeeId
          }
        })
      })
      .catch(error => res.status(400).json(error))
  }

  static list (req, res) {
    const profilesNotFound = req.t('profile-update.profilesNotFound')
    return Profile
      .findAll()
      .then(profiles => {
        if (profiles.length === 0) {
          res.status(400).json({
            message: `${profilesNotFound}`
          })
        } else {
          res.status(200).json({
            profiles
          })
        }
      })
      .catch(error => res.status(400).json({
        status: 400,
        error
      })
      )
  }

  static listOne (req, res) {
    const profileNotFound = req.t('profile-update.profileNotFound')
    return Profile
      .findByPk(req.params.id)
      .then((profile) => {
        if (profile) {
          res.status(200).json(profile)
        } else {
          res.status(400).json({ message: `${profileNotFound}` })
        }
      })
      .catch((error) => console.log(error))
  }

  static EmployeeProfile (req, res) {
    const profileNotFound = req.t('profile-update.profileNotFound')
    return Profile
      .findOne({
        where: { employeeId: req.params.id },
        attributes: { exclude: ['createdAt', 'updatedAt', 'employeeId'] },
        include: [
          { model: Employee, include: { model: Role, attributes: ['role'] }, attributes: { exclude: ['roleId', 'password', 'createdAt', 'updatedAt', 'firstname', 'lastname'] } }
        ]
      })
      .then((profile) => {
        if (profile) {
          res.status(200).json(profile)
        } else {
          res.status(400).json({ message: `${profileNotFound}` })
        }
      })
      .catch((error) => console.log(error))
  }

  static update (req, res) {
    const { telephone, profilePic, address } = req.body
    const emptyTelephone = req.t('profile-update.telephone.empty')
    const invalidTelephone = req.t('profile-update.telephone.invalid')
    const profileNotFound = req.t('profile-update.profileNotFound')
    const profileUpdate = req.t('profile-update.update')

    if (telephone.length === 0) {
      return res.status(400).json({
        message: `${emptyTelephone}`
      })
    }
    if (!(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(telephone))) {
      return res.status(400).json({
        message: `${invalidTelephone}`
      }).catch((error) => console.log(error))
    }
    return Profile
      .findByPk(req.params.id)
      .then((profile) => {
        if (!profile) {
          return res.status(400).json({
            message: `${profileNotFound}`
          })
        }
        return profile.update({
          telephone: telephone || profile.telephone,
          profilePic: profilePic || profile.profilePic,
          address: address || profile.address
        })
          .then((updatedProfile) => {
            res.status(200).json({
              message: `${profileUpdate}`,
              data: {
                telephone: telephone || updatedProfile.telephone,
                firstname: profile.firstname,
                lastname: profile.lastname,
                profilePic: profilePic || updatedProfile.profilePic,
                address: address || updatedProfile.address,
                dateOfBirth: profile.dateOfBirth,
                gender: profile.gender,
                employeeId: profile.employeeId
              }
            })
          })
          .catch(error => res.status(400).json(error))
      })
      .catch(error => res.status(400).json(error))
  }

  static delete (req, res) {
    const profileNotFound = req.t('profile-update.profileNotFound')
    const deletedSuccess = req.t('profile-update.deleted.success')
    return Profile.findByPk(req.params.id)
      .then((Profile) => {
        if (!Profile) {
          return res.status(400).json({
            message: `${profileNotFound}`
          })
        }
        return Profile.destroy()
          .then(() =>
            res.status(200).json({
              message: `${deletedSuccess}`
            })
          )
          .catch((error) => res.status(400).json(error))
      })
      .catch((error) => res.status(400).json(error))
  }
}

export default Profiles

// where there is pick add squash
