import {useState} from 'react'
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom';
const Register = ()=>{
    const [error,setError] = useState()
    const [formData, setFormdata] = useState({
        name:'',
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
            const url = 'http://localhost:8080/auth/register'
            const {formData:res} = await axios.post(url,formData)
            alert("form Is submitted")
            setFormdata(...formData,{
                name:'',
                email:'',
                password:''
            })
            navigate("/")
            
        }catch(err){
            if(
                error.response && 
                error.response.status >=400 && 
                error.response.status <=500
            ){
                setError(error.response.data.message)
                console.log(error)
            }
        }
    }
    
    return(
        <div className='container mt-7 pt-7'>
            
            <h1 className='primary'>MY NOTE MAKER</h1>
            <form onSubmit={handleSubmit} className='form-control'>
            <h3 className='primary'>Regester Form</h3>
            <div className='text-primary'>{error}</div>
                <div className='container mt-3 '>
                    <label htmlFor="name" className='form-label'>Name</label>
                    <input 
                    type="text" name="name" id="name" className='form-control'
                    onChange={handleInputChange}
                    value={formData.name}
                    />
                </div>
                <div>
                    <label htmlFor="email" className='form-label'>Email</label>
                    <input type="email" name="email" id="email" className='form-control' value={formData.email} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="password" className='form-label'>password</label>
                    <input type="password" name="password" id="password" value={formData.password} className='form-control' onChange={handleInputChange}/>
                </div>
                <button type="submit" className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                <Link to="/"><button className='btn btn-primary'>Login</button></Link>
            </form>
            
        </div>
    )
}
export default Register;