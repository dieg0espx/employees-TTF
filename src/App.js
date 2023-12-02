import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useActionData } from "react-router-dom";
import ProtectedRoutes from './ProtectedRoutes';
import TrucksPage from './pages/TrucksPage';
import Sample from './pages/Sample';
import Order from './pages/Order';
import OrdersPage from './pages/OrdersPage';


function App() {

  return (
    <div>
      <div className="App">
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path='/' element={<OrdersPage />} />
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/order' element={<Order />} />
            {/* <Route path='/trucks' element={<TrucksPage />} /> */}
            {/* <Route path='/sample' element={<Sample />} /> */}
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;


