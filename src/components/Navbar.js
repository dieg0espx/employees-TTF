import React, { useEffect, useState } from 'react'

function Navbar(props) {
  const [currentPage, setCurrentPage] = useState()

  useEffect(()=>{
    setCurrentPage(props.page)
  },[])

  function changePage(page){
    window.location.href= '/#/' + page
  }

  return (
    <div className='wrapper-navbar'>
      <button onClick={()=> changePage("orders")}   className={currentPage == "orders" ? 'selected':''}> <i className="bi bi-list-ol navIcon"></i> Orders</button>
      <button onClick={()=> changePage("trucks")}   className={currentPage == "trucks" ? 'selected':''}> <i className="bi bi-truck navIcon"></i> Trucks</button>
      <button onClick={()=> changePage("forklifts")} className={currentPage == "forklifts" ? 'selected':''}> <i className="bi bi-moisture navIcon"></i> Forklift</button>
      <button onClick={()=> changePage("hours")}    className={currentPage == "hours" ? 'selected':''}> <i className="bi bi-stopwatch navIcon"></i> Hours</button>
      <button onClick={()=> changePage("profile")}  className={currentPage == "profile" ? 'selected':''}> <i className="bi bi-person-circle navIcon"></i> Profile</button>
    </div>
  )
}

export default Navbar
