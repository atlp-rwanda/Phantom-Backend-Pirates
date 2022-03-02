import Routes from '../controllers/routeController'
import express from 'express'
import verifyAdmnOperator from '../authorization/verifyAdmnOperator'

const router = express.Router()

router.post('/', verifyAdmnOperator, Routes.createRoute)
router.get('/', Routes.allRoutes)
router.put('/:routeId', verifyAdmnOperator, Routes.update)
router.get('/:routeId', Routes.getSingleRoute)
router.delete('/:routeId', verifyAdmnOperator, Routes.delete)

export default router
