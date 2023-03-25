import Navbar from "../navBar/navbar";
import { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert2'
import "./createNote.css"
import { useNavigate } from "react-router-dom";
const CreateNote=()=>{
    const [formData, setFormdata] = useState({
        title:'',
        description:''
    })
    const handleInputChange = (e)=>{
        const {name,value} = e.target;
        setFormdata(prevFormData=>({
            ...prevFormData,[name]:value,
        }));
    }
    const navigate = useNavigate()
    const handleSubmit = async(event)=>{
        event.preventDefault()
        try{
            const url = 'http://localhost:8080/note/post-note'
            const {formData:res} = await axios.post(url,formData)
            setFormdata({
                title:'',
                description:''
            })
            swal.fire("Note is created")
            navigate("/createNote")
        }catch(error){
            if(
                error.response && 
                error.response.status >=400 && 
                error.response.status <=500
            ){
                
                console.log(error)
            }
        }
    }
    return(
        <div>
            <Navbar/>
            <form>
                <div>
                    <label htmlFor="title" className='form-label'>Title</label>
                    <input type="text" name="title" id="title" className='form-control' value={formData.title} onChange={handleInputChange}/>
                </div>
                <div>
                    <label htmlFor="description" className='form-label'>Description</label>
                    <input type="text" name="description" id="description" placeholder="Write Description...." value={formData.description} className='form-control' onChange={handleInputChange}/>
                </div>
                <button className="btn btn-warning" onClick={handleSubmit}>Add To Notes</button>
            </form>
        </div>
    )
}
export default CreateNote;