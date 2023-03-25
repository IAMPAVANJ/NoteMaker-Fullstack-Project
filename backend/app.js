const express=require('express')
const cors = require('cors')
const app=express()
app.use(express.json())
app.use(cors())


//user routes
const user=require('./routes/user')
app.use('/user',user)


//note making route
const noteMaker=require('./routes/note')
app.use('/notemaker',noteMaker)


module.exports=app