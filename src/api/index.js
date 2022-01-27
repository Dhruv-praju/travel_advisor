// HERE GOES ALL API CALLS
import axios from "axios";

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

const filterPlacesData = (places)=>{
  return places.filter(place => Boolean(place.name))
}
const getPlacesData = async ( sw, ne) => {
    try {
        // request
        const { data: respData } = await axios.get(URL, {
            params: {
              bl_latitude:  sw.lat,
              tr_latitude:  ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
              'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
            }
        })
        const { data } =  respData
        return filterPlacesData(data)

    } catch (error) {
        console.log('ERROR OCCURED !!'+error);
    }
}

export default getPlacesData