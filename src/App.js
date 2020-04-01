import React,{useState} from 'react';
import { useLazyQuery,useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import GoogleMapReact from 'google-map-react';
import request from 'request';
import { UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
import './App.css';
import Country from './selectedcountry';

import location_mark from './image/iconfinder_gpsmapicons01_68004.png';

function App() {
  // const date = new Date();
  // const dateFormate= `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()-1}`
  // const[latLong,setLatLng]=useState([{lat:'20',lng:'77'}]);
  const[countryName,countryNameByLatLng]=useState('India');
  const[countryKey,setCountryKey]= useState(null);

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
  const data = useQuery(COVID_19_DATA,{ variables: { country: countryName } });
  // console.log(data)
  console.log('countryName>>',countryName)
  const getCountryNameByLatLng= async(key,lat,lng)=>{
    setCountryKey(key)
    const latLongArray=[];
    await latLongArray.push({lat,lng})
    // setLatLng(latLongArray);
    await request({
          url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDL9qOq_Qr4kFCE651q5v5UfYGDmEEX5Oo`,
          method: 'get',
      }, async(e, r, body) => {
          if (!body) {
              return false;
          }
          const solve = JSON.parse(body);
          if(solve && solve.results.length>0){
          const getNameArray= solve.results[0].formatted_address.split(',');
          await countryNameByLatLng(getNameArray[getNameArray.length -1].trim());
          }
      }
      );
      // reportByCountry();
  }
  const AnyReactComponent = () =>
    <div id="UncontrolledPopover">
      <img width={35} src={location_mark} alt="mark"/>
      {data && data.data &&data.data.ReportByCountry &&
        <UncontrolledPopover placement="bottom" target="UncontrolledPopover">
        <PopoverHeader>COVID19</PopoverHeader>
        <PopoverBody>
          <div>
            <h6>Confirmed: {data.data.ReportByCountry.cases}</h6>
            <h6>Deaths: {data.data.ReportByCountry.deaths}</h6>
          </div>
        </PopoverBody>
      </UncontrolledPopover>
      }
      </div>;
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDL9qOq_Qr4kFCE651q5v5UfYGDmEEX5Oo' }}
          defaultCenter={{lat: 20, lng: 77}}
          defaultZoom={5}
          hoverDistance={40 / 2}
          onChildClick={(key,{lat,lng})=>getCountryNameByLatLng(key,lat,lng)}
          // onClick={({lat,lng})=>getCountryNameByLatLng(lat,lng)}
        >
          {Country.map((countryData)=>(
            <AnyReactComponent
            key={countryData.id}
            lat={countryData.latlng[0]}
            lng={countryData.latlng[1]}
          />
          ))}
        </GoogleMapReact>
    </div>
  );
}

export default App;
