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

const seedDb = async () => {
    await User.deleteMany({})
    await User.insertMany(users)
}

seedDb().then(() => {
    mongoose.connection.close()
})