import React, { useState } from 'react'
import './postnoteform.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

function PostNoteForm() {
    const navigate = useNavigate()

    const [newPost, setNewPost] = useState({
        title: '',
        description: ''
    })

    //handle inputs
    const handleInputs = (e) => {
        const { name, value } = e.target
        setNewPost(prevState => ({ ...prevState, [name]: value }))
    }

    //handle Post Note
    const handlePostNote = async (e) => {
        e.preventDefault()
        console.log(newPost)
        try {
            const token=localStorage.getItem('token')
            const resp = await axios.post('https://notemaker-backend.onrender.com/notemaker/post-note', newPost,{
                headers:{
                    authorization:token
                }
            })
            if (resp.data.success) {
                navigate('/noteList')
                toast.success(resp.data.msg)
                console.log(resp.data.data)
            }
            else {
                toast.error(resp.data.msg)
            }
        }
        catch (err) {
            toast.error(err)
        }
    }

    return (
        <div className='fluid-container postnotefrom-body'>
            <h1>CREATE NOTE</h1>
            <form className='post-note-form-container'>
                <label>TITLE</label>
                <input type='text' name='title' value={newPost.title} onChange={handleInputs} />
                <label>DESCRIPTION</label>
                <textarea className='description-box' name='description' value={newPost.description} onChange={handleInputs} />
                <button className='btn btn-danger postnote-btn' onClick={handlePostNote}>POST</button>
            </form>
        </div>
    )
}

export default PostNoteForm