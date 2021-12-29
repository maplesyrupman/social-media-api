const { User } = require('../models/')

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
    },

    getUser({ params: { userId } }, res) {
        User.find({
            _id: userId
        })
            .then(userData => {
                if (!userData.length) {
                    res.status(404).json({ message: 'No user found with that id' })
                    return
                }
                res.status(200).json(userData)
            })
            .catch(err => res.status(500).json(err))
    },

    updateUser({ body, params: { userId } }, res) {
        console.log(body)
        User.findByIdAndUpdate(userId, body, { new: true })
            .then(userData => {
                console.log(userData)
                if (!userData) {
                    res.status(404).json({ message: "No user found with that id" })
                    return
                }
                res.status(200).json(userData)
            })
            .catch(err => res.status(500).json(err))
    },

    deleteUser({ params: { userId } }, res) {
        User.findByIdAndDelete(userId)
            .then(userData => {
                if (!userData) {
                    res.status(404).json({ message: "No user found with that id" })
                    return
                }
                res.status(200).json(userData)
            })
            .catch(err => res.status(500).json(err))
    }
}