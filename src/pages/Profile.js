import React, { useEffect, useState } from 'react'
import HeadNav from '../components/HeadNav'
import Navbar from '../components/Navbar'
import Cookies from 'js-cookie';

function Profile() {
    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;
    const [employee, setSEmployee] = useState([])
    const [hours, setHours] = useState([])

    useEffect(()=>{
        getEmployee()
        getHours()
    },[])

    let id = Cookies.get('code')
    async function getEmployee(){
        fetch(apiURL + '/getEmployeeById.php' + '?id=' + id)
        .then(response => response.json())
        .then(response => setSEmployee(response[0]));
    }

    async function getHours(){
        fetch(apiURL + '/getHoursById.php' + '?id=' + id)
        .then(response => response.json())
        .then(response => {
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
        <HeadNav title="My Account" />
        <Navbar />
        <div className='content'>
            <div className='profile'>
                <div className='row'>
                    <p><b> Full Name: </b></p>
                    <p> {employee.name} </p>
                </div>
                <div className='row'>
                    <p><b> Username: </b></p>
                    <p> {employee.email} </p>
                </div>
                <div className='row'>
                    <p><b> Password: </b></p>
                    <p id='password'> {employee.password} </p>
                </div>
                <div className='row'>
                    <p><b> Contracted: </b></p>
                    <p> {employee.contracted == 0 ? "False" : "True"} </p>
                </div>
            </div>

            <hr style={{margin:'20px 0'}}></hr>

            <div className='hours'>
                <div className='list'>
                    {hours.map((row) => (
                        <div className='row'>
                            <p id="date"> {formatDate(row.date)} </p>
                            <p> {row.signIn} </p>
                            <p> {row.signOut} </p>
                            <p> {row.regHours} </p>
                            <p> {parseFloat(row.otHours).toFixed(2)} </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile