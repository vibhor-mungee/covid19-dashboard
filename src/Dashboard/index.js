import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import Grid from '@material-ui/core/Grid';
import CardLayout from '../Card';

const Index = () => {
    const REPORT_QUERY = gql`
        {
            reports{
            cases
            deaths
            recovered
            }
        }`
  const {data} = useQuery(REPORT_QUERY);
    // console.log('data>>',data);
    
  if(data){
    delete data.reports.__typename;
  }
    return (
        <div className="dashboard-card">
            <Grid container spacing={1} style={{textAlign:'center'}}>
    {data&&data.reports &&Object.keys(data.reports).map(name=>
        <CardLayout key={name} title={name.toLocaleUpperCase()} dataReport={data.reports[name]}/>
    )}
    </Grid>
    </div>
    )
}

export default Index