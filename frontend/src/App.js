import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './app.css'
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom'
import Registartion from './components/registration/Registartion';
import Signin from './components/signin/Signin';
import PostNoteForm from './components/postNoteForm/PostNoteForm';
import NoteList from './components/noteList/NoteList';

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Signin />}></Route>
        <Route path='/registartion' element={<Registartion />}></Route>
        <Route path='/noteList' element={<NoteList />}></Route>
        <Route path='/postNoteForm' element={<PostNoteForm />}></Route>
      </Routes>
    </>
  );
}

export default App;
