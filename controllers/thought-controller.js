const { User, Thought } = require('../models')

module.exports = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(thoughtData => res.status(200).json(thoughtData))
            .catch(err => res.status(500).json(err))
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                User.findByIdAndUpdate(body.userId,
                    { $push: { thoughts: _id } },
                    { new: true }
                )
                    .then(userData => {
                        if(!userData) {
                            res.status(404).json({message: 'no user found with that id'})
                            return
                        }
                        res.status(200).json(userData)
                    })
                    .catch(err => {

                        res.status(500).json(err)
                    })
            })
            .catch(err => res.status(500).json(err))
    },

    getThought({ params: { thoughtId } }, res) {
        Thought.findById(thoughtId, '-id')
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'no thought found with that id' })
                    return
                }
                res.status(200).json(thoughtData)
            })
            .catch(err => res.status(500).json(err))
    },

    updateThought({ body: { thoughtText }, params: { thoughtId } }, res) {
        Thought.findByIdAndUpdate(thoughtId, { thoughtText }, { new: true })
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'no thought found with that id' })
                    return
                }
                res.status(200).json(thoughtData)
            })
            .catch(err => res.status(500).json(err))
    },

    deleteThought({ params: { thoughtId } }, res) {
        Thought.findByIdAndDelete(thoughtId)
            .then(thoughtData => {
                if (!thoughtData) {
                    res.status(404).json({ message: 'no thought found with that id' })
                    return
                }
                User.findByIdAndUpdate(thoughtData.userId)
                res.status(200).json(thoughtData)
            })
            .catch(err => res.status(500).json(err))
    },

    createReaction({ body, params: { thoughtId } }, res) {
        Thought.findById(thoughtId, function(err, thought) {
            if (err) {
                res.status(400).json(err)
                return
            } else if (!thought) {
                res.status(404).json({message: 'no thought found with that id'})
                return
            }

            thought.reactions.push(body)
            thought.markModified('reactions')
            thought.save((saveErr, saveResult) => {
                if(saveErr) {
                    res.status(500).json(saveErr)
                    return
                }
                res.status(200).json(saveResult)
            })
        })
    },

    deleteReaction({ body: {reactionId}, params: { thoughtId } }, res) {
        Thought.findByIdAndUpdate(
            thoughtId,
            {'$pull': {'reactions': {'_id':reactionId}}},
            {new: true},
            (err, thought) => {
                if(err) {
                    res.status(500).json(err)
                    return
                }
                if(!thought) {
                    res.status(404).json({message: 'no thought found with that id'})
                    return
                }
                res.status(200).json(thought)
            }
        )
    }
}