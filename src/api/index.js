// HERE GOES ALL API CALLS
import axios from "axios";

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

const options = {
    params: {
      bl_latitude: '11.847676',
      tr_latitude: '12.838442',
      bl_longitude: '109.095887',
      tr_longitude: '109.149359',
    },
    headers: {
      'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
      'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
    }
};

const getPlacesData = async () => {
    try {
        // request
        const { data: respData } = await axios.get(URL, options)
        const { data } =  respData
        return data

    } catch (error) {
        console.log('ERROR OCCURED !!'+error);
    }
}

export default getPlacesData