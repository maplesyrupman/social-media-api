const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3005
const CONNECTION_URL = process.env.MONGODB_URI || 'mongodb://localhost/social-media-api'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(CONNECTION_URL).then(() => console.log('connected to DB'))

mongoose.set('debug', true)

app.use(require('./routes'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))