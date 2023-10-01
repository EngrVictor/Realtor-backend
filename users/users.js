const express = require('express')
const router = express.Router()
const User = require('./userModel')
const bcrypt = require('bcrypt')
const auth = require('../middleware/auth')

router.get('/users', auth, async (req,res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
})

router.get('/users/me', auth, async (req,res) => {
    try {
        if (req.error) {
            res.status(400).send({
                error: "invalid token"
            })
        }
        res.send(req.user)
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
})

router.post('/users', async (req,res) => {
    try {
        const {firstname, lastname, phone, email, password} = req.body

        const userCheck = await User.findOne({ email })

        if (userCheck) {
            return res.status(403).send({
                error: 'User already exist'
            })
        }

        if (!email.includes('@')) {
            return res.status(400).send({
                error: 'Invalid email address'
            })
        }

        const user = new User({
            firstname,
            lastname,
            phone,
            email,
            password
        })

        try {
            console.log(req.body);
            await user.save()

            res.status(201).send({
                success: 'User added successfully'
            })
        } catch (error) {
            res.status(400).send({
                error: error.message
            })
        }

    } catch (error) {
        res.status(500).send({
            error: 'Internal server error'
        })
    }
})

router.post('/users/login', async (req,res) => {
    const {email, password} = req.body

    const user = await User.findOne({ email })
    console.log(user);
    if (!user) {
        return res.status(404).send({
            error: 'Invalid email or password'
        })
    }

    const passCheck = await bcrypt.compare(password, user.password)
    console.log(passCheck);
    if (!passCheck) {
        return res.status(404).send({
            error: 'Invalid email or password'
        })
    }

    user.tokens = user.tokens.concat({token: user.generateToken(user._id)})
    await user.save()
    res.status(200).send({
        success: 'Login successfull'
    })
})

router.patch('/users/:id', async (req,res) => {
    try {
        const userCheck = await User.findOne({ email: req.body.email })

        if (userCheck) {
            return res.status(403).send({
                error: 'Email already exist, can not be changed'
            })
        }

        await User.findByIdAndUpdate(req.params.id, {...req.body})

        res.status(202).send({
            success: 'User updated successfully'
        })
    } catch (error) {
        res.status(500).send({
            error: 'Internal server error'
        })
    }
})

router.delete('/users/:id', async (req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id)

        res.status(200).send({
            success: 'User removed successfully'
        })
    } catch (error) {
        res.status(500).send({
            error: 'Internal server error'
        })
    }
})

module.exports = router