import React, { useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router-dom';
import HeadNav from '../components/HeadNav'
import Navbar from '../components/Navbar'
import SignatureCanvas from 'react-signature-canvas';



function Order() {
    const [order, setOrder] = useState([])    
    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;
    
    useEffect(()=>{
        fetchData()
    },[])

    function getID(){
      let location = window.location.toString()
      return location.split('=')[1]
    }

    function fetchData(){
      fetch(apiURL + '/getOrderByID.php?id=' +  getID())
      .then(response => response.json())
      .then(response => setOrder(response))
    }

    async function updateOrderDone(){
        await fetch(`${apiURL}/updateOrderDone.php?id=` + getID())
        fetchData()
      };

    const showConfirmation = () => {
      const result = window.confirm('Mark as Completed?');
      if (result) {
        updateOrderDone()
      } 
    };

      const [signTenant1, setSignTenant1] = useState(null)
      const [currentTenantSign1, setCurrentSignTenant] = useState()


      //  ==== SIGNATURES ====  // 
      function clearSign(signID){
        switch (signID) {
          case 1:
            signTenant1.clear()
            break;
          default:
            console.log("SIGNER NOT FOUND");
            break;
        }
      }
      async function storeSign(){
        await fetch(`${apiURL}/updateOrderSignature.php?id=` + getID() + '&&signature=' + signTenant1.getTrimmedCanvas().toDataURL('image/png').toString())
        console.log("Sign Submitted");
        fetchData()
      }





  return (
    <div className='wrapper'>
        <Navbar />
        <div className='content'>
        {order.map((elements) => (   
                <div key={elements}> 
                    <HeadNav title={elements.company}/>
                    <h3> {elements.jobsite} </h3>
                    <div className='badges'>
                      <div className='badge-completed' style={{display: elements.done == 1? "block":"none"}}>
                        <i className="bi bi-check-circle-fill"></i> Completed
                      </div>
                      <div className='badge-completed' style={{display: elements.signature !== ''? "block":"none"}}>
                        <i className="bi bi-pen-fill"></i> Signed
                      </div>
                    </div>
                
                    <div className='row'>
                      <h4> Company: </h4>
                      <p> {elements.company}</p>
                    </div>
                    <div className='row'>
                      <h4> Jobsite: </h4>
                      <p> {elements.jobsite}</p>
                    </div>
                    <div className='row'>
                      <h4> Date: </h4>
                      <p> {elements.date}</p>
                    </div>

                    <div style={{display: elements.af6x4 + elements.af5x4 +elements.af4x4 + elements.sf6x4 +elements.sf5x4 +elements.sf4x4 + elements.sf3x4 < 1 ? "none":"block" }}>
                        <h5> Frames </h5>
                    </div>

                    <div className='row' style={{display: elements.af6x4 < 1 ? "none":"flex"}}>
                      <h4> 6’h X 4’w Aluminum Frames: </h4>
                      <p> {elements.af6x4}</p>
                    </div>
                    <div className='row' style={{display: elements.af5x4 < 1 ? "none":"flex"}}>
                      <h4> 5’h X 4’w Aluminum Frames: </h4>
                      <p> {elements.af5x4}</p>
                    </div>
                    <div className='row' style={{display: elements.af4x4 < 1 ? "none":"flex"}}>
                      <h4> 4’h X 4’w Aluminum Frames: </h4>
                      <p> {elements.af4x4}</p>
                    </div>
                    <div className='row' style={{display: elements.sf6x4 < 1 ? "none":"flex"}}>
                      <h4> 6’h X 4’w Steel Frames: </h4>
                      <p> {elements.sf6x4}</p>
                    </div>
                    <div className='row' style={{display: elements.sf5x4 < 1 ? "none":"flex"}}>
                      <h4> 5’h X 4’w Steel Frames: </h4>
                      <p> {elements.sf5x4}</p>
                    </div>
                    <div className='row' style={{display: elements.sf4x4 < 1 ? "none":"flex"}}>
                      <h4> 4’h X 4’w Steel Frames: </h4>
                      <p> {elements.sf4x4}</p>
                    </div>
                    <div className='row' style={{display: elements.sf3x4 < 1 ? "none":"flex"}}>
                      <h4> 3’h X 4’w Steel Frames: </h4>
                      <p> {elements.sf3x4}</p>
                    </div>

                    <div style={{display: elements.cb10x4 +elements.cb10x2 +elements.cb7x4 +elements.cb7x2 +elements.cb5x4 +elements.cb5x2 +elements.cb4x4 +elements.cb4x2 < 1 ? "none":"block" }}>
                        <h5> Cross Bars </h5>
                    </div>

                    <div className='row' style={{display: elements.cb10x4 < 1 ? "none":"flex"}}>
                      <h4> 10 x 4 Cross Bars: </h4>
                      <p> {elements.cb10x4}</p>
                    </div>
                    <div className='row' style={{display: elements.cb10x2 < 1 ? "none":"flex"}}>
                      <h4> 10 x 2 Cross Bars: </h4>
                      <p> {elements.cb10x2}</p>
                    </div>
                    <div className='row' style={{display: elements.cb7x4 < 1 ? "none":"flex"}}>
                      <h4> 7 x 4 Cross Bars: </h4>
                      <p> {elements.cb7x4}</p>
                    </div>
                    <div className='row' style={{display: elements.cb7x2 < 1 ? "none":"flex"}}>
                      <h4> 7 x 2 Cross Bars: </h4>
                      <p> {elements.cb7x2}</p>
                    </div>
                    <div className='row' style={{display: elements.cb5x4 < 1 ? "none":"flex"}}>
                      <h4> 5 x 4 Cross Bars: </h4>
                      <p> {elements.cb5x4}</p>
                    </div>
                    <div className='row' style={{display: elements.cb5x2 < 1 ? "none":"flex"}}>
                      <h4> 5 x 2 Cross Bars: </h4>
                      <p> {elements.cb5x2}</p>
                    </div>
                    <div className='row' style={{display: elements.cb4x4 < 1 ? "none":"flex"}}>
                      <h4> 4 x 4 Cross Bars: </h4>
                      <p> {elements.cb4x4}</p>
                    </div>
                    <div className='row' style={{display: elements.cb4x2 < 1 ? "none":"flex"}}>
                      <h4> 4 x 2 Cross Bars: </h4>
                      <p> {elements.cb4x2}</p>
                    </div>

                    <div style={{display: elements.auh + elements.abp + elements.suh + elements.sbp < 1 ? "none":"block"}}>
                        <h5> Screw Jacks </h5>
                    </div>

                    <div className='row' style={{display: elements.auh < 1 ? "none":"flex"}}>
                      <h4> S.J Aluminum U/Heads: </h4>
                      <p> {elements.auh}</p>
                    </div>
                    <div className='row' style={{display: elements.abp < 1 ? "none":"flex"}}>
                      <h4> S.J Aluminum B/Plates: </h4>
                      <p> {elements.abp}</p>
                    </div>
                    <div className='row' style={{display: elements.suh < 1 ? "none":"flex"}}>
                      <h4> S.J Steel U/Heads: </h4>
                      <p> {elements.suh}</p>
                    </div>
                    <div className='row' style={{display: elements.sbp < 1 ? "none":"flex"}}>
                      <h4>S.J Steel B/Plates: </h4>
                      <p> {elements.sbp}</p>
                    </div>

                    <div style={{display: elements.afc + elements.sfc + elements.bc < 1 ? "none":"block"}}>                        
                        <h5> Pins & Clips </h5>
                    </div>

                    <div className='row' style={{display: elements.afc < 1 ? "none":"flex"}}>
                      <h4>Alum.Frame Coup Pins: </h4>
                      <p> {elements.afc}</p>
                    </div>
                    <div className='row' style={{display: elements.sfc < 1 ? "none":"flex"}}>
                      <h4>Steel Frame Coup Pins: </h4>
                      <p> {elements.sfc}</p>
                    </div>
                    <div className='row' style={{display: elements.bc < 1 ? "none":"flex"}}>
                      <h4>Beam Clips: </h4>
                      <p> {elements.bc}</p>
                    </div>

                    <div style={{display: elements.ab20 + elements.ab18 + elements.ab16 + elements.ab14 + elements.ab13 + elements.ab12 + elements.ab11 + elements.ab106 + elements.ab10 + elements.ab9 + elements.ab8 + elements.ab7 + elements.ab6 + elements.ab5 + elements.ab4 < 1 ? "none":"block"}}>
                        <h5> Aluminum Beams </h5>
                    </div>

                    <div className='row' style={{display: elements.ab20 < 1 ? "none":"flex"}}>
                      <h4> 20' Alum.Beams: </h4>
                      <p> {elements.ab20}</p>
                    </div>
                    <div className='row' style={{display: elements.ab18 < 1 ? "none":"flex"}}>
                      <h4> 18' Alum.Beams: </h4>
                      <p> {elements.ab18}</p>
                    </div>
                    <div className='row' style={{display: elements.ab16 < 1 ? "none":"flex"}}>
                      <h4> 16' Alum.Beams: </h4>
                      <p> {elements.ab16}</p>
                    </div>
                    <div className='row' style={{display: elements.ab14 < 1 ? "none":"flex"}}>
                      <h4> 14' Alum.Beams: </h4>
                      <p> {elements.ab14}</p>
                    </div>
                    <div className='row' style={{display: elements.ab13 < 1 ? "none":"flex"}}>
                      <h4> 13' Alum.Beams: </h4>
                      <p> {elements.ab13}</p>
                    </div>
                    <div className='row' style={{display: elements.ab12 < 1 ? "none":"flex"}}>
                      <h4> 12' Alum.Beams: </h4>
                      <p> {elements.ab12}</p>
                    </div>
                    <div className='row' style={{display: elements.ab11 < 1 ? "none":"flex"}}>
                      <h4> 11' Alum.Beams: </h4>
                      <p> {elements.ab11}</p>
                    </div>
                    <div className='row' style={{display: elements.ab106 < 1 ? "none":"flex"}}>
                      <h4> 10'6" Alum.Beams: </h4>
                      <p> {elements.ab106}</p>
                    </div>
                    <div className='row' style={{display: elements.ab10 < 1 ? "none":"flex"}}>
                      <h4> 10' Alum.Beams: </h4>
                      <p> {elements.ab10}</p>
                    </div>
                    <div className='row' style={{display: elements.ab9 < 1 ? "none":"flex"}}>
                      <h4> 9' Alum.Beams: </h4>
                      <p> {elements.ab9}</p>
                    </div>
                    <div className='row' style={{display: elements.ab8 < 1 ? "none":"flex"}}>
                      <h4> 8' Alum.Beams: </h4>
                      <p> {elements.ab8}</p>
                    </div>
                    <div className='row' style={{display: elements.ab7 < 1 ? "none":"flex"}}>
                      <h4> 7' Alum.Beams: </h4>
                      <p> {elements.ab7}</p>
                    </div>
                    <div className='row' style={{display: elements.ab6 < 1 ? "none":"flex"}}>
                      <h4> 6' Alum.Beams: </h4>
                      <p> {elements.ab6}</p>
                    </div>
                    <div className='row' style={{display: elements.ab5 < 1 ? "none":"flex"}}>
                      <h4> 5' Alum.Beams: </h4>
                      <p> {elements.ab5}</p>
                    </div>
                    <div className='row' style={{display: elements.ab4 < 1 ? "none":"flex"}}>
                      <h4> 4' Alum.Beams: </h4>
                      <p> {elements.ab4}</p>
                    </div>

                    <div style={{display: elements.sh1 + elements.sh2 + elements.sh3 + elements.sh4 < 1 ? "none":"block"}}>
                        <h5> Post Shores </h5>
                    </div>

                    <div className='row' style={{display: elements.sh1 < 1 ? "none":"flex"}}>
                      <h4> Post Shores No.1: </h4>
                      <p> {elements.sh1}</p>
                    </div>
                    <div className='row' style={{display: elements.sh2 < 1 ? "none":"flex"}}>
                      <h4> Post Shores No.2: </h4>
                      <p> {elements.sh2}</p>
                    </div>
                    <div className='row' style={{display: elements.sh3 < 1 ? "none":"flex"}}>
                      <h4> Post Shores No.3: </h4>
                      <p> {elements.sh3}</p>
                    </div>
                    <div className='row' style={{display: elements.sh4 < 1 ? "none":"flex"}}>
                      <h4> Post Shores No.4: </h4>
                      <p> {elements.sh4}</p>
                    </div>

                    <div style={{display: elements.wb12 + elements.wb11 + elements.wb10 + elements.wb9 +elements.wb8 +elements.wb7 +elements.wb6 +elements.wb5 +elements.wb5 < 1 ? "none":"block"}}>
                        <h5> Wood Beams </h5>
                    </div>

                    <div className='row' style={{display: elements.wb12 < 1 ? "none":"flex"}}>
                      <h4> 12" 4x6 Wood Beams: </h4>
                      <p> {elements.wb12}</p>
                    </div>
                    <div className='row' style={{display: elements.wb11 < 1 ? "none":"flex"}}>
                      <h4> 11" 4x6 Wood Beams: </h4>
                      <p> {elements.wb11}</p>
                    </div>
                    <div className='row' style={{display: elements.wb10 < 1 ? "none":"flex"}}>
                      <h4> 10" 4x6 Wood Beams: </h4>
                      <p> {elements.wb10}</p>
                    </div>
                    <div className='row' style={{display: elements.wb9 < 1 ? "none":"flex"}}>
                      <h4> 9" 4x6 Wood Beams: </h4>
                      <p> {elements.wb9}</p>
                    </div>
                    <div className='row' style={{display: elements.wb8 < 1 ? "none":"flex"}}>
                      <h4> 8" 4x6 Wood Beams: </h4>
                      <p> {elements.wb8}</p>
                    </div>
                    <div className='row' style={{display: elements.wb7 < 1 ? "none":"flex"}}>
                      <h4> 7" 4x6 Wood Beams: </h4>
                      <p> {elements.wb7}</p>
                    </div>
                    <div className='row' style={{display: elements.wb6 < 1 ? "none":"flex"}}>
                      <h4> 6" 4x6 Wood Beams: </h4>
                      <p> {elements.wb6}</p>
                    </div>
                    <div className='row' style={{display: elements.wb5 < 1 ? "none":"flex"}}>
                      <h4> 5" 4x6 Wood Beams: </h4>
                      <p> {elements.wb5}</p>
                    </div>
                    <div className='row' style={{display: elements.wb4 < 1 ? "none":"flex"}}>
                      <h4> 4" 4x6 Wood Beams: </h4>
                      <p> {elements.wb4}</p>
                    </div>
                   <button onClick={()=>showConfirmation()} className='btnCompleted' style={{display: elements.done == 0 ? "block":"none"}}> Mark as Completed </button> 
                    <div className='sign-pad' style={{display: elements.done == 1 && elements.signature == ''? "block":"none"}}>
                        <div className='pad'>
                        <SignatureCanvas 
                            penColor="white" 
                            canvasProps={{width: 340, height: 250, className: 'sigCanvas'}} 
                            ref={c=>setSignTenant1(c)}
                        ></SignatureCanvas>
                        </div>
                        <div className='actions'>
                            <button id="save"   onClick={()=>storeSign(1)}> Save </button>
                            <button id="cancel" onClick={()=>clearSign(1)}> Clear </button>
                        </div>
                    </div>

                </div>
               
               
        ))}     
        </div>
    </div>
  )
}

export default Order
