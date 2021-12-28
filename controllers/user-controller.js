const User = require('../models/User')

module.exports = {

    getAllUsers(req, res) {
        User.find({})
        .populate('friends', 'thoughts')
        .then(userData => res.status(200).json(userData))
        .catch(err => res.status(500).json(err))
    },

    createUser(req, res) {
        User.create({
            ...req.body
        })
        .then(userData => res.json(userData))
        .catch(err => res.status(400).json(err))
    }
}