const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3005

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-media-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.set('debug', true)

app.use(require('./routes'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))