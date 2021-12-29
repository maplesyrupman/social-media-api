const router = require('express').Router()
const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/user-controller')

router
.route('/')
.get(getAllUsers)
.post(createUser)

router
.route('/:userId')
.get(getUser)
.put(updateUser)
.delete(deleteUser)

module.exports = router