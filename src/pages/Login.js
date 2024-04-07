import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import logo from '../images/logo.png'
import Switch from "react-switch";


function Login(props) {
    const [username, setUsername] = useState(Cookies.get('access'))
    const [password, setPassword] = useState('')
    const [remmember, setRemmember] = useState(false)

    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

useEffect(()=>{
    if(Cookies.get('username')){
        setRemmember(true)
        setUsername(Cookies.get('username'))
    }
},[])

    async function checkUser(){
        const data = {username, password};
        const jsonString = JSON.stringify(data);
        await fetch( apiURL + '/checkUser.php?data=' + jsonString)
        .then(response => response.json())
        .then(response => {
            if(response.status == 200){
                Cookies.set('access', true, { expires: 480 / 1440 });
                Cookies.set('code', response.code, { expires: 480 / 1440 });
                if(remmember){
                    Cookies.set('username', username)
                } else {
                    Cookies.remove('username')
                }
                window.location.reload()
            } else {
                alert("USER NOT FOUND :(")
                setPassword('')
            }
            console.log(response);
        })
    }

  return (
    <div className='wrapper-login'>
        <div className='content'>
            <img src={logo} />
            <input type='email' placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type='password'placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <div className='remmember'>
                <p> Remember me</p>
                <Switch onChange={()=>setRemmember(!remmember)} checked={remmember} uncheckedIcon={false} checkedIcon={false} onColor='#65D1B5'/>
            </div>
            
            <button onClick={()=>checkUser()}> Access </button>
        </div>
    </div>
  )
}

export default Login