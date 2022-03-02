import Busses from '../controllers/busController'
import express from 'express'
import verifyAdmnOperator from '../authorization/verifyAdmnOperator'

const router = express.Router()

router.post('/', verifyAdmnOperator, Busses.createBus)
router.get('/', Busses.allBusses)
router.put('/:busId', verifyAdmnOperator, Busses.update)
router.get('/:busId', Busses.getSingleBus)
router.delete('/:busId', verifyAdmnOperator, Busses.delete)

export default router
