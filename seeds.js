const mongoose = require('mongoose')
const { User, Thought } = require('./models/')

mongoose.connect('mongodb://localhost/social-media-api')
    .then(() => console.log('Connected to database'))
    .catch(err => console.error(err))

const users = [
    {username: 'someguy', email: 'some@email.com'},
    {username: 'anotherguy', email: 'another@email.com'},
    {username: 'differentguy', email: 'different@email.com'},
    {username: 'weirdguy', email: 'weird@email.com'},
    {username: 'strangeguy', email: 'strange@email.com'},
    {username: 'coolguy', email: 'cool@email.com'},
    {username: 'mysteriousguy', email: 'mystery@email.com'}
]

const thoughts = [
    {thoughtText: "here's a thought", writtenBy: "someguy"},
    {thoughtText: "here's another thought", writtenBy: "someguy"},
    {thoughtText: "here's one more thought", writtenBy: "someguy"},
    {thoughtText: "here's 1 thought", writtenBy: "anotherguy"},
    {thoughtText: "here's 2 thought", writtenBy: "anotherguy"},
    {thoughtText: "here's 3 thought", writtenBy: "anotherguy"},
    {thoughtText: "so here's what I'm thining", writtenBy: "coolguy"},
    {thoughtText: "here's a mysterious thought...", writtenBy: "mysteriousguy"}
]

const getThoughtIds = thoughts => {
    const thoughtIds = []

    thoughts.forEach(thought => thoughtIds.push([thought._id.valueOf(), thought.writtenBy]))
    return thoughtIds
}

const addThoughtsToUsers = (thoughtsOfUsers) => {
    thoughtsOfUsers.forEach( async (userThought) => {
        await User.findOneAndUpdate(
            {username: userThought[1]},
            {$push: {thoughts: mongoose.Types.ObjectId(userThought[0])}}
        )
    })
}

const seedDb = async () => {
    await User.deleteMany({})
    await User.insertMany(users)
    await Thought.deleteMany({})
    await Thought.create(thoughts)
    .then(getThoughtIds)
    .then(addThoughtsToUsers)
    .then(console.log('Seeding complete'))
}

seedDb().then(() => {
    console.log('tying up loose ends...')
    setTimeout(() => {
        mongoose.connection.close()
        console.log('connection closed')
    }, 3000)
})

