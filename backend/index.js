const express=require('express')
const cors=require('cors')
const app = require('./app')
app.use(cors())


//mongoose connection
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
DB = 'mongodb+srv://Harshadaa1997:Harshadaa1997@cluster0.cmxb8d3.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DB)
    .then(() => { console.log('mongo connected successfully') })
    .catch(err => { console.log(' OOPS!! mongo connection failed', err) })

app.get('/',(req,resp)=>{
    resp.json('this is note maker project')
})
app.listen(8000, () => { console.log('server started at 8000') })