const route = require('express').Router()
const NoteMakerData = require('../model/note')
const userMiddleware = require('../middleware/userMiddlware')


route.get('/', userMiddleware, (req, resp) => {
    console.log(req.user)
    resp.json({ mag: 'this is note maker route' })
})


//ROUTE 1: post note
route.post('/post-note', userMiddleware, async (req, resp) => {
    console.log(req.user)
    try {
        const { title, description } = req.body
        const user = req.user
        const newPost = await NoteMakerData.create({ title, description, user })
        console.log(newPost)
        resp.json({ success: true, msg: 'Note created successfully', data: newPost })
    }
    catch (err) {
        resp.json({ success: false, msg: err })
    }
})



//ROUTE 2: Get all created note of specific user 
route.get('/noteList', userMiddleware, async (req, resp) => {
    const listdata = await NoteMakerData.find({ user: req.user })
    try {
        if (listdata) {
            console.log(listdata)
            resp.json({ success: true, data: listdata })
        }
        else {
            resp.json({ success: false, msg: 'No Data Found' })
        }
    }
    catch (err) {
        resp.json({ msg: err })
    }
})


//ROUTE 3: delete note
route.delete('/delete-note/:id', userMiddleware, async (req, resp) => {
    const deleteid = req.params.id
    try {
        const noteItem = await NoteMakerData.findOne({ _id: deleteid })
        console.log('data to deleted', noteItem)
        if (noteItem) {
            const data = await NoteMakerData.deleteOne({ _id: deleteid })
            console.log('data deleted')
            resp.json({ success: true, msg: 'data deleted sucessfully' })
        }
        else {
            resp.json({ success: true, msg: 'no data found matching this id' })
        }
    }
    catch (err) {
        resp.json({ success: false, msg: err })
    }
})

//Route 4 :edit note
route.put('/edit-note/:id', userMiddleware, async (req, resp) => {
    const editId = req.params.id
    console.log(editId)
    try {
        const noteItem = await NoteMakerData.findOne({ _id: editId })
        if (noteItem) {
            const noteItem = await NoteMakerData.updateOne({ _id: editId }, { $set: req.body })
            resp.json({ success: true, msg: 'data updates successfully', data:noteItem })
        }
        else {
            resp.json({ success: false, msg: 'smthing wrong' })
        }
    }
    catch (err) {
        resp.json({ success: false, msg: err })
    }
})


module.exports = route