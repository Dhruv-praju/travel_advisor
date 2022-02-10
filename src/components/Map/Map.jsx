import { Box } from "@mui/system";
import React, {useState, useEffect, useRef, createRef} from "react";
import ReactMapGl, { Marker, WebMercatorViewport } from 'react-map-gl'
import useToggle from "../../hooks/useToggle";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { IconButton } from "@mui/material";
// latitude: 37.7577,
//    longitude: 122.437
const Map = ( {coordinates, setCoordinates, setBounds, setPlaceClicked, places, gotCords} )=>{

  const initializeMap = () => {
    setViewPort((prevViewport) => ({
      ...prevViewport,
      latitude: coordinates.lat,
      longitude: coordinates.lng
    }));

    setViewPort((prevViewport) => {
      console.log(prevViewport);
      let b = getBoundaryCords(prevViewport);
      setBounds(b);
      return {
        ...prevViewport,
        bounds: b
      };
    });
    
    toggleInitialized()
  };

  const getBoundaryCords = (vp) => {
    // returns sowthwest and northwest cordinates of map region
    const bounds = {
      ne:{ },
      sw:{ }
    }
    const boundaries = new WebMercatorViewport(vp).getBounds()
    console.log();
    [bounds.ne.lng , bounds.ne.lat] = boundaries[1]
    console.log();
    [bounds.sw.lng , bounds.sw.lat] = boundaries[0]

    return bounds
  }

  const [viewport, setViewPort] = useState({
      width: 800,
      height: 800,
      zoom: 10,
    }
  )
  const [initialized, toggleInitialized] = useToggle(false)
  // current map window with co-ordinates is viewport. 
  // As user drags of scrolls view Port that contaings current co-ordinates changes and 'onViewportChange' is executed
    useEffect(initializeMap, [gotCords]);
    return (
            <Box sx={{
              width:'100%',
              height:850,
              p:1.5,
              
            }}>
                <ReactMapGl
                  {...viewport}
                  
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}

                  onViewportChange={nextViewport =>{
                    // get the boundaries of the map displayed (i.e lat and long of corners of visible region of the map)
                    const nextBounds = getBoundaryCords(nextViewport)
                    // change the viewWindow data
                    if(initialized) setViewPort({...nextViewport, bounds:nextBounds})
                    else setViewPort({...nextViewport, width:'100%', height:'100%', bounds:nextBounds})
                    // change the co-ordinates and boundaries
                    setCoordinates({
                      lat:nextViewport.latitude,
                      lng: nextViewport.longitude
                    })
                    setBounds({...nextBounds})
                  } }

                  mapStyle='mapbox://styles/4everyhappy/ckylosdfn3lkx14l2dhot0rut'
                >
                  {places?.map(place => {

                    const locIconRef = createRef()

                    return (
                    <Marker 
                      key={place.location_id} 
                      latitude={Number(place.latitude)} 
                      longitude={Number(place.longitude)}
                    >
                      <IconButton 
                        ref={locIconRef}
                        onClick={e => setPlaceClicked(place.location_id)} 
                        // onMouseEnter={e => locIconRef.current.style.color='red'}
                        // onMouseLeave={e => locIconRef.current.style.color='black'}
                        sx={theme => ({
                          'color': theme.palette.grey[900],
                          '&:hover':{color: theme.palette.error.main}
                        })}
                        size='small'
                        // color="primary"
                      >
                        <LocationOnIcon
                          // color="black"
                          fontSize="large" 
                        />
                      </IconButton>
                    </Marker>
                  )})
                  }

                </ReactMapGl>
                
            </Box>
    )
}

export default Map