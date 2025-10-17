//Axios definition for callinig API

import axios from 'axios';

//Create instance of axios with base URL
const api = axios.create({
    baseURL: "http://localhost:8000"
});