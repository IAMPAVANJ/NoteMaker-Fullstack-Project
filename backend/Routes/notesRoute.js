const route = require('express').Router()
const NoteMakerData = require('../Models/noteModel')


//create
route.post('/post-note', async (req, resp) => {
    try {
        const { title, description } = req.body
        const newPost = await NoteMakerData.create({ title, description })
        console.log(newPost)
        resp.json({ sucess: true, msg: 'Note created successfully', data: newPost })
    }
    catch (err) {
        resp.json({ sucess: false, msg: err })
    }
})

route.put("/update-note/:id",async(req,res)=>{
    await NoteMakerData.findByIdAndUpdate(req.params.id,req.body).then(data=>{
        NoteMakerData.findById(req.params.id).then(note=>{
            res.status(201).json(note)
        }).catch(err=>{
            res.status(400).json({msg:"Data not found"})
        })
    }).catch(err=>{
        res.status(400).json({
            "status":"failed",
            msg:err
        })
    })
})

route.delete("/delete-note/:id", async(req, res) => {
    await NoteMakerData.findByIdAndDelete(req.params.id).then(data => {
        res.status(204).json({
            "status":"successfully deleted"
        });
    }).catch(err => {
        res.status(204).json(err);
    })
});


route.get("/",async(req,res)=>{
    try{
        const note =await NoteMakerData.find()
       
        res.status(200).json({
            "status":"success",
            note
        })
    }catch(err){
        res.status(400).json(err)
    }
})

module.exports = route
