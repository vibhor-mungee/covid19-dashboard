import React from 'react';
// import { Card } from 'antd';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        minWidth: 70,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function CardLayout({title,dataReport}) {
    const colorStyle=()=>{
        if(title==='CASES'){
            return(
                <div style={{color:'red'}}>
                    {dataReport}
                </div>
            )
        } 
        if(title==='DEATHS'){
            return(
                <div style={{color:'darkred'}}>
                    {dataReport}
                </div>
            )
        }
        if(title==='RECOVERED'){
            return(
                <div style={{color:'green'}}>
                    {dataReport}
                </div>
            )
        }
    }
    const classes = useStyles();
    return (
        <Grid  item xs={4}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {title}
                    </Typography>
                    {colorStyle()}
                </CardContent>
            </Card>
        </Grid>
    );
}

export default CardLayout;