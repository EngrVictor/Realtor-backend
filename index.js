const express = require('express')
require('./configs/mongoose')
require('dotenv').config()
const user = require('./users/users')
const property = require('./properties/properties')

const app = express()
app.use(express.json())

app.use(user)
app.use(property)

app.get('', (req, res) => {
    res.send({message: 'server running'})
})

const port = process.env.PORT

app.listen(port, () => {
    console.log('Server started on port ' + port);
})