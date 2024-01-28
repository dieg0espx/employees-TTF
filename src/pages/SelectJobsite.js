import React, { useEffect, useState } from 'react'
import HeadNav from '../components/HeadNav'
import { useParams, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

function SelectJobsite() {
  const { company } = useParams();
  const [jobsites, setJobsites] = useState([])
  const [findingJobsite, setFindingJobsite] = useState('')

  const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

  async function getJobsites() {
      await fetch(apiURL + '/getJobsitesPerCompany.php?company=' + company)
      .then(response => response.json())
      .then(response => setJobsites(response))
  }

  useEffect(()=>{
    getJobsites()
  },[] )

  return (
    <div className='wrapper-selectJobsite'>
        <HeadNav title={company} /> 
        <Navbar page="trucks" />
        <p className='label'> Choose a jobsite address:</p>
        <div className='searchBar'>
            <input type='text' placeholder='Search by address' onChange={(e) => setFindingJobsite(e.target.value)}/>
            <i className="bi bi-search iconSearch"></i>
        </div> 
        {jobsites
          .filter(jobsite => jobsite.jobsite.startsWith(findingJobsite))
          .map((jobsite) => (
            <div className='row' key={jobsite} onClick={()=> window.location.href = "/#/submitTruck/" + jobsite.id}>
              <p>{jobsite.jobsite}</p>
              <i className="bi bi-chevron-compact-right iconChev"></i>
            </div>
        ))}
    </div>
  )
}

export default SelectJobsite