// HERE GOES ALL API CALLS
import axios from "axios";


const filterPlacesData = (places)=>{
  return places.filter(place => Boolean(place.name))
}
const getPlacesData = async (type, sw, ne) => {
  try {
    // request
        const URL = `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`

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
        console.log('ERROR OCCURED WHILE CALLING API !!');
        console.log(error);
    }
}

export default getPlacesData