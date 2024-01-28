import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import HeadNav from '../components/HeadNav';
import Navbar from '../components/Navbar';

function SubmitTruck() {
    const [status, setStatus] = useState(1)
    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

    const { id } = useParams();
    const [jobsite, setJobsite] = useState([])
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

    const handleFileUpload = (event, imageNumber) => {
        const file = event.target.files[0];
        if (file) {
          // Update the truck state based on the image number
          setTruck((prevTruck) => ({
            ...prevTruck,
            [`image${imageNumber}`]: URL.createObjectURL(file),
          }));
        }
    };
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


   

  return (
    <div className='wrapper-submitJobsite'>
        <HeadNav title={jobsite.companyName} upperCase={true} />
        <Navbar page="trucks" />
        <h3> {jobsite.jobsite} </h3>
        <div className='selector2'>
            <p className={status==1? "selected":""} id="left"  onClick={()=>handleStatusChange('shipping')}> Shipping </p>
            <p className={status==2? "selected":""} id="right" onClick={()=>handleStatusChange('return')}> Return </p>
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
        <input type='file' onChange={(e) => handleFileUpload(e, 1)} />
      </div>
      <div className='file-container'>
        <i className='bi bi-camera iconCamera'></i>
        <input type='file' onChange={(e) => handleFileUpload(e, 2)} />
      </div>
      <div className='file-container'>
        <i className='bi bi-camera iconCamera'></i>
        <input type='file' onChange={(e) => handleFileUpload(e, 3)} />
      </div>
      <div className='file-container'>
        <i className='bi bi-camera iconCamera'></i>
        <input type='file' onChange={(e) => handleFileUpload(e, 4)} />
      </div>
      <div className='file-container'>
        <i className='bi bi-camera iconCamera'></i>
        <input type='file' onChange={(e) => handleFileUpload(e, 5)} />
      </div>
      <div className='file-container'>
        <i className='bi bi-camera iconCamera'></i>
        <input type='file' onChange={(e) => handleFileUpload(e, 6)} />
      </div>
        <button className='btn-submit'> Submit </button>
    </div>
  )
}

export default SubmitTruck