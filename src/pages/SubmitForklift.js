import React, {useEffect, useState} from 'react'
import HeadNav from '../components/HeadNav'
import Navbar from '../components/Navbar'

function SubmitForklift() {
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
    const [checkedRules, setCheckedRules] = useState([]);

    function toggleRule(index) {
        if (checkedRules.includes(index)) {
          // Rule is checked, remove it from the list
          setCheckedRules(checkedRules.filter((checkedRule) => checkedRule !== index));
        } else {
          // Rule is unchecked, add it to the list
          setCheckedRules([...checkedRules, index]);
        }
      }
      

      useEffect(()=>{
        console.log(checkedRules);
      },[checkedRules])

      function submitForklift(){

      }

  return (
    <div className='wrapper' id="new-forklift">
        <HeadNav title="New Forklift"/>
        <Navbar />
        <div className='content'>
            {rules.map((rule, index) => (
                <div key={index} className='row-rules' onClick={()=>toggleRule(index)}>
                    <button className={checkedRules.includes(index) ? 'checked' : 'unchecked'}> <i className="bi bi-check-lg iconCheck"></i> </button>
                    <p>{rule} </p>
                </div>
            ))}
            <p id="label"> Comments: </p>
            <div className='comment-wrapper'>
            <textarea> </textarea>
            </div>
            <button className='btn-submit' onClick={()=>submitForklift()}> Submit </button>
        </div>
    </div>
  )
}

export default SubmitForklift