import axios from "axios";
import { getEnv } from "../helpers";

const { VITE_API_URL } = getEnv()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

export {
    calendarApi
}