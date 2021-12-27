const mongoose = require('mongoose')
const userModel = require('../models/User')
const userData = {username: 'someguy', email: 'guy@email.com', thoughts: [], friends: []}

describe('User model test', () => {

    beforeAll( () => {
        mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true }, err => {
            if (err) {
                console.error(err)
                process.exit(1)
            }
        })
    })

    afterAll(() => {
        mongoose.connection.close()
    })

    it('creates and saves user successfully', async () => {
        const validUser = new userModel(userData)
        const savedUser = await validUser.save()

        expect(savedUser._id).toBeDefined()
        expect(savedUser.username).toBe(userData.username)
        expect(savedUser.email).toBe(userData.email)
        //put more after ensuring this even works 
    })
})