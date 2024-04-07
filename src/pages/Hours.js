import React, { useEffect, useState } from 'react'
import HeadNav from '../components/HeadNav'
import Navbar from '../components/Navbar'
import Cookies from 'js-cookie';

function Hours() {
    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;
    const [hours, setHours] = useState([])

    useEffect(()=>{
        getHours()
    },[])


    let id = Cookies.get('code')
    async function getHours(){
        fetch(apiURL + '/getHoursById.php' + '?id=' + id)
        .then(response => response.json())
        .then(response => {
            // Sort the response array by date in descending order
            response.sort((a, b) => new Date(b.date) - new Date(a.date));
            setHours(response);
        });
    }

    function formatDate(dateStr) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dece'];
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        return `${months[month]} ${day}, ${year}`;
    }
    

  return (
    <div className='wrapper'>
        <HeadNav title="Worked Hours" /> 
        <Navbar />
        <div className='content'>
            <div className='main-grid'>
               <div className='hours'>
                    <div className='list'>
                        {hours.map((row) => (
                            <div className='row'>
                                <p id="date"> {formatDate(row.date)} </p>
                                <p> {row.signIn} </p>
                                <p> {row.signOut} </p>
                                <p> {row.regHours} </p>
                                <p> {row.otHours} </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hours