import axios from "axios";

const url = process.env.NODE_ENV === 'production' ? "https://webimizr.herokuapp.com" : "http://localhost:3000"

const baseURL = axios.create({
    baseURL: url
})

export default baseURL