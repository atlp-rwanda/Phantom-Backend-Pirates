<<<<<<< HEAD
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
=======
import express from 'express'
import Users from '../controllers/user'

const route = express.Router()

// Welcome endpoint
/**
 * @swagger
 * /:
 *  get:
 *    description: Used to display the Welcome Page
 *    responses:
 *      '200':
 *        description: The Welcome Page was displayed successfully
 */

  route.post('/api/users', Users.create);
  route.get('/api/users', Users.listAll);
  route.get('/api/users/:id', Users.list);
  route.put('/api/users/:id', Users.modify);
  route.delete('/api/users/:id', Users.delete);

export default route
>>>>>>> a0086c9 (setup postgres PR review)
