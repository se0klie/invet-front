import axios_api from '../pages/axios';
import { endpoints } from '../pages/endpoints';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
export async function loginHelper(email, password) {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}db/clientes/?email=${email}`,
            {
                'headers': {
                    'Authorization': `Bearer ${Cookies.get('authToken')}`
                }
            }
        )

        if (response.status === 200) {
            const data = response.data[0];
            if (data) {
                if (data.password === password) {
                    localStorage.setItem('email', email)
                    localStorage.setItem('nombre', data.nombres.split(' ')[0] + ' ' + data.apellidos.split(' ')[0])
                    const cookieReq = await axios_api.post(endpoints.session_token,
                        { email: email, password: password }
                    )
                    Cookies.set('authToken', cookieReq.data.bearer_token), { expires: 1 };
                    delete data.password
                    return { response: true, data: data };
                } else {
                    return { response: false, message: 'Contraseña incorrecta.' }
                }
            } else {
                return { response: false, message: 'Credenciales inválidas.' }
            }
        }
        return { response: false, message: 'Hubo un error en el proceso. Inténtelo más tarde.' }
    } catch (err) {
        console.error("Login error:", err);
        return { response: false, message: 'Hubo un error en el proceso. Inténtelo más tarde.' }
    }
}