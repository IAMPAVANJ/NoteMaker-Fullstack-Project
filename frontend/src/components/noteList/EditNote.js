import React, { useState } from 'react'
import '../postNoteForm/postnoteform.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';

function EditForm({ setEditStatus, editNote, getNoteList }) {
    const navigate = useNavigate()

    const [updateContact, setUpdateContact] = useState({
        title: editNote.title,
        description: editNote.description
    })

    //handle inputs
    const handleEditInputVavlues = (e) => {
        const { name, value } = e.target
        setUpdateContact(prevState => ({ ...prevState, [name]: value }))
    }

    //handle final updated data
    const handleUpdate = async () => {
        try {
            const response = await axios.put(`https://notemaker-backend.onrender.com/notemaker/edit-note/${editNote._id}`, updateContact)
            if (response) {
                toast.success('Contact updated successfully')
                getNoteList();
                setEditStatus(false)
                navigate('/noteList')
            }
            else {
                console.log('something is wrong')
            }
        }
        catch (err) { console.log(err) }
    }

    return (
        <div className='fluid-container postnotefrom-body'>
            <h1>CREATE NOTE</h1>
            <form className='post-note-form-container'>
                <label>TITLE</label>
                <input type='text' name='title' value={updateContact.title} onChange={handleEditInputVavlues} />
                <label>DESCRIPTION</label>
                <textarea className='description-box' name='description' value={updateContact.description} onChange={handleEditInputVavlues} />
                <button className='btn btn-danger postnote-btn' onClick={handleUpdate}>update</button>
            </form>
        </div>
    )
}

export default EditForm