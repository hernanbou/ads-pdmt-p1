import axios from "axios";
import { GEOAPIFY_KEY } from "./chaves";

export default axios.create({
    baseURL: 'https://api.geoapify.com/v2/',
    params:{
        api_key: GEOAPIFY_KEY
    }
})