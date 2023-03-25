
import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = ()=>{
    const [error,setError] = useState("")
    const [formData, setFormdata] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate()
    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setFormdata(prevFormData=>({
            ...prevFormData,[name]:value,
        }));
    }
    const handleSubmit = async(event)=>{
        event.preventDefault()
        try{
            const url = 'http://localhost:8080/auth/login'
            const {formData:res} = await axios.post(url,formData)
            
            setFormdata(...formData,{
                name:'',
                email:'',
                password:''
            })
            alert("form Is submitted")
            navigate("/home")
        }catch(err){
            alert("Enter Correct Email and Password")
            setFormdata(...formData,{
                name:'',
                email:'',
                password:''
            })
            if(
                error.response && 
                error.response.status >=400 && 
                error.response.status <=500
            ){
                
                setError("you are Not Authorized, Register")
                console.log(error)
            }
        }
    }
    
    return(
        <div className='container mt-7 pt-7'>
            
            <h1 className='primary'>MY NOTE MAKER</h1>
            <form onSubmit={handleSubmit} className='form-control'>
            <h3 className='primary'>Login TO NoteMaker</h3>
            <div className='text-primary'>{error.message}</div>

                <div>
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input type="email" name="email" id="email" className='form-control' value={formData.email} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="password" className='form-label'>password</label>
                    <input type="password" name="password" id="password" value={formData.password} className='form-control' onChange={handleInputChange}/>
                </div>
                <button type="submit" className='btn btn-primary' onClick={handleSubmit}>Submit</button>
            </form>
            <Link to="/register"><button className='btn btn-primary'>Register</button></Link>
        </div>
    )
}
export default Login;