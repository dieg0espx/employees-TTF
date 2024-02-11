import React, { useEffect, useState } from 'react'
import HeadNav from '../components/HeadNav'
import Navbar from '../components/Navbar'
import { useLocation, useSearchParams } from 'react-router-dom';
import { useParams, Link } from 'react-router-dom';


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
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  function getTrucks() {
    fetch( apiURL + '/readTruckByID.php' + '?id=' + id)
    .then(response => response.json())
    .then(response => {setTruck(response[0])})
  }

  useEffect(()=>{
      getTrucks()
  },[])

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

  return (
    <div className='wrapper'>
        <Navbar page="trucks"/>
        <div className='content'>
            <HeadNav title={truck.company} />
            <h3> {truck.theLocation} </h3>
            <h3> {formatDate(truck.theDate)} | {formatTime(truck.theTime)}</h3>
            <img className="truckImg" src={truck.image1} style={{display: truck.image1 !== ''? "block":"none"}}/>
            <img className="truckImg" src={truck.image2} style={{display: truck.image2 !== ''? "block":"none"}}/>
            <img className="truckImg" src={truck.image3} style={{display: truck.image3 !== ''? "block":"none"}}/>
            <img className="truckImg" src={truck.image4} style={{display: truck.image4 !== ''? "block":"none"}}/>
            <img className="truckImg" src={truck.image5} style={{display: truck.image5 !== ''? "block":"none"}}/>
            <img className="truckImg" src={truck.image6} style={{display: truck.image6 !== ''? "block":"none"}}/>
        </div> 
    </div>
  )
}

export default Truck
