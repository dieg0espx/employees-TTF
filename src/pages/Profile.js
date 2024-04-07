import React, { useEffect, useState } from 'react'
import HeadNav from '../components/HeadNav'
import Navbar from '../components/Navbar'
import Cookies from 'js-cookie';

function Profile() {
    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;
    const [employee, setSEmployee] = useState([])
    const [hours, setHours] = useState([])
    const [showPopup, setShowPopup] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState()
    const [passwordError, setPasswordError] = useState(false)

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

    async function updatePassword(){
        if(password  == passwordConfirm && password !== ''){
            fetch( apiURL + '/updatePassword.php' + '?id=' + id + '&&password=' + password)
            .then(response => response.json())
            .then(response => console.log(response))
            setPasswordError(false)
            alert("Password Updated Successfuly !")
            await getEmployee()
            setShowPopup(false)
            setPassword('')
            setPasswordConfirm('')
        } else {
            setPasswordError(true)
        }
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
                <div className='row' onClick={()=> setShowPopup(true)}>
                    <p><b> Password: </b></p>
                    <input type="password" value={employee.password} id='password' /> 
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
        <div className='overlay' style={{display: showPopup? "block":"none"}} onClick={()=>setShowPopup(false)}/>
        <div className='popup-password'  style={{display: showPopup? "block":"none"}}>
            <h2> Update Password</h2>
            <div className='form'>
                <input type='password' value={password} placeholder='New Password' onChange={(e)=> setPassword(e.target.value)} style={{border: passwordError ? '1px solid red':'1px solid transparent'}}/>
                <input type='password' value={passwordConfirm} placeholder='Confirm Password'  onChange={(e)=> setPasswordConfirm(e.target.value)} style={{border: passwordError ? '1px solid red':'1px solid transparent'}}/>
                <button onClick={()=> updatePassword()}> Save </button>
            </div>
        </div>
    </div>
  )
}

export default Profile