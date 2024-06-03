import React, { useEffect, useState } from 'react'
import HeadNav from '../components/HeadNav'
import Navbar from '../components/Navbar'

function NewJosbite() {
    const [randomNumber, setRandomNumber] = useState()
    const [jobsites, setJobsites] = useState([])

    const [companyName, setCompanyName] = useState('')
    const [jobsite, setJobsite] = useState('')
    const [contact, setContact] = useState('')
    const [tel, setTel] = useState('')
    const [email, setEmail] = useState('')
    
    const [data, setData] = useState([])

    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;
    
    useEffect(()=>{
        setData([companyName, jobsite, contact, tel, email])
    }, [companyName, jobsite, contact, tel, email])

    

    useEffect(()=>{
        fetch(apiURL + '/getJobsites.php')
        .then(response => response.json())
        .then(response => {
            const sortedJobsites = response.sort((a, b) => a.companyName.localeCompare(b.companyName));
            setJobsites(sortedJobsites);
          });
          generateRandomNumber()
    },[])

    function generateRandomNumber(){
        const min = 1000;
        const max = 9999;
        let codeFound = true;
        let newCode;
        while(codeFound){
          const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
          for(let i = 0; i < jobsites.length; i++){
            if(randomNum == jobsites[i].code){
              break;
            }
          } 
          codeFound = false;
          newCode = randomNum
        }
        setRandomNumber(newCode)
    }

    async function saveNewJobsite(){
        const data = {code:randomNumber, company:companyName, jobsite, contact, tel};
        const jsonString = JSON.stringify(data);
        let response = await fetch( apiURL + '/newJobsite.php?data=' + jsonString)
        console.log(response);
        if(response.status == 200){
          alert("New Jobsite added successfully !")
        } else {
          alert("Error Creating New Jobsite :( ")
        }

        setCompanyName('')
        setJobsite('')
        setContact('')
        setTel('')
        
        window.location.reload()
    }

  return (
    <div className='wrapper-newJobsite'>
        <HeadNav title="New Jobsite" />
        <Navbar page="trucks" />
        <div className='content'>
            <div className='form'>
                <input type="text" placeholder='Company Name' onChange={(e)=>setCompanyName(e.target.value)}/>
                <input type="text" placeholder='Jobsite Address' onChange={(e)=>setJobsite(e.target.value)}/>
                <input type="text" placeholder='Contact' onChange={(e)=>setContact(e.target.value)}/>
                <input type="tel" placeholder='Tel' onChange={(e)=>setTel(e.target.value)}/>
                <p className='randomCode'> {randomNumber} </p>
                <button onClick={()=>saveNewJobsite()}> Save </button>
            </div>
        </div>
    </div>
  )
}

export default NewJosbite