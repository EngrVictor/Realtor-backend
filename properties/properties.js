const express = require('express')
const router = express.Router()
const Property = require('./propModel')

const multer = require('multer')

const upload = multer()

router.get('/properties', async (req,res) => {
    try {
        const properties = await Property.find({})
        res.send(properties)
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
})

router.get('/properties/:id', async (req,res) => {
    try {
        const property = await Property.findById(req.params.id)
        if (!property) {
           return res.status(404).send({
            error: 'No property found'
           }) 
        }
        res.send(property)
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
})

router.post('/properties', upload.array('images'), async (req,res) => {
    try {
        const properties = new Property({...req.body})
        await properties.save()

        res.status(201).send({
            success: 'Property added successfully'
        })

    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
})

router.patch('/properties/:id', async (req,res) => {
    try {
        await Property.findByIdAndUpdate(req.params.id, {...req.body})

        res.status(202).send({
            success: 'Property updated successfully'
        })
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
})

router.delete('/properties/:id', async (req,res) => {
    try {
        await Property.findByIdAndDelete(req.params.id)

        res.status(200).send({
            success: 'Property removed successfully'
        })
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
})

module.exports = router