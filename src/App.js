import React, {useState, useEffect} from "react";
import { CssBaseline, Grid } from "@mui/material";

import Header from "./components/Header/Header";
import List from './components/List/List'
import Map from './components/Map/Map'
import PlaceDetails from './components/PlaceDetails/PlaceDetails'
import getPlacesData from "./api";

const App = ()=>{
    const [places, setPlaces] = useState([])

    useEffect(()=>{
        // get all restaurants
        getPlacesData()
            .then(data =>{
                console.log(data);
                setPlaces(data)
            })
    },[])

    return (
        <div>
            <CssBaseline />
            <Header />
            <Grid container spacing={1}>
                <Grid item xs={12} md={4}>
                    <List />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map />
                </Grid>
            </Grid>
        </div>
    )
}

export default App