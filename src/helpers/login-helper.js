import axios_api from '../pages/axios';
import { endpoints } from '../pages/endpoints.js';

export async function loginHelper(email, password) {
    try {
        const response = await axios_api.post(endpoints.session_token,
            { email: email, password: password }
        )
        if (response.status === 200) {
            const data = await axios_api.get(endpoints.account_data)
            if (data.status === 201 || data.status === 200) {
                return { response: true, data: data.data }
            }
        }
        return { response: false, message: 'Credenciales incorrectas.' }
    } catch (err) {
        console.error("Login error:", err);
        if (err.status === 401) {
            return { response: false, message: 'Credenciales incorrectas.' }
        }
        return { response: false, message: 'Hubo un error en el proceso. Inténtelo más tarde.' }
    }
}