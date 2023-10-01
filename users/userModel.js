const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new Schema({
    firstname: {
        type : String,
        required: true,
        trim: true,
        lowercase: true
    },
    lastname: {
        type : String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator (val){
                if (val.length  < 6) {
                    throw new Error('Password too short')
                }
            }
        }
    },
    phone: {
        type: Number,
    },
    email : {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    tokens : [{
        token: {
            type: String,
        }
    }]
}, {
    timestamps:true
})

UserSchema.pre("save", async function(next) {
    const user = this
    if (user.isModified('password')) {
        const hash = await bcrypt.hash(user.password, 8)
        user.password =  hash
        console.log(hash);
    }
    next()
})

UserSchema.methods.generateToken = (id) => {

    const token = jwt.sign({ user_id: id}, "thisismyrealestatebackendsite", { expiresIn: '7d'})

    console.log('user', this)
    return token
}

const User = model('User', UserSchema)

module.exports = User