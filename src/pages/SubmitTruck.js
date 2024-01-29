import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import HeadNav from '../components/HeadNav';
import Navbar from '../components/Navbar';
import Axios from 'axios'

function SubmitTruck() {    
    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;
    const { id } = useParams();
    const [status, setStatus] = useState(1)
    const [jobsite, setJobsite] = useState([])
    const [image1, setImage1] = useState()
    const [image2, setImage2] = useState()
    const [image3, setImage3] = useState()
    const [image4, setImage4] = useState()
    const [image5, setImage5] = useState()
    const [image6, setImage6] = useState()
    const [truck, setTruck] = useState({company:'', theLocation:'', theStatus:'shipping',theDate:getCurrentDate(), theTime:getCurrentTime(), image1:'',image2:'',image3:'',image4:'',image5:'',image6:''})

    async function getJobsite() {
        await fetch(apiURL + '/getJobsitePerId.php?id=' + id)
        .then(response => response.json())
        .then(response => setJobsite(response))
    }
    function getCurrentDate(){
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`
    };
    function getCurrentTime(){
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`
    }

    useEffect(()=>{
        getJobsite()
    },[])

    useEffect(()=>{
        setTruck((prevTruck) => ({
            ...prevTruck,
            company: jobsite.companyName,
            theLocation: jobsite.jobsite,
        }));
    },[jobsite])

    useEffect(()=>{
        console.log(truck);
    },[truck])
    useEffect(()=>{
        setTruck((prevTruck) => ({
            ...prevTruck,
            image1: image1,
            image2: image2,
            image3: image3,
            image4: image4,
            image5: image5,
            image6: image6
        }));
    },[image1, image2, image3, image4, image5, image6])


    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setTruck((prevTruck) => ({ ...prevTruck, theStatus: newStatus }));
        newStatus == 'shipping' ? setStatus(1) : setStatus(2)
    };
    const handleDateChange = (event) => {
        const newDate = event.target.value;
        setTruck((prevTruck) => ({ ...prevTruck, theDate: newDate }));
    };
    const handleTimeChange = (event) => {
        const newTime = event.target.value;
        setTruck((prevTruck) => ({ ...prevTruck, theTime: newTime }));
    };
    async function submitNewTruck(){
        await submitImage1()
        await submitImage2()
        await submitImage3()
        await submitImage4()
        await submitImage5()
        await submitImage6()

        console.log("SUBMITTING NEW TRUCK ....");
        const jsonString = JSON.stringify(truck);
        fetch( apiURL + '/newTruck.php?data=' + jsonString)
        .then(response => response.json())
        .then(response => console.log(response))
    }



    async function submitImage1(){
        const formData = new FormData()
        formData.append('file', image1)
        formData.append("upload_preset", "ni1ax9oj")
        await Axios.post("https://api.cloudinary.com/v1_1/dvord9edi/image/upload", formData)
        .then((response) => setImage1(response.data.url))
    }
    async function submitImage2(){
        const formData = new FormData()
        formData.append('file', image2)
        formData.append("upload_preset", "ni1ax9oj")
        await Axios.post("https://api.cloudinary.com/v1_1/dvord9edi/image/upload", formData)
        .then((response) => setImage2(response.data.url))
    }
    async function submitImage3(){
        const formData = new FormData()
        formData.append('file', image3)
        formData.append("upload_preset", "ni1ax9oj")
        await Axios.post("https://api.cloudinary.com/v1_1/dvord9edi/image/upload", formData)
        .then((response) => setImage3(response.data.url))
    }
    async function submitImage4(){
        const formData = new FormData()
        formData.append('file', image4)
        formData.append("upload_preset", "ni1ax9oj")
        await Axios.post("https://api.cloudinary.com/v1_1/dvord9edi/image/upload", formData)
        .then((response) => setImage4(response.data.url))
    }
    async function submitImage5(){
        const formData = new FormData()
        formData.append('file', image5)
        formData.append("upload_preset", "ni1ax9oj")
        await Axios.post("https://api.cloudinary.com/v1_1/dvord9edi/image/upload", formData)
        .then((response) => setImage5(response.data.url))
    }
    async function submitImage6(){
        const formData = new FormData()
        formData.append('file', image6)
        formData.append("upload_preset", "ni1ax9oj")
        await Axios.post("https://api.cloudinary.com/v1_1/dvord9edi/image/upload", formData)
        .then((response) => setImage6(response.data.url))
    }




    

  return (
    <div className='wrapper-submitJobsite'>
        <HeadNav title={jobsite.companyName} upperCase={true} />
        <Navbar page="trucks" />
        <h3> {jobsite.jobsite} </h3>
        <div className='selector2'>
            <p className={status==1? "selected":""} id="left"  onClick={()=>handleStatusChange('shipping')}> Shipping </p>
            <p className={status==2? "selected":""} id="right" onClick={()=>handleStatusChange('Return')}> Return </p>
        </div>
        <div className='dateTimes'>
            <div className='date-time' id="top"> 
                <p> <i className="bi bi-clock iconDateTime"></i> Time: </p>
                <input type="time" value={truck.theTime} onChange={(e)=>handleTimeChange(e)}/>
            </div>
            <div className='date-time'>
                <p> <i className="bi bi-calendar2-week iconDateTime"></i> Date: </p>
                <input type="date" value={truck.theDate} onChange={(e)=>handleDateChange(e)}/>
            </div>   
        </div>
        <div className='file-container'>
            <i className='bi bi-camera iconCamera'></i>
            <input type='file' onChange={(e) => setImage1(e.target.files[0])} />
        </div>
        <div className='file-container'>
            <i className='bi bi-camera iconCamera'></i>
            <input type='file' onChange={(e) => setImage2(e.target.files[0])} />
        </div>
        <div className='file-container'>
            <i className='bi bi-camera iconCamera'></i>
            <input type='file' onChange={(e) => setImage3(e.target.files[0])} />
        </div>
        <div className='file-container'>
            <i className='bi bi-camera iconCamera'></i>
            <input type='file' onChange={(e) => setImage4(e.target.files[0])} />
        </div>
        <div className='file-container'>
            <i className='bi bi-camera iconCamera'></i>
            <input type='file' onChange={(e) => setImage5(e.target.files[0])} />
        </div>
        <div className='file-container'>
            <i className='bi bi-camera iconCamera'></i>
            <input type='file' onChange={(e) => setImage6(e.target.files[0])} />
        </div>
     
        <button className='btn-submit' onClick={()=>submitNewTruck()}> Submit </button>
    </div>
  )
}

export default SubmitTruck