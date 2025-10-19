import axios from "axios";
import Cookies from "js-cookie";
import axios_api from "../pages/axios";
import { endpoints } from '../pages/endpoints.js'
export async function getPets() {
    try {
        const response = await axios_api.get(endpoints.get_pets);
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

export async function addPet(nombre, raza, fecha, ciudad, image) {
    try {
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('raza', raza);
        formData.append('fecha_nacimiento', fecha);
        formData.append('ciudad', ciudad);

        if (image) {
            formData.append('image', image); // <– File object from input
        }

        const response = await axios_api.post(endpoints.add_pet, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 201) {
            return 201;
        }
    } catch (err) {
        console.error('Error POST to /add-pet', err);
        return err;
    }
}

export async function compressImage(file, maxWidth = 800, maxHeight = 800, quality = 0.7) {
    return new Promise((resolve) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target.result;
        };

        img.onload = () => {
            // Calculate new size keeping aspect ratio
            let width = img.width;
            let height = img.height;

            if (width > height && width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            } else if (height > maxHeight) {
                width = Math.round((width * maxHeight) / height);
                height = maxHeight;
            }

            // Draw to canvas
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to blob
            canvas.toBlob(
                (blob) => {
                    // Create a new File object with the same name and type
                    const compressedFile = new File([blob], file.name, {
                        type: file.type,
                        lastModified: Date.now(),
                    });
                    resolve(compressedFile);
                },
                file.type,
                quality // between 0 and 1
            );
        };

        reader.readAsDataURL(file);
    });
}
