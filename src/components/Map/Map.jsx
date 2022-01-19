import { Box } from "@mui/system";
import React, {useState} from "react";
import ReactMapGl from 'react-map-gl'

const Map = ()=>{
  const [viewPort, setViewPort] = useState({
    latitude: 37.7577,
    longitude: -122.4376,
    width: "95%",
    height: "100%",
    zoom: 10
  })
  // current map window with co-ordinates is viewPort. As user drags of scrolls view Port that contaings current co-ordinates changes
  // console.log(viewPort);

    return (
        <div>
            <Box sx={{
              width:'100%',
              height:850,
              pt:2
            }}>
                <ReactMapGl
                  {...viewPort}
                  mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                  onViewportChange={viewport => setViewPort(viewport)}
                  mapStyle='mapbox://styles/4everyhappy/ckylosdfn3lkx14l2dhot0rut'
                >
                  
                </ReactMapGl>
                
            </Box>
        </div>
    )
}

export default Map