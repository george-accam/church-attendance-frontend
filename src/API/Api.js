import axios from "axios";

const token = localStorage.getItem("token")

export default axios.create({
    baseURL: 'https://church-attendance-server.vercel.app/api/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
});