import React, {useState, useEffect} from "react";
import { CssBaseline, Grid } from "@mui/material";

import Header from "./components/Header/Header";
import List from './components/List/List'
import Map from './components/Map/Map'
import PlaceDetails from './components/PlaceDetails/PlaceDetails'
import getPlacesData from "./api";

let count =0

const App = ()=>{
    const [places, setPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState(null)
    
    // run this only after first render
    useEffect(()=>{
        // initailize to current coordinates using builtin browser navigotor api
        console.log('rendered only once');
        navigator.geolocation.getCurrentPosition( ( {coords: {latitude, longitude}} ) =>{
            setCoordinates({lat:latitude, lng:longitude})
        } ) 
    }, [])
    // run this when map co-ordinates & bounds changes
    useEffect(()=>{
        // get all restaurants
        const timer = setTimeout(()=>{
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
                        places={places}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default App