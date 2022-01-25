import { Grid, Typography } from "@mui/material";
import React from "react";
import { Box } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useFormState from '../../hooks/useFormState'
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({ places })=>{
    const [type, handleType] = useFormState('restaurants')

    const [rating, handleRating] = useFormState()
    return (
        <div>
            <Box
                sx={{
                    pt:4,
                    pl:1
                }}
            >
                <Typography variant="h4">
                    Restautants, Hotels & Attractions around you
                </Typography>
                
                <Box pb={2}>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
                        <InputLabel >Type</InputLabel>
                        <Select
                        value={type}
                        onChange={handleType}
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
                </Box>

                <Grid container spacing={2} sx={{height:'48rem', overflow:'auto'}}>
                    {places?.map((place, i) => (
                        
                        place.name 
                        ?
                            <Grid key={i} item xs={12}>
                                <PlaceDetails place={place}/>
                            </Grid>

                        : ''
                    )
                    )}
                </Grid>
            </Box>
        </div>
    )
}

export default List