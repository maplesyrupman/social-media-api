const { Schema, model, Types } = require('mongoose')

const UserSchema = new Schema({
    username: {
        type: String, 
        unique: true,
        required: 'Username cannot be empty',
        trim: true
    },
    email: {
        type: String,
        required: 'Email cannot be empty',
        trim: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
})

UserSchema.virtual('friendCount').get(function() {
    return this.friends.reduce((total) => total + 1, 0)
})

const User = model('User', UserSchema)

module.exports = User