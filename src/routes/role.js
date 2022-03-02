import Roles from '../controllers/roleController'
import express from 'express'
import verifyAdmin from '../authorization/verifyAdmin'

const router = express.Router()

router.post('/', verifyAdmin, Roles.createRole)
router.get('/', Roles.allRoles)
router.put('/:roleId', verifyAdmin, Roles.update)
router.get('/:roleId', Roles.getSingleRole)
router.delete('/:roleId', verifyAdmin, Roles.delete)

export default router
