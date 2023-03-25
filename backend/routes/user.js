const route = require('express').Router()
const jwt = require('jsonwebtoken')
const UserData = require('../model/user')


route.get('/', (req, resp) => {
    console.log('this is user route')
    resp.json({ msg: 'this is user route' })
})


//ROUTE 1: user registartion
route.post('/register', async (req, resp) => {
    const { email } = req.body
    const existingUser = await UserData.findOne({ email })
    try {
        if (existingUser) {
            resp.json({ success: false, msg: 'user already exist' })
        }
        else {
            const newUserData = new UserData(req.body)
            const newUser = await newUserData.save()
            console.log(newUser)
            resp.json({ success: true, msg: 'new user created sucessfully', data: newUser })
        }
    }
    catch (err) {
        resp.json({ success: false, msg: err })
    }
})


//ROUTE 2: user signin
route.post('/siginin', async (req, resp) => {
    try {
        const { email } = req.body
        const existingUser = await UserData.findOne({ email })
        console.log(existingUser)
        if (existingUser) {
            if (existingUser.password === req.body.password) {
                dataToBeSent = {
                    _id: existingUser._id
                }
                const token = jwt.sign(dataToBeSent, "secretKey", { expiresIn: '1d' })
                console.log(token)
                resp.json({ success: true, msg: 'user signin sucessfully', token: token })
            }
            else {
                resp.json({ success: false, msg: 'Incorrect password' })
            }
        }
        else {
            resp.json({ success: false, msg: 'user not found.please create account' })
        }
    }
    catch (err) {
        resp.json({ success: false, msg: err })
    }
})

module.exports = route