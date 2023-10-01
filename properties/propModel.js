const {Schema, model} = require('mongoose')

const propSchema = new Schema({
    type: {
        type : String,
        required: true,
        trim: true,
        lowercase: true
    },
    location: {
        type : String,
        required: true,
        trim: true,
        lowercase: true
    },
    price: {
        type: Number,
        required: true,
    },
    size : {
        type: String,
        lowercase: true,
        trim: true
    },
    bedrooms : {
        type: Number,
    },
    bathrooms : {
        type: Number,
    },
    images : [{
        type: Buffer,
        required: true,
    }],
    description : {
        type: String,
        lowercase: true,
        trim: true
    },
}, {
    timestamps:true
})

const Property = model('Property', propSchema)

module.exports = Property