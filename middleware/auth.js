const jwt = require("jsonwebtoken")
const User = require("../users/userModel")
require('dotenv').config()
 
 const auth = async (req, res, next) => {
    try {
        const key = req.headers.Authorization || req.headers.authorization

        const token = key.split(" ")[1]
        
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        console.log(payload);

        const user = await User.findById(payload.user_id)

        req.user = user
        console.log(user);
    } catch (error) {
        req.error = error.message
    }
    next()
 }

 module.exports = auth