const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGO_URL

main()
.then(() => console.log('connected'))
.catch(err => console.log(err))

async function main() {
    await mongoose.connect(url)
}