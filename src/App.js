import React, {useState, useEffect} from "react";
import { CssBaseline, Grid } from "@mui/material";

import Header from "./components/Header/Header";
import List from './components/List/List'
import Map from './components/Map/Map'
import PlaceDetails from './components/PlaceDetails/PlaceDetails'
import getPlacesData from "./api";

let count =0

const App = ()=>{
    const getCurrentCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
            toggleGotCords(true);
          }
        );
        console.log('GOT LIVE COORDS');
      };

    const [places, setPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState(null)
    const [gotCords, toggleGotCords] = useState(false);
    
    useEffect(()=>{
        // get all restaurants
        console.log('CALLING');
        const timer = setTimeout(()=>{
            console.log(count, bounds);
            if(bounds && bounds.ne && count<3){
                getPlacesData(bounds.sw, bounds.ne)
                     .then(data => {
                         console.log(data); 
                         setPlaces(data)  
                         count+=1  
                     }) 
            }
        }, 500)

        return () => clearTimeout(timer)
               
    },[coordinates, bounds])

    useEffect(getCurrentCoordinates, [])
    console.log('RENDERING APP');
    return (
        <div>
            <CssBaseline />
            <Header />
            <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                    <List 
                        places={places}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                        coordinates={coordinates}
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        gotCords={gotCords}
                        places={places}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default App