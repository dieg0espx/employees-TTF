import React from 'react'

function Navbar() {

  return (
    <div className='wrapper-navbar'>
      <button onClick={()=> window.location.href="/#/orders"}> <i className="bi bi-list-ol navIcon"></i> Orders</button>
      <button onClick={()=> window.location.href="/#/trucks"}> <i className="bi bi-truck navIcon"></i> Trucks</button>
      <button onClick={()=> window.location.href="/#/ordersPage"}> <i className="bi bi-moisture navIcon"></i> Forklift</button>
      <button> <i className="bi bi-stopwatch navIcon"></i> Hours</button>
      <button> <i className="bi bi-person-circle navIcon"></i> Profile</button>
    </div>
  )
}

export default Navbar
