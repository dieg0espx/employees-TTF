import React from 'react'
import HeadNav from '../components/HeadNav'
import Navbar from '../components/Navbar'

function Sample() {
  return (
    <div className='wrapper'>
        <HeadNav title="Sample"/>
        <Navbar />
        <div className='content'>

            HERE GOES THE CONTENT
        </div>
    </div>
  )
}

export default Sample
