import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import GoogleMapReact from 'google-map-react';
import request from 'request';
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import Dashboard from './Dashboard';
import './App.css';

import location_mark from './image/iconfinder_gpsmapicons01_68004.png';

function App() {
  // const date = new Date();
  // const dateFormate= `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()-1}`
  const [latLong, setLatLng] = useState([{ lat: '20', lng: '77' }]);
  const [countryName, countryNameByLatLng] = useState('India');

  const COVID_19_DATA = gql`
  query($country:String!){
    ReportByCountry(country:$country) {
      id
      country
      flag
      cases
      deaths
      recovered
      active_cases{
        currently_infected_patients
        inMidCondition
        criticalStates
      }
      closed_cases {
        recovered
        deaths
        cases_which_had_an_outcome
      }
    }
  }`
  const [reportByCountry, { called, loading, data }] = useLazyQuery(COVID_19_DATA, { variables: { country: countryName } });
  const getCountryNameByLatLng = async (lat, lng) => {
    const latLongArray = [];
    await latLongArray.push({ lat, lng })
    setLatLng(latLongArray);
    await request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDL9qOq_Qr4kFCE651q5v5UfYGDmEEX5Oo`,
      method: 'get',
    }, async (e, r, body) => {
      if (!body) {
        return false;
      }
      const solve = JSON.parse(body);
      if (solve && solve.results.length > 0) {
        const getNameArray = solve.results[0].formatted_address.split(',');
        await countryNameByLatLng(getNameArray[getNameArray.length - 1].trim());
      }
    }
    );
    reportByCountry();
  }
  const AnyReactComponent = () => <div>
    <img width={35} src={location_mark} alt="mark" id="UncontrolledPopover" />
    {console.log(called, loading, 'data>>', data)}
    {called && data && data.ReportByCountry && data.ReportByCountry.country[0] === countryName &&
      <UncontrolledPopover placement="bottom" target="UncontrolledPopover">
        <PopoverHeader>COVID19</PopoverHeader>
        <PopoverBody>
          <div>
            <h6>Confirmed: {data.ReportByCountry.active_cases[0].currently_infected_patients}</h6>
            <h6>Deaths: {data.ReportByCountry.closed_cases[0].deaths}</h6>
          </div>
        </PopoverBody>
      </UncontrolledPopover>
    }
  </div>;
  return (
    <div style={{ margin: '0px auto' }}>
      <Dashboard />
      <div style={{ height: '100vh', width: '70%', float: 'right' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDL9qOq_Qr4kFCE651q5v5UfYGDmEEX5Oo' }}
          defaultCenter={{ lat: 20, lng: 77 }}
          defaultZoom={2}
          onClick={({ lat, lng }) => getCountryNameByLatLng(lat, lng)}
        >
          <AnyReactComponent
            lat={latLong && latLong.length > 0 && latLong[0].lat}
            lng={latLong && latLong.length > 0 && latLong[0].lng}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default App;
