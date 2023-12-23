import React, {useEffect, useState} from 'react'
import HeadNav from '../components/HeadNav'
import Navbar from '../components/Navbar'

function TrucksPage() {
  const [trucks, setTrucks] = useState([])
  const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

  useEffect(()=>{
    getTrucks()
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

  function showTruck(id){
      window.location.href = "/#/truck?id=" + id
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



  return (
    <div className='wrapper'>
        <HeadNav title="Trucks" action="plus" newLocation="/#/newTruck"/>
        <Navbar />
        <div className='content'>
            {trucks.map((truck) => (
              <div className='trucks' onClick={()=>showTruck(truck.id, truck.company, truck.location, truck.date, truck.time, truck.status)}>
                   <div>
                    <p className='date-day'> {truck.date.split('-')[2]}</p>
                    <p className='date-month'> {getMonthName(truck.date.split('-')[1])}</p>
                    <p className='date-year'> {truck.date.split('-')[0]}</p>
                </div>
                <div>
                    <p id="company"> {truck.company} </p>
                    <p id="jobsite"> {truck.location} </p>
                    <div className='timeAndStatus'>
                      <p id={truck.status == 'Return' ? "return":"shipping"}> {truck.status == 'Return' ? "Return":"Shipping"} </p>
                      <p id="time"> <i className="bi bi-clock"></i> {formatTime(truck.time)} </p>
                    </div>
                </div>
                <p><i className="bi bi-chevron-compact-right"></i></p>
              </div>
            ))}        
        </div>
    </div>
  )
}

export default TrucksPage
