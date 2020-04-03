import React, { useState } from 'react'
import { useLazyQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import GoogleMapReact from 'google-map-react';
import request from 'request';
import Popover from '@material-ui/core/Popover';
import Country from './selectedcountry';
import location_mark from '../image/virus.svg';
import Skeleton from '@material-ui/lab/Skeleton';

function Index() {
  const [countryName, countryNameByLatLng] = useState('India');
  const [openPopup, setOpenPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
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
  const [reportByCountry, { data }] = useLazyQuery(COVID_19_DATA, { variables: { country: countryName } });
  // useEffect(()=>{
  //   if(countryName &&openPopup && data){
  //     console.log('inside useeffect>>',countryName);

  //     countryNameByLatLng(null)
  //   }
  // },[countryName,openPopup,data])
  const getCountryNameByLatLng = async (lat, lng) => {
    // countryNameByLatLng(null)
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
  }
  const hndlOpenPopover = (e) => {
    setAnchorEl(anchorEl ? null : e.currentTarget)
    reportByCountry();
    setOpenPopup(true);
  }
  const hndlClosePopover = () => {
    setOpenPopup(false);
  }
  const AnyReactComponent = () => <div className="pop_div" onMouseEnter={hndlOpenPopover}>
    <div className="map-pin" ><img width={35} src={location_mark} alt="mark" /></div>
    <Popover
      className="pop-up"
      open={openPopup}
      onClose={hndlClosePopover}
      // anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <div>
        <div className="pop-header">
          <h6 className="country">
            <span>{data && data.ReportByCountry ? data.ReportByCountry.country[0] : <Skeleton animation="wave" width={80} />}</span>
          </h6>
          {data && data.ReportByCountry ? <img width={25} src={data.ReportByCountry.flag} alt={data.ReportByCountry.country[0]} /> : <Skeleton variant="circle" width={45} height={45} />}
        </div>
        <div className="pop-data">
          <h6 className="confirmed">Confirmed:<span>{data && data.ReportByCountry ? data.ReportByCountry.cases : <Skeleton animation="wave" width={80} />}</span></h6>
          <h6 className="recovered">Recovered: <span>{data && data.ReportByCountry ? data.ReportByCountry.recovered : <Skeleton animation="wave" width={80} />}</span></h6>
          <h6 className="deaths">Deaths: <span>{data && data.ReportByCountry ? data.ReportByCountry.deaths : <Skeleton animation="wave" width={80} />}</span></h6>
        </div>
      </div>
    </Popover>
  </div>;
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDL9qOq_Qr4kFCE651q5v5UfYGDmEEX5Oo' }}
        defaultCenter={{ lat: 20, lng: 77 }}
        defaultZoom={5}
        hoverDistance={60}
        // onChildClick={(key,{lat,lng})=>getCountryNameByLatLng(lat,lng)}
        onChildMouseEnter={(key, { lat, lng }) => getCountryNameByLatLng(lat, lng)}
        onChildMouseLeave={() => {
          countryNameByLatLng(null)
          setOpenPopup(false)
        }}
      >
        {Country.map((countryData) => (
          <AnyReactComponent
            key={countryData.id}
            lat={countryData.latlng[0]}
            lng={countryData.latlng[1]}
            countryName={countryData.name}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default Index
