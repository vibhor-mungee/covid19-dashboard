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
      <Dashboard />
      <Map/>
      <div className="powered">Powered By 6DegreesIT. All rights reserved</div>
    </div>
  );
}

export default App;
