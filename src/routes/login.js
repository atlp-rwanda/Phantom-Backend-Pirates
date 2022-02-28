import login from '../controllers/login'
import express from 'express'

const router = express.Router()

// End-point for user to login
router.post('/users/login', login)

export default router
