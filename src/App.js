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
      <div style={
        {color:'black',
        maxWidth:'auto',
        maxHeight:'1px',
        textAlign:'center',
        position:'fixed',
        top: 0,
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        zIndex:9
  }}>Powered By 6DegreesIT. All rights reserved</div>
    </div>
  );
}

export default App;
