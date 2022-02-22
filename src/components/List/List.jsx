import { Grid, Typography, CircularProgress } from "@mui/material";
import React,{useState, useEffect, createRef} from "react";
import { Box } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useFormState from '../../hooks/useFormState'
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({ isLoading, places, placeClicked, type, setType, rating, handleRating })=>{

    const [elRefs, setElRefs] = useState([])
    
    useEffect(()=>{
        setElRefs(refs => Array(places.length).fill().map((_,i) => (
            refs[i] || createRef()
       )))

    }, [places])
    return (
            <Box
                sx={{
                    pt:4,
                    pl:1
                }}
            >
                <Typography variant="h4">
                    Restaurants, Hotels & Attractions around you
                </Typography>

                {isLoading
                ? <Box display='flex' sx={{height:'20rem'}} justifyContent='center' alignItems='center'>
                    <CircularProgress />
                  </Box>
                : 
                  <>
                    <Box pb={2} display='flex' alignItems='flex-end'>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                            <InputLabel >Type</InputLabel>
                            <Select
                            value={type}
                            onChange={setType}
                            label="Type"
                            >
                            <MenuItem value='restaurants'>Restaurants</MenuItem>
                            <MenuItem value='hotels'>Hotels</MenuItem>
                            <MenuItem value='attractions'>Attractions</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel >Rating</InputLabel>
                            <Select
                            value={rating}
                            onChange={handleRating}
                            label="Rating"
                            >
                            <MenuItem value={0}>All</MenuItem>
                            <MenuItem value={3}>Above 3.0</MenuItem>
                            <MenuItem value={4}>Above 4.0</MenuItem>
                            <MenuItem value={4.5}>Above 4.5</MenuItem>
                            </Select>
                        </FormControl>

                        <Typography variant="body1" component='div' pb={1} pl={2}>
                            {`found (${places?.length})`}
                        </Typography>
                    </Box>

                    <Grid container spacing={2} sx={{height:'42rem', overflow:'auto'}}>
                        {places?.map((place, i) => {
                            return(
                                <Grid ref={elRefs[i]} item key={place.location_id} xs={12}>
                                    <PlaceDetails 
                                        place={place}
                                        refProp={elRefs[i]}
                                        selected={placeClicked === place.location_id}
                                    />
                                </Grid>
                            )
                        }
                        )}
                    </Grid>
                  </>
                }
                
            </Box>
    )
}

export default List