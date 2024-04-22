import React, {useEffect, useState} from 'react'
import HeadNav from '../components/HeadNav'
import Navbar from '../components/Navbar'


function OrdersPage() {
    const [todayOrders, setTodayOrders] = useState([]);
    const [upcomingOrders, setUpcomingOrders] = useState([])
    const [pastOrders, setPastOrders] = useState([]);
    const [isEditing, setIsEditing]= useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [group, setGroup] = useState(1)
    const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

    useEffect(() => {
        const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
        if (themeColorMetaTag) {
          themeColorMetaTag.setAttribute('content', '#202124');
        } else {
          const newMetaTag = document.createElement('meta');
          newMetaTag.name = 'theme-color';
          newMetaTag.content = '#202124';
          document.head.appendChild(newMetaTag);
        }
      }, []);
    function isSameDate(date1, date2) {
        return (
          date1.getDate() === date2.getDate() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getFullYear() === date2.getFullYear()
        );
    }
    useEffect(() => {
        getOrders();
        if(window.innerWidth < 600){
          setIsMobile(true)
        } else {
          setIsMobile(false)
        }
        const storedGroup = localStorage.getItem('ordersGroup');
        if (storedGroup) {
          setGroup(storedGroup);
        } else {
          setGroup(1)
        }
    }, []);
    function getOrders(){
      fetch(apiURL + '/getOrders.php')
        .then(response => response.json())
        .then(response => {
          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          tomorrow.setHours(0, 0, 0, 0); // Set to the beginning of tomorrow
          const pastLimit = new Date();
          pastLimit.setDate(pastLimit.getDate() - 30); 
    
          const todayOrders = response.filter(order => isSameDate(new Date(order.date), today));
          const upcomingOrders = response.filter(order => new Date(order.date) >= tomorrow);
          const pastOrders = response.filter(order => new Date(order.date) < today && new Date(order.date) >= pastLimit && !isSameDate(new Date(order.date), today));
    
          const sortedUpcomingOrders = upcomingOrders.sort((a, b) => new Date(a.date) - new Date(b.date));
          const sortedPastOrders = pastOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
          setTodayOrders(todayOrders);
          setUpcomingOrders(sortedUpcomingOrders);
          setPastOrders(sortedPastOrders);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    function getMonthName(monthNumber) {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
    
        if (monthNumber >= 1 && monthNumber <= 12) {
            return months[monthNumber - 1];
        } else {
            // Handle invalid month numbers
            return "Invalid Month";
        }
    }

    
    function changeGroup(page){
      localStorage.setItem('ordersGroup', page)
      setGroup(page)
    }

  return (
    <div className='wrapper'>
        <HeadNav title="Orders"/>
        <Navbar page="orders" />
        <div className='content'>
            <div className='selector3'>
                <p className={group==1? "selected":""} id="left" onClick={()=>changeGroup(1)}> For Today </p>
                <p className={group==2? "selected":""} id="center" onClick={()=>changeGroup(2)}> Upcoming </p>
                <p className={group==3? "selected":""} id="right" onClick={()=>changeGroup(3)}> Past </p>
            </div>
            <div className='orders'>

                <div style={{display: group == 1 ? "block":"none"}}>
                  <p className="notice" style={{display: todayOrders.length < 1? "block":"none"}}> No orders for today</p>
                  <h2 className="timingIndicator" style={{display: todayOrders.length > 0? "block":"none"}}> Today's Orders</h2>
                  {todayOrders.map((order) => (   
                    <div className='full-order'>
                      <div className="order" key={order.id} onClick={()=>window.location.href= '#/order?id=' + order.id}>
                          <div id='done'>
                            {order.done == 1? <i className="bi bi-check2-circle doneIcon"></i>:""}
                          </div>
                          <div id='left'>
                              <p> <b>{order.company}</b> </p>
                              <p> {order.jobsite} </p>
                          </div>
                          <div id="right" style={{display: isMobile && isEditing ? "none":"block"}}>
                            <p className='includeDrawings' style={{display: order.drawings == 'true' && !isMobile? "block":"none"}}>Include Drawings</p>
                            <p className='date-day'> {order.date.split('-')[2]-1}</p>
                            <p className='date-month'> {getMonthName(order.date.split('-')[1])}</p>
                            <p className='date-year'> {order.date.split('-')[0]}</p>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{display: group == 2 ? "block":"none"}}>
                <p className="notice" style={{display: upcomingOrders.length < 1? "block":"none"}}> No upcoming orders</p>
                <h2 className="timingIndicator" style={{display: upcomingOrders.length > 0? "block":"none"}}> Upcoming Orders </h2>
                  {upcomingOrders.map((order) => (   
                    <div className='full-order'>
                      <div className="order" key={order.id} onClick={()=>window.location.href= '#/order?id=' + order.id}>
                          <div id='done'>
                            {order.done == 1? <i className="bi bi-check2-circle doneIcon"></i>:""}
                          </div>
                          <div id='left'>
                              <p> <b>{order.company}</b> </p>
                              <p> {order.jobsite} </p>
                          </div>
                          <div id="right" style={{display: isMobile && isEditing ? "none":"block"}}>
                            <p className='includeDrawings' style={{display: order.drawings == 'true' && !isMobile? "block":"none"}}>Include Drawings</p>
                            <p className='date-day'> {order.date.split('-')[2]-1}</p>
                            <p className='date-month'> {getMonthName(order.date.split('-')[1])}</p>
                            <p className='date-year'> {order.date.split('-')[0]}</p>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{display: group == 3 ? "block":"none"}}>
                  <p className="notice" style={{display: pastOrders.length < 1? "block":"none"}}> No past orders </p>    
                  <h2 className="timingIndicator" style={{display: pastOrders.length > 0? "block":"none"}}> Past Orders </h2>
                  {pastOrders.map((order) => (   
                    <div className='full-order'>
                      <div className="order" key={order.id} onClick={()=>window.location.href= '#/order?id=' + order.id}>
                          <div id='done'>
                            {order.done == 1? <i className="bi bi-check2-circle doneIcon"></i>:""}
                          </div>
                          <div id='left'>
                              <p> <b>{order.company}</b> </p>
                              <p> {order.jobsite} </p>
                          </div>
                          <div id="right" style={{display: isMobile && isEditing ? "none":"block"}}>
                          <p className='includeDrawings' style={{display: order.drawings == 'true' && !isMobile? "block":"none"}}>Include Drawings</p>
                          <p className='date-day'> {order.date.split('-')[2]-1}</p>
                          <p className='date-month'> {getMonthName(order.date.split('-')[1])}</p>
                          <p className='date-year'> {order.date.split('-')[0]}</p>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrdersPage
