import { Box } from "@mui/system";
import React, {useState, useEffect} from "react";
import ReactMapGl, { Marker, WebMercatorViewport } from 'react-map-gl'
import useToggle from "../../hooks/useToggle";
import LocationOnIcon from '@mui/icons-material/LocationOn';
// latitude: 37.7577,
//    longitude: 122.437
const Map = ( {coordinates, setCoordinates, setBounds, places, gotCords} )=>{

  const initializeMap = () => {

    setViewPort((prevViewport) => ({
      ...prevViewport,
      latitude: coordinates.lat,
      longitude: coordinates.lng
    }));

    setViewPort((prevViewport) => {
      let b = getBoundaryCords(prevViewport);
      setBounds(b);
      return {
        ...prevViewport,
        bounds: b
      };
    });
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

  const [viewport, setViewPort] = useState(
    new WebMercatorViewport({
      width: 800,
      height: 800,
      zoom: 10,
      padding: 20,
      offset: [0, -100]
    })
  )

  // current map window with co-ordinates is viewport. 
  // As user drags of scrolls view Port that contaings current co-ordinates changes and 'onViewportChange' is executed

    useEffect(initializeMap, [gotCords]);
    console.log('RENDERING MAP');
    return (
        <div>
            <Box sx={{
              width:'100%',
              height:850,
              pt:2,
              pr:2
            }}>
                <ReactMapGl
                  {...viewport}
                  
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}

                  onViewportChange={currviewport =>{
                    // get the boundaries of the map displayed (i.e lat and long of corners of visible region of the map)
                    const currbounds = getBoundaryCords(currviewport)
                    // change the viewWindow data
                    setViewPort({...currviewport, bounds:currbounds})
                    // change the co-ordinates and boundaries
                    setCoordinates({
                      lat:currviewport.latitude,
                      lng: currviewport.longitude
                    })
                    setBounds({...currbounds})
                    console.log('CHANGED VIEW');
                  } }

                  mapStyle='mapbox://styles/4everyhappy/ckylosdfn3lkx14l2dhot0rut'
                >
                  {places?.map(place => (
                    <Marker key={place.location_id} latitude={Number(place.latitude)} longitude={Number(place.longitude)}>
                      <LocationOnIcon fontSize="large" />
                    </Marker>
                  ))}
                </ReactMapGl>
                
            </Box>
        </div>
    )
}

export default Map