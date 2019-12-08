import axios from 'axios';

export default axios.create({
    baseURL: "http://10.0.54.43:8000/",
    responseType: "json"
})