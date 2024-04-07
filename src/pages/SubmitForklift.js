import React, {useEffect, useState} from 'react'
import HeadNav from '../components/HeadNav'
import Navbar from '../components/Navbar'

function SubmitForklift() {
  const apiURL = process.env.REACT_APP_PUBLIC_API_URL;
  const [checkedRules, setCheckedRules] = useState([]);
  const [comment, setComment] = useState('') 
  const [newForklift, setNewForklift] = useState([])
  const [status, setStatus] = useState(1);


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

  function toggleRule(index) {
    if (checkedRules.includes(index)) {
      setCheckedRules(checkedRules.filter((checkedRule) => checkedRule !== index));
    } else {
      setCheckedRules([...checkedRules, index]);
    }
  }  

  function submitForklift(){
    let data = []
    data = {
      name: 'Name',
      forklift: status === 1 ? "No.1 Green" : "No.2 Orange",
      comment: comment,
    };
    
    for (let i = 1; i < 30; i++) {
      data[`ch${i}`] = checkedRules.includes(i) ? "&#9745" : "&#9744";
    }
    console.log(data);
    
    const jsonString = JSON.stringify(data);
    console.log(jsonString);
    fetch( apiURL + '/newForklift.php?data=' + jsonString)
    .then(response => response.json())
    .then(response => console.log(response))
  }



  return (
    <div className='wrapper' id="new-forklift">
        <HeadNav title="New Forklift"/>
        <Navbar />
        <div className='content'>
        <div className="selector2">
        <p className={status == 1 ? "selected" : ""} id="left" onClick={() => setStatus(1)}>No.1 Green</p>
        <p className={status == 2 ? "selected" : ""} id="right" onClick={() => setStatus(2)}>No.2 Orange</p>
      </div>
            {rules.map((rule, index) => (
                <div key={index} className='row-rules' onClick={()=>toggleRule(index)}>
                    <button className={checkedRules.includes(index) ? 'checked' : 'unchecked'}> <i className="bi bi-check-lg iconCheck"></i> </button>
                    <p>{rule} </p>
                </div>
            ))}
            <p id="label"> Comments: </p>
            <div className='comment-wrapper'>
                <textarea onChange={(e)=> setComment(e.target.value)}> </textarea>
            </div>
            <button className='btn-submit' onClick={()=>submitForklift()}> Submit </button>
        </div>
    </div>
  )
}

export default SubmitForklift