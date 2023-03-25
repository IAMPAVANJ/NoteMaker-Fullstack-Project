import React, { useState } from 'react'
import './register.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast';


function Registartion() {
    const navigate = useNavigate()

    const [newUser, setNewUser] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    //handle inputs
    const handleinputs = (e) => {
        const { name, value } = e.target
        setNewUser(prevState => ({ ...prevState, [name]: value }))
    }
    //handle submit
    const handleRegisterSubmit = async (e) => {
        e.preventDefault()

        const { password, confirmPassword } = newUser
        try {
            if (password === confirmPassword) {
                const resp = await axios.post('https://notemaker-backend.onrender.com/user/register', newUser)
                if (resp.data.success) {
                    navigate('/')
                    toast.success(resp.data.msg)
                }
                else {
                    toast.error(resp.data.msg)
                }
            }
            else {
                toast.error('password and confirm pass dont match')
            }
        }
        catch (err) { toast.error(err) }
    }


    return (
        <div className='fluid-container form'>
            <div className='registration-form'>
                <h4>Create New Account</h4>
                <h5 onClick={() => navigate('/')} style={{ color: 'blue', cursor: 'pointer' }}>SignIn</h5>

                <form className='form'>
                    <input type='text' placeholder='Email' name='email' value={newUser.email} onChange={handleinputs} />
                    <input type='password' placeholder='Password' name='password' value={newUser.password} onChange={handleinputs} />
                    <input type='password' placeholder=' Confirm Password' name='confirmPassword' value={newUser.confirmPassword} onChange={handleinputs} />

                    <button type='submit' className='btn btn-primary' onClick={handleRegisterSubmit}>Register</button>

                </form>
            </div>
        </div>
    )
}

export default Registartion