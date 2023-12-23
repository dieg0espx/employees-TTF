import React, { useEffect, useState } from 'react'
import HeadNav from '../components/HeadNav'
import Navbar from '../components/Navbar'


function NewTruck() {
    const [jobsites, setJobsites] = useState([])
    const [findingCompany, setFindingCompany] = useState('')

    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

    async function getJobsites(){
        await fetch(apiURL + '/getJobsites.php')
        .then(response => response.json())
        .then(response => setJobsites(response))
    }


    useEffect(()=>{
        getJobsites()
    },[])


  return (

    <div className='wrapper'>
        <HeadNav title="New Truck"/>
        <Navbar />
        <div className='content'>
        <input type='text' placeholder='Search a company'onChange={(e)=>setFindingCompany(e.target.value)}/>
        {jobsites.map((jobsite) => (
            jobsite.companyName.includes(findingCompany) && (
                <p key={jobsite.id}>{jobsite.companyName}</p>
            )
        ))}
        </div>
        
    </div>
  )
}

export default NewTruck
    