import axios from "axios";
import Cookies from "js-cookie";
import axios_api from "../pages/axios";
import { endpoints } from '../pages/endpoints.js'
export async function getPets(email) {
    try {
        const response = await axios_api.post(
            endpoints.get_pets,
            {
                email: localStorage.getItem('email')
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('authToken')}`
                }
            }
        );
        if (response.status === 200) {
            const data = response.data.results;
            return data
        }
        return []
    } catch (err) {
        console.error('Error in GET /pets', err)
        return err
    }
}

export async function addPet(email, nombre, raza, fecha, ciudad, url) {
    try {
        const payload = {
            email: localStorage.getItem('email') || email,
            subscripcion_id: null,
            nombre: nombre,
            raza: raza,
            fecha_nacimiento: fecha,
            ciudad: ciudad,
            url_foto: url || ''
        }
        const response = await axios_api.post(
            endpoints.add_pet,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('authToken')}`
                }
            }
        );

        if (response.status === 201) {
            return 201
        }
    } catch (err) {
        console.error('Error POST to /add-pet', err);
        return err
    }
}
