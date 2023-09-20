import axios from "axios";


const calendarApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// De esta manera todas las peticiones que hagan uso de la request se enviara este header x defecto
calendarApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        "x-token": localStorage.getItem('token')
    }

    return config
})

export {
    calendarApi
}