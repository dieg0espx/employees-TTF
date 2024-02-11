import React, { useState, useEffect } from 'react'
import HeadNav from '../components/HeadNav'
import Navbar from '../components/Navbar'
import ForkliftIcon from '../components/ForkliftIcon'




function Forklifts() {
    const [forklifts, setForklifts] = useState([])
    const [selectedForklift, setSelectedForklift] = useState([])
 
    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;
    let rules = [
        'Check the forks or attachment are in the lowered position and the park brake is applied.',
        'Observe condition of the forks, and the lock pins or the lifting attachment.',
        'Check the hydraulic lift cylinder and hydraulic hoses for leaks.',
        'Inspect the lift chains for even tension, mast rails and carriage rollers for signs of bearing failure (will appears as silver fleck in the channel of the mast). Give them a pull.',
        'Check the left tilt cylinder, anchor pins and hose connection for leaks.',
        'Check the left front tire condition hub and attaching bolts.',
        'Check front lights, windshield and left side overhead guard. Especially during winter.',
        'Check the left rear tire, hub and attaching bolts and tie rod end.',
        'Check counterweight bolt. Look for rust.',
        'Check propane cylinder is firmly attached, level and make sure the service valve is open.',
        'Check right rear wheel hub and attaching bolts.',
        'Check rear lights and right side overhead guard condition.',
        'Check right side tilt cylinder, anchors and hydraulic connections.',
        'Check right front tire condition hub and attaching bolts',
        'Check the battery is secure and the connections are not corroded. Use wire brush to clean.',
        'Check for oil and coolant leaks. Coolant can be green or orange. Check air filter for debris.',
        'Check the engine and hydraulic oil levels. Header tank needs to be half way full.',
        'Check the hoses and belts. Indication would be squealing after you start it up.',
        'Check the radiator is clear of debris. Especially important in summer due to dust accumulation. Blow it out with compressed air.',
        'Fasten seat belt.',
        'Check the capacity plate (there must be one on the machine).',
        'Check the condition of the overhead guard.',
        'Check the horn, wipers, and signals if applicable.',
        'Start the engine and listen for any unusual noises, observe the dash gauges.',
        'Check the steering, turn the wheel lock to lock. Check the tire condition, no gouges.',
        'Check that the parking brake will hold the machine while in forward and reverse gear.',
        'Check the Hydraulic controls (raise, lowers, tilt, and side to side). If you hear a chattering or growling noise, or it bounces as it goes up it means you’re running low.',
        'Release park brake and check forward (and reverse) travel and foot break operation. Make sure break pedal feels the same way. Back up alarm should sound.'
    ]

    useEffect(()=>{
      getForklifts()
    },[])

    function getForklifts() {
        fetch( apiURL + '/getForklifts.php')
        .then(response => response.json())
        .then(response => {
            const sortedForklifts = response.sort((a, b) => new Date(b.date) - new Date(a.date));
            setForklifts(sortedForklifts);
        })
    }
    useEffect(()=>{
        console.log(forklifts);
    },[forklifts])

    function formatDate(date){
        let preFormat = new Date(date).toLocaleDateString('en-US', {
           month: '2-digit',
           day: '2-digit',
           year: 'numeric',
         });
         const dateStr = preFormat
         const dateObj = new Date(dateStr);
         const options = { year: 'numeric', month: 'long', day: 'numeric' };
         const formattedDate = dateObj.toLocaleDateString('en-US', options);
 
         return formattedDate
     }



  return (
    <div className='wrapper'>
        <HeadNav title="Forklifts" action="plus" newLocation="/#/submitForklift"/> 
        <Navbar />
        <div className='content'>
            <div className='main-grid'>
                  <div className='forklifts'>
                    {forklifts.map((row, key) => (
                      <div key={key} className='row-forklift' onClick={() => setSelectedForklift(key)}>
                        <div className='iconContainer' style={{background:row.forklift == 'No.1 (Green)'?'#65D1B5':'salmon'}}>
                            <ForkliftIcon  fillColor={row.forklift == 'No.1 (Green)'?'#282c34':'#282c34'} className='iconForklift'/>
                        </div>                        
                        <div className='name-container'>
                            <p id="name"> {row.name} </p>
                        </div>
                        <p id="date"> {formatDate(row.date)} </p>
                      </div>
                    ))}
                  </div>
            </div>
        </div>
    </div>
  )
}

export default Forklifts
