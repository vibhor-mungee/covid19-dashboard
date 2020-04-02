import React,{ useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import GoogleMapReact from 'google-map-react';
import request from 'request';
import Popover from '@material-ui/core/Popover';
import Country from './selectedcountry';
import location_mark from '../image/iconfinder_gpsmapicons01_68004.png';

function Index() {
    const[countryName,countryNameByLatLng]= useState('India');
  const [openPopup,setOpenPopup]= useState(false);
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
  const [reportByCountry, { data }] = useLazyQuery(COVID_19_DATA,{ variables: { country: countryName } });
  
  const getCountryNameByLatLng= async(lat,lng)=>{
    countryNameByLatLng(null)
    const latLongArray=[];
    await latLongArray.push({lat,lng})
    // setLatLng(latLongArray);
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
        countryNameByLatLng(getNameArray[getNameArray.length - 1].trim());
      }
    }
    );
  }
  const hndlOpenPopover=()=>{
    reportByCountry();
    setOpenPopup(true);
  }
  const hndlClosePopover=()=>{
    setOpenPopup(false);
  }
  const AnyReactComponent = () => <div>
  <img width={35} src={location_mark} alt="mark" id="UncontrolledPopover" onClick={hndlOpenPopover}/>
  {data && data.ReportByCountry &&
    <Popover
      open={openPopup}
      onClose={hndlClosePopover}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
>
    <div>
        <h6>Confirmed: {data.ReportByCountry.cases}</h6>
        <h6>Deaths: {data.ReportByCountry.deaths}</h6>
      </div>
</Popover>
}
  </div>;
    return (
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDL9qOq_Qr4kFCE651q5v5UfYGDmEEX5Oo' }}
            defaultCenter={{lat: 20, lng: 77}}
            defaultZoom={5}
            hoverDistance={40 / 2}
            onChildClick={(key,{lat,lng})=>getCountryNameByLatLng(lat,lng)}
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
    )
}

export default Index
