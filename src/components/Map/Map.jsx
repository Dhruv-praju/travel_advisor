import { Box } from "@mui/system";
import React, {useState} from "react";
import ReactMapGl, { Marker, WebMercatorViewport } from 'react-map-gl'
import useToggle from "../../hooks/useToggle";
import LocationOnIcon from '@mui/icons-material/LocationOn';
// latitude: 37.7577,
//    longitude: 122.437
const Map = ( {coordinates, setCoordinates, setBounds, places} )=>{

  const [isInitaizedCords, toggleIsInitaizedCords] = useToggle(false)

  const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    width: "100%",
    height: "100%",
    zoom: 11,
  })
  // current map window with co-ordinates is viewPort. 
  // As user drags of scrolls view Port that contaings current co-ordinates changes and 'onViewportChange' is executed
    //  console.log(viewPort);
    function getBoundaryCords(vp){
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
    return (
        <div>
            <Box sx={{
              width:'100%',
              height:850,
              pt:2,
              pr:2
            }}>
                <ReactMapGl
                  {...viewPort}
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}

                  onViewportChange={viewport =>{
                    // get the boundaries of the map displayed (i.e lat and long of corners of visible region of the map)
                    const bounds = getBoundaryCords(viewport)
                    // change the viewWindow data
                    if(!isInitaizedCords && coordinates.lat){
                      setViewPort({...viewport, latitude:coordinates.lat, longitude:coordinates.lng, width:'100%', bounds})
                      toggleIsInitaizedCords()
                    }
                    else setViewPort({...viewport, width:'100%', bounds})
                    // change the co-ordinates and boundaries
                    setCoordinates({lat:viewPort.latitude, lng: viewPort.longitude})
                    setBounds({...viewPort.bounds})
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