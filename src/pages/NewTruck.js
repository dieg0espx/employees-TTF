import React, { useEffect, useState } from 'react';
import HeadNav from '../components/HeadNav';
import Navbar from '../components/Navbar';

function NewTruck() {
  const [companies, setCompanies] = useState([]);
  const [findingCompany, setFindingCompany] = useState('');

  const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

  async function getCompanies() {
      await fetch(apiURL + '/getCompanies.php')
      .then(response => response.json())
      .then(response => setCompanies(response))
  }

  useEffect(() => {
    getCompanies();
  }, []);


  return (
    <div className='wrapper-newTruck'>
      <HeadNav title="Select Company" action="plus" newLocation="#/newJobsite"/>
      <Navbar page="trucks" />
      <div className='content'>
        <p className='label'> Choose a company:</p>
        <div className='searchBar'>
            <input type='text' placeholder='Search by Company' onChange={(e) => setFindingCompany(e.target.value)}/>
            <i className="bi bi-search iconSearch"></i>
        </div> 
        {companies
          .filter(company => company.startsWith(findingCompany))
          .map((companyName) => (
            <div className='row' key={companyName} onClick={() => window.location.href=`#/selectjobsite/${companyName.toUpperCase()}`}>
              <p>{companyName}</p>
              <i className="bi bi-chevron-compact-right iconChev"></i>
            </div>
        ))}
      </div>
    </div>
  );
}

export default NewTruck;
