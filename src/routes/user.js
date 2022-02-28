import Users from '../controllers/user'
import express from 'express'

const router = express.Router()

// Registering a new User
router.post('/users/register', Users.signUp)
// Getting all users
router.get('/users/', Users.allUsers)
// Getting a user by id
router.get('/users/:id', Users.userById)
// Updating a user by id
router.put('/users/update/:id', Users.updateUser)
// Deleting a user by id
router.delete('/users/delete/:id', Users.deleteUser)

export default router
