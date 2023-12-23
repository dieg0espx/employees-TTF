import React, { useEffect, useState } from 'react'

function Navbar() {

  const [currentPage, setCurrentPage] = useState()

  useEffect(()=>{
    const storedPage = localStorage.getItem('currentPage')
    if(storedPage){
      setCurrentPage(storedPage)
    }
  },[])

  function changePage(page){
    localStorage.setItem('currentPage', page)
    setCurrentPage(page)
    window.location.href= '/#/' + page
  }

  return (
    <div className='wrapper-navbar'>
      <button onClick={()=> changePage("orders")}   className={currentPage == "orders" ? 'selected':''}> <i className="bi bi-list-ol navIcon"></i> Orders</button>
      <button onClick={()=> changePage("trucks")}   className={currentPage == "trucks" ? 'selected':''}> <i className="bi bi-truck navIcon"></i> Trucks</button>
      <button onClick={()=> changePage("forklift")} className={currentPage == "forklift" ? 'selected':''}> <i className="bi bi-moisture navIcon"></i> Forklift</button>
      <button onClick={()=> changePage("hours")}    className={currentPage == "hours" ? 'selected':''}> <i className="bi bi-stopwatch navIcon"></i> Hours</button>
      <button onClick={()=> changePage("profile")}  className={currentPage == "profile" ? 'selected':''}> <i className="bi bi-person-circle navIcon"></i> Profile</button>
    </div>
  )
}

export default Navbar
