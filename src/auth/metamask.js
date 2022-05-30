// ** API Routes
import api from '../router/routes/api'

import axios from "axios"

export const signature = async () => {
    return await axios.post(
        `${api.endpoint + api.routes.auth.login}`
    )
}

export const verifySignature = async (params) => {
    return await axios.post(
        `${api.endpoint + api.routes.auth.login}`
    )
}