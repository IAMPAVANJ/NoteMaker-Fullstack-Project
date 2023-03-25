import Navbar from "../navBar/navbar";
import {useState,useEffect} from 'react'
const Home=()=>{
    const [note,setNotes] = useState([])
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get("http://localhost:8080/note/")
                console.log(response)
            }catch(err){
                console.log(err)
            }
        }
    })
    return(
        <div>
            <Navbar/>
            <div className="container">

            </div>
        </div>
    )
}
export default Home;