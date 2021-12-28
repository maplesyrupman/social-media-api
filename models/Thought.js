const { Schema, model, Types } = require('mongoose')
const { formatDate } = require('../utils/helpers')

const ReplySchema = new Schema({
    replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    replyBody: {
        type: String,
        required: 'Reply cannot be blank',
        trim: true
    },
    writtenBy: {
        type: String,
        required: 'Written by cannot be empty',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: date => formatDate(date)
    }
},
{
    toJSON: {
        getters: true
    }
})

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: 'Thought text cannot be blank',
        validate: {
            validator(tt) {
                return tt.length > 0 && tt.length <= 280
            },
            message: 'Thought must be between 1 and 280 characters'
        }
    },
    writtenBy: {
        type: String,
        required: 'Written by cannot be blank',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: date => formateDate(date)
    },
    reactions: [ReplySchema]
},
{
    toJSON: {
        getters: true,
        virtuals: true
    }
})

ReplySchema.virtual('reactionCount').get(function() {return this.reactions.length})

const Thought = model('Thought', ThoughtSchema)

module.exports = Thought