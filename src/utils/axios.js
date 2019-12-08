import axios from 'axios';

export default axios.create({
    baseURL: "http://10.0.52.120:7000/",
    responseType: "json"
})