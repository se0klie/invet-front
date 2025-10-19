import { Box, Button, Typography, Modal, Snackbar, Alert } from "@mui/material"
import { useState, useEffect } from "react";
import EmptyPet from "./EmptyPet";
import { AddPet, LightGreenButton } from '../../pages/shared components/Buttons'
import PetBox from "../../pages/shared components/PetBox"
import { DataInput, DataSelect } from "../../pages/shared components/Inputs";
import { RxCross1 } from "react-icons/rx";
import { LoadingModal } from "../shared components/Modals";
import axios_api from '../axios'
import { endpoints } from "../endpoints.js";
import Cookies from 'js-cookie';
import { compressImage } from "../../helpers/pets-helper";
export default function MisMascotas({ pets, subs, handleRefresh }) {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success', // "success" | "error" | "warning" | "info"
    });

    const [addPetModal, setAddPetModal] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false)
    const [loadingModalStep, setLoadingModalStep] = useState(0)
    const [newPetData, setNewPetData] = useState({ image: undefined, nombre: '', raza: '', fecha_nacimiento: '', ciudad: '' });
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [modalMessage, setModalMessage] = useState('Cargando...')

    async function addPet() {
        setModalMessage('Agregando mascota...')
        setAddPetModal(false)
        setLoadingModalStep(0)
        setLoadingModal(true)
        try {
            const formData = new FormData();
            formData.append('nombre', newPetData.nombre);
            formData.append('raza', newPetData.raza);
            formData.append('fecha_nacimiento', newPetData.fecha_nacimiento);
            formData.append('ciudad', newPetData.ciudad);

            // Only append the file if it exists
            if (newPetData.image) {
                formData.append('image', newPetData.image);
            }

            // Send as multipart/form-data
            const response = await axios_api.post(endpoints.add_pet, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.status === 201) {
                await handleRefresh()
                setTimeout(() => {
                    setLoadingModalStep(1);
                    setTimeout(() => {
                        setLoadingModal(false)
                        setLoadingModalStep(0)
                    }, 2000);
                }, 3000);
            }
        } catch (err) {
            console.error('Error POST to /add-pet', err);
            setTimeout(() => {
                setLoadingModalStep(-1);
                setTimeout(() => {
                    setLoadingModal(false)
                    setLoadingModalStep(0)
                }, 2000);
            }, 3000);
        }
    }

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Solo se permiten imágenes.');
            return;
        }
        const previewUrl = URL.createObjectURL(file);
        const compressed = await compressImage(file);

        setNewPetData((prev) => ({
            ...prev,
            preview_url: previewUrl,
            image: compressed
        }));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '72vh', margin: '1.5rem', overflowY: 'hidden' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            color: 'var(--blackinput-color)',
                            fontWeight: 'bold',
                        }}
                    >
                        Mascotas registradas
                    </Typography>
                </Box>
                <AddPet action={() => { setAddPetModal(true) }} />
            </Box>


            <Box sx={{ flex: 1, mt: '1rem', overflow: 'hidden' }}>
                {pets.length === 0 ? (
                    <Box sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <EmptyPet />
                    </Box>

                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            justifyContent: 'flex-start',
                            overflowY: 'auto',
                            height: '100%',
                            '&::-webkit-scrollbar': {
                                width: '6px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#c1c1c1',
                                borderRadius: '3px',
                            },
                        }}
                    >
                        {pets.map((pet, index) => (
                            <PetBox
                                key={index}
                                pets={pets}
                                pet={pets[index]}
                                refreshDashboard={handleRefresh}
                                sub={subs[pet.id]?.subscripcion}
                                subs={subs}
                            />
                        ))}
                    </Box>
                )}
            </Box>
            <Modal
                open={addPetModal}
                onClose={() => {
                    setNewPetData({
                        image: undefined,
                        name: '',
                        breed: '',
                        birthdate: '',
                        city: ''
                    })
                    setAddPetModal(false)
                }}
                disableEnforceFocus={true}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        width: { xs: '70%', md: 500, lg: 600 },
                    }}
                >
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'var(--darkgreen-color)' }}>
                                Añadir mascota
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                Ingresa los datos necesarios para registrar a tu mascota
                            </Typography>
                        </Box>

                        <RxCross1
                            style={{ color: 'black', cursor: 'pointer' }}
                            onClick={() => setAddPetModal(false)}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: '1rem',
                            marginTop: '1rem',
                            maxHeight: '60vh',
                            overflowY: 'auto',
                            flexDirection: isMobile ? 'column' : 'row',
                        }}
                    >
                        <Box
                            sx={{
                                flexBasis: '60%',
                                flexGrow: 0,
                                flexShrink: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                paddingY: '1rem',
                            }}
                        >
                            <DataInput
                                label={'Nombre'}
                                placeholder={'Ej. Pelusita'}
                                setData={setNewPetData}
                                value={newPetData.nombre}
                                type={'text'}
                                formLabel={'nombre'}
                            />
                            <DataInput
                                label={'Raza'}
                                placeholder={'Ej. Pooddle'}
                                setData={setNewPetData}
                                value={newPetData.raza}
                                type={'text'}
                                formLabel={'raza'}
                            />

                            <DataInput
                                label={'Fecha de nacimiento'}
                                setData={setNewPetData}
                                value={newPetData.fecha_nacimiento}
                                formLabel={'fecha_nacimiento'}
                                type={'date'}
                            />

                            <DataSelect
                                label={'Ciudad'}
                                setData={setNewPetData}
                                value={newPetData.ciudad}
                                formLabel={'ciudad'}
                            />
                        </Box>

                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '1rem',
                            }}
                        >
                            <Typography variant="p" sx={{ fontWeight: 'bold', color: 'var(--blackinput-color)' }}>
                                Subir foto (opcional)
                            </Typography>
                            <Box
                                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                                <Box>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                        id="pet-image-upload"
                                    />
                                    <label htmlFor="pet-image-upload">
                                        <Box
                                            component="div"
                                            sx={{
                                                width: isMobile ? '70px' : '120px',
                                                height: isMobile ? '70px' : '120px',
                                                borderRadius: '50%',
                                                backgroundColor: 'var(--disabled-color)',
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                border: '2px dashed #ccc',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                '&:hover': {
                                                    borderColor: 'var(--secondary-color)',
                                                },
                                            }}
                                        >
                                            {newPetData.preview_url ? (
                                                <img
                                                    src={newPetData.preview_url}
                                                    alt="Vista previa"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <span style={{ color: '#777', fontSize: '0.8rem', textAlign: 'center' }}>
                                                    Subir Foto
                                                </span>
                                            )}
                                        </Box>
                                    </label>
                                </Box>
                                <LightGreenButton text='Guardar mascota' action={
                                    async () => {
                                        if (newPetData.nombre && newPetData.raza && newPetData.fecha_nacimiento) {
                                            await addPet()
                                            setNewPetData({
                                                nombre: '',
                                                raza: '',
                                                fecha_nacimiento: '',
                                                image: undefined
                                            })
                                        } else {
                                            setSnackbar({
                                                open: true,
                                                message: 'Por favor, rellena los campos obligatorios antes de continuar.',
                                                severity: 'error'
                                            })
                                        }
                                    }
                                } />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <LoadingModal text={modalMessage} modalStep={loadingModalStep} open={loadingModal} setOpen={setLoadingModal} />
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box >

    )
}
