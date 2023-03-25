import React, { useState } from 'react'
import './signin.css'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

function Signin() {
    const navigate = useNavigate()

    const [exitingUser, setExitingUser] = useState({
        email: '',
        password: ''
    })
    //handle inputs
    const handleinputs = (e) => {
        const { name, value } = e.target
        setExitingUser(prevState => ({ ...prevState, [name]: value }))
    }

    //handle submit
    const handleSigninSubmit = async (e) => {
        e.preventDefault()
        try {
            
            const resp = await axios.post('https://notemaker-backend.onrender.com/user/siginin', exitingUser)
            if (resp.data.success) {
                const token = resp.data.token
                console.log(token)
                localStorage.setItem('token', token)
                navigate('/noteList')
                toast.success(resp.data.msg)
            }
            else {
                toast.error(resp.data.msg)
            }
        }
        catch (err) { toast.error(err) }
    }

    return (
        <div className='fluid-conatiner form'>
            <div className='signin-form'>
                <h4>SignIn</h4>
                <h5 onClick={()=>navigate('/registartion')} style={{color:'blue',cursor:'pointer'}}>Create new account</h5>
                <form className='form'>
                    <input type='text' placeholder='Email' name='email' value={exitingUser.email} onChange={handleinputs} />
                    <input type='password' placeholder='Password' name='password' value={exitingUser.password} onChange={handleinputs} />
                    <button type='submit' className='btn btn-primary' onClick={handleSigninSubmit}>SignIn</button>
                </form>
            </div>
        </div>
    )
}

export default Signin