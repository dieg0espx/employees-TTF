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
      fetch( apiURL + '/readTrucks.php')
      .then(response => response.json())
      .then(response => {
        console.log(response);
        
          const sortedTrucks = response.sort((a, b) => b.id - a.id);
          setTrucks(sortedTrucks);
      })
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
        <Navbar page="trucks"/>
        <div className='content'>
            {trucks.filter((truck) => truck.company && truck.company.trim() !== '').map((truck) => (
              <div className='trucks' onClick={()=>showTruck(truck.id, truck.company, truck.theLocation, truck.theDate, truck.theTime, truck.the)}>
                   <div>
                    <p className='date-day'> {truck.theDate.split('-')[2]}</p>
                    <p className='date-month'> {getMonthName(truck.theDate.split('-')[1])}</p>
                    <p className='date-year'> {truck.theDate.split('-')[0]}</p>
                </div>
                <div>
                    <p id="company"> {truck.company} </p>
                    <p id="jobsite"> {truck.theLocation} </p>
                    <div className='timeAndStatus'>
                      <p id={truck.theStatus == 'Return' ? "return":"shipping"}> {truck.theStatus == 'Return' ? "Return":"Shipping"} </p>
                      <p id="time"> <i className="bi bi-clock"></i> {formatTime(truck.theTime)} </p>
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
