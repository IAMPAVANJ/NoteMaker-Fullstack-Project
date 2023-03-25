import React, { useState, useEffect } from 'react'
import './notelist.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';
import EditForm from './EditNote'

function NoteList() {
  const navigate = useNavigate()
  const [noteList, setNoteList] = useState([])
  const [editContact, setEditContact] = useState()

  const [editStatus, setEditStatus] = useState(false)
  ///get note list
  const getNoteList = async () => {
    const token = localStorage.getItem('token')
    const { data } = await axios.get('https://notemaker-backend.onrender.com/notemaker/noteList', {
      headers: {
        authorization: token
      }
    })
    console.log(data.data)
    if (data.success) {
      setNoteList(data.data)
    }
  }
  useEffect(() => {
    getNoteList();
  }, [])


  //handle each delete
  const handleDelete = async (id) => {
    console.log(id)
    try {
      const token = localStorage.getItem('token')
      const resp = await axios.delete(`http://localhost:8000/notemaker/delete-note/${id}`, {
        headers: {
          authorization: token
        }
      })
      if (resp.data.success) {
        toast.success(resp.data.msg)
        getNoteList()
      }
      else {
        toast.error('smthing wrong')
      }
    }
    catch (err) {
      console.log('smthing wrong', err)
    }
  }


  //handle edt inputs
  const handleEdit = (contact) => {
    setEditStatus(true)
    setEditContact(contact)
    console.log(contact)
  }

  return (
    <div className='notlist-body'>
      <div className='btn-container'>
        <button className='btn btn-success addbtn' onClick={() => navigate('/postNoteForm')}>ADD </button>
        <button className='btn btn-danger deleteall-btn' onClick={() => setNoteList([])}>DELETE ALL </button>
      </div>
      <div className='noteList-container'>
        {noteList.length <= 0 ? <h1 className='noDatafoundmsg'>No data found</h1> :
          noteList.map((item, index) => {
            return (
              <div className='card' key={index + 1}>
                <div className='card-headerbar'>
                  <h5>{item.title}</h5>
                  <div className='btn-container'>
                    <button onClick={() => handleDelete(item._id)} >delete</button>
                    <button onClick={() => handleEdit(item)}>edit</button>
                  </div>
                </div>
                <div>{item.description}</div>
                {editStatus && <EditForm editContact={editContact} setEditStatus={setEditStatus}
                  getNoteList={getNoteList} />}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default NoteList