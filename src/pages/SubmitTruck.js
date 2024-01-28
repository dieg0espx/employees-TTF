import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import HeadNav from '../components/HeadNav';
import Navbar from '../components/Navbar';

function SubmitTruck() {
    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;
    const { id } = useParams();
    const [jobsite, setJobsite] = useState([])

    async function getJobsite() {
        await fetch(apiURL + '/getJobsitePerId.php?id=' + id)
        .then(response => response.json())
        .then(response => setJobsite(response))
    }

    useEffect(()=>{
        getJobsite()
    },[])
  return (
    <div className='wrapper-submitJobsite'>
        <HeadNav title={jobsite.companyName} upperCase={true} />
        <Navbar page="trucks" />
        <h3> {jobsite.jobsite} </h3>
        <div className='file-container'>
            <input type='file' />
        </div>
        <div className='file-container'>
            <input type='file' />
        </div>
        <div className='file-container'>
            <input type='file' />
        </div>
        <div className='file-container'>
            <input type='file' />
        </div>
        <div className='file-container'>
            <input type='file' />
        </div>
        <div className='file-container'>
            <input type='file' />
        </div>
        
    </div>
  )
}

export default SubmitTruck