import axios from "axios"

const instance = axios.create({
  baseURL: "https://ecommerce-backend-1jkn.onrender.com",
})

export default instance
