import React, {useEffect, useState} from 'react'
import HeadNav from '../components/HeadNav'
import Navbar from '../components/Navbar'

function TrucksPage() {
  const [trucks, setTrucks] = useState([])
  const [showSidebar, setShowSidebar] = useState(false)
  const [selectedTruck, setSelectedTruck] = useState([])
  const [openIframe, setOpenIframe] = useState(0)
  const [showPopup, setShowPopup] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const apiURL = process.env.REACT_APP_PUBLIC_API_URL;
  useEffect(()=>{
        getTrucks()
        window.innerWidth < 600 ? setIsMobile(true):setIsMobile(false)
  },[])
  function getTrucks() {
      fetch( apiURL + '/getTrucks.php')
      .then(response => response.json())
      .then(response => {
          console.log(response);
          const sortedTrucks = response.sort((a, b) => new Date(b.date) - new Date(a.date));
          setTrucks(sortedTrucks);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }
  function formatDate(date){
    let preFormat = new Date(date).toLocaleDateString('en-US', {
       month: '2-digit',
       day: '2-digit',
       year: 'numeric',
     });
     const dateStr = preFormat
     const dateObj = new Date(dateStr);
     const options = { year: 'numeric', month: 'long', day: 'numeric' };
     const formattedDate = dateObj.toLocaleDateString('en-US', options);

     return formattedDate
  }
  function showTruck(id, company, location, date, time, status){
      setSelectedTruck({id, company, location, date, time, status})
      setShowSidebar(true)
  }
  function openImage(url){
    setShowPopup(true)
    setSelectedImage(url)
  }
  function getMonthName(monthNumber) {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if (monthNumber >= 1 && monthNumber <= 12) {
        return months[monthNumber - 1];
    } else {
        // Handle invalid month numbers
        return "Invalid Month";
    }
  }

  return (
    <div className='wrapper'>
        <HeadNav title="Trucks" />
        <Navbar />
        <div className='content'>
            {trucks.map((truck) => (
              <div className='trucks' onClick={()=>showTruck(truck.id, truck.company, truck.location, truck.date, truck.time, truck.status)}>
                <i className= {truck.status == 'Return' ? "bi bi-circle-fill returnBullet":"bi bi-circle-fill shippingBullet"}></i>
                <div>
                    <p id="company"> {truck.company} </p>
                    <p id="jobsite"> {truck.location} </p>
                    <p id="time"> {truck.time} </p>
                </div>
                <div>
                    <p className='date-day'> {truck.date.split('-')[2]}</p>
                    <p className='date-month'> {getMonthName(truck.date.split('-')[1])}</p>
                    <p className='date-year'> {truck.date.split('-')[0]}</p>
                </div>
              </div>
            ))}        
        </div>
    </div>
  )
}

export default TrucksPage
