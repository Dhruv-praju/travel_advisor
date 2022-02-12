import React, {useState, useEffect} from "react";
import { CssBaseline, Grid} from "@mui/material";

import Header from "./components/Header/Header";
import List from './components/List/List'
import Map from './components/Map/Map'
import PlaceDetails from './components/PlaceDetails/PlaceDetails'
import getPlacesData from "./api";
import useToggle from "./hooks/useToggle";
import useFormState from './hooks/useFormState'

let count =0

const App = ()=>{
    const getCurrentCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude });
            toggleGotCords();
          }
        );
      };

    const [places, setPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState(null)
    const [gotCords, toggleGotCords] = useToggle(false);
    const [placeClicked, setPlaceClicked] = useState(null);
    const [type, setType] = useFormState('restaurants')
    const [isLoading, toggleIsLoading] = useState(false)
    
    useEffect(()=>{
        // get all places
        toggleIsLoading(true)

        const timer = setTimeout(()=>{
            console.log(count, bounds);
            if(bounds && bounds.ne && count<3){
                getPlacesData(type, bounds.sw, bounds.ne)
                     .then(data => {
                         console.log(data); 
                         setPlaces(data)
                         toggleIsLoading(false)
                         count+=1  
                     }) 
            }
            else alert('You have reached the limit !')
        }, 500)

        return () => clearTimeout(timer)
               
    },[type, coordinates, bounds])

    useEffect(getCurrentCoordinates, [])
    return (
        <div>
            <CssBaseline />
            <Header />
            <Grid container spacing={1}>
                <Grid item xs={12} md={5} lg={4}>
                    <List
                        isLoading={isLoading}
                        places={places}
                        placeClicked={placeClicked}
                        type={type}
                        setType={setType}
                    />
                </Grid>
                <Grid item xs={12} md={7} lg={8}>
                    <Map 
                        coordinates={coordinates}
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        gotCords={gotCords}
                        places={places}
                        setPlaceClicked={setPlaceClicked}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default App