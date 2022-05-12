import axios from 'axios';
import Cookies from 'js-cookie'

const remember = Cookies.get(process.env.NEXT_PUBLIC_API_TOKEN_NAME)

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
})

if (remember) {
  Axios.defaults.headers.Authorization = `Bearer ${remember}`
}
axios.defaults.headers["Asinyo-Authorization-Type"] = "asinyo"

export default Axios