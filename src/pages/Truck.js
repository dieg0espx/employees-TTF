import React, { useEffect, useState } from 'react'
import HeadNav from '../components/HeadNav'
import Navbar from '../components/Navbar'
import { useLocation, useSearchParams } from 'react-router-dom';


function Truck() {
    const [truck, setTruck] = useState([])
    const [iframe1, setIframe1] = useState(false)
    const [iframe2, setIframe2] = useState(false)
    const [iframe3, setIframe3] = useState(false)
    const [iframe4, setIframe4] = useState(false)
    const [iframe5, setIframe5] = useState(false)
    const [iframe6, setIframe6] = useState(false)
    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

    const location = useLocation();

    // Parse the query string to get the 'id' parameter
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    function getTrucks() {
        fetch( apiURL + '/getTruck.php' + '?id=' + id)
        .then(response => response.json())
        .then(response => {setTruck(response[0])})
    }

    useEffect(()=>{
        getTrucks()
    },[])

    useEffect(()=>{
        console.log(truck);
    },[truck])

    function upperCase(string) {
        if (string != null) {
          return string.toUpperCase();
        } else {
          return "Loading ...";
        }
    }
    function formatTime(time){  
        const militaryTime = new Date(`1970-01-01T${time}`);
        const hours = militaryTime.getHours();
        const minutes = militaryTime.getMinutes();
    
        const period = hours >= 12 ? 'pm' : 'am';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
        return formattedTime;
    };

    function formatDate(dateString) {
        if (dateString != null) {
          const dateObject = new Date(dateString);
      
          // Increase the date by one day
          dateObject.setDate(dateObject.getDate() + 1);
      
          const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(dateObject);
      
          return formattedDate;
        } else {
          return 'Loading...';
        }
      }

      useEffect(() => {
          if (iframe1) {
            console.log(1);
          }
          if (iframe2) {
            console.log(2);
          }
          if (iframe3) {
            console.log(3);
          }
          if (iframe4) {
            console.log(4);
          }
          if (iframe5) {
            console.log(5);
          }
          if (iframe6) {
            console.log(6);
          }
      }, [iframe5]);




  return (
    <div className='wrapper'>
        <Navbar />
        <div className='content'>
            <HeadNav title={upperCase(truck.company)} />
            <h3> {truck.location} </h3>
            <h3> {formatDate(truck.date)} | {formatTime(truck.time)}</h3>
            <iframe className="imgFrame" src={'http://api.ttfconstruction.com/getImage1.php?id=' + id} onLoad={()=>setIframe1(true)} />
            <iframe className="imgFrame" src={'http://api.ttfconstruction.com/getImage2.php?id=' + id} onLoad={()=>setIframe2(true)} />
            <iframe className="imgFrame" src={'http://api.ttfconstruction.com/getImage3.php?id=' + id} onLoad={()=>setIframe3(true)} />
            <iframe className="imgFrame" src={'http://api.ttfconstruction.com/getImage4.php?id=' + id} onLoad={()=>setIframe4(true)} />
            <iframe className="imgFrame" src={'http://api.ttfconstruction.com/getImage5.php?id=' + id} onLoad={()=>setIframe5(true)} />
            <iframe className="imgFrame" src={'http://api.ttfconstruction.com/getImage6.php?id=' + id} onLoad={()=>setIframe6(true)} /> 
        </div> 
    </div>
  )
}

export default Truck
