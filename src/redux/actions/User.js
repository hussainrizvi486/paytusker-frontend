import axios from "axios"
import { API_URL } from "../store"
import { getUserDetails } from "../slices/authSlice"
export const CreateOrder = async (data) => {

    const accessToken = getUserDetails()[2]

    const req = await axios.post(`${API_URL}api/order/create-order`, data, {
        headers: { 'Authorization': `Bearer ${accessToken}` }
    })

    if (req.status === 200) {
        console.log(req)
    }

}