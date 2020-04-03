import React from 'react';
import Dashboard from './Dashboard/index';
import Map from './Map';
import './App.css';

function App() {
  // const date = new Date();
  // const dateFormate= `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()-1}`
  // const[latLong,setLatLng]=useState([{lat:'20',lng:'77'}]);
  return (
    <div style={{ margin: '0px auto' }}>
      <a href="https://www.6degreesit.com" target="_blank">
        <img
          src="https://www.6degreesit.com/wp-content/themes/6degree/images/logo-blk.png"
          alt=""
          style={{ position: 'fixed', zIndex: 1, background: "#0002", padding: 10 }}
        />
      </a>
      <Dashboard />
      <Map />
      <div className="powered">Powered By <a href="https://www.6degreesit.com" target="_blank">6DegreesIT</a>. All rights reserved</div>
    </div>
  );
}

export default App;
