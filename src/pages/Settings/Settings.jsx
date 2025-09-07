import React, { useEffect, useState } from 'react';
import { Box, Divider, Button, Typography, Modal } from '@mui/material';
import { DataInput, PasswordLabelWithTooltip, DataSelect } from '../shared components/Inputs';
import { FaPencilAlt, FaRegSave } from "react-icons/fa";
import { CancelButton, GrayButton, LightGreenButton } from '../shared components/Buttons';
import { RxCross1 } from "react-icons/rx";
import axios from 'axios';
import { LoadingModal } from '../shared components/Modals'
import Cookies from 'js-cookie';
import axios_api from '../axios';
import { endpoints } from '../endpoints'
import { useAuth } from '../../context/AuthContext';
export default function Settings() {
    const [formData, setFormData] = useState({})
    const [editableData, setEditableData] = useState(formData)
    const [passwords, setPasswords] = useState({
        newpassword: '',
        oldpassword: ''
    })
    const [errors, setErrors] = useState({})
    const [isEditable, setIsEditable] = useState(false)
    const [saveChanges, setSaveChanges] = useState(false)
    const [savePassword, setSavePassword] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)
    const [loadingModalStep, setLoadingModalStep] = useState(0)
    const [passwordErrors, setPasswordErrors] = useState({})
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [showErrorModal, setShowErrorModal] = useState(false)
    const { login } = useAuth()
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const settingsFields = [
        {
            label: 'Nombres completos',
            placeholder: 'Maria Alejandra',
            formData: 'firstNames',
            type: 'text'
        },
        {
            label: 'Apellidos completos',
            placeholder: 'Lopez Diaz',
            formData: 'lastNames',
            type: 'text'
        },
        {
            label: 'E-mail',
            placeholder: 'maalejandra@gmail.com',
            formData: 'email',
            type: 'text'

        },
        {
            label: 'Celular',
            placeholder: '0975537486',
            formData: 'phone',
            type: 'number'
        },
        {
            label: 'Cédula',
            placeholder: '06394653748',
            formData: 'idnumber',
            type: 'number'
        },
        {
            label: 'Dirección',
            placeholder: 'Ej. Samanes 5 Mz. 2 villa 3',
            formData: 'address'
        },
    ]

    function verifyFields() {
        let hasErrors = false;
        const newErrors = {};
        const cleanedData = {}
        Object.entries(editableData).forEach(([key, value]) => {
            if (value === '') {
                return
            }
            else if (key === 'email' && !value.includes('@')) {
                newErrors[key] = 'Correo inválido.';
                hasErrors = true;
            } else if (key === 'idnumber' && value.length !== 10) {
                newErrors[key] = 'Cédula no válida.';
                hasErrors = true;
            } else if (key === 'phone' && value.length < 10) {
                newErrors[key] = 'Celular inválido.';
                hasErrors = true;
            } else if (key === 'newpassword') {
                const isLongEnough = value.length >= 8;
                const hasUppercase = /[A-Z]/.test(value);
                const hasLowercase = /[a-z]/.test(value);
                const hasNumber = /[0-9]/.test(value);

                if (!isLongEnough) {
                    newErrors[key] = 'La contraseña debe tener al menos 8 caracteres.';
                    hasErrors = true;
                } else if (!hasUppercase) {
                    newErrors[key] = 'La contraseña debe tener al menos una mayúscula.';
                    hasErrors = true;
                } else if (!hasLowercase) {
                    newErrors[key] = 'La contraseña debe tener al menos una minúscula.';
                    hasErrors = true;
                } else if (!hasNumber) {
                    newErrors[key] = 'La contraseña debe tener al menos un número.';
                    hasErrors = true;
                }
            }
            cleanedData[key] = value;
        });

        setEditableData(cleanedData);
        setErrors(newErrors);
        return !hasErrors;
    }

    async function fetchUserData() {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}db/clientes/?email=${localStorage.getItem('email')}`,
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('authToken')}`
                    }
                }
            );
            const userData = response.data[0];
            if (userData) {
                setFormData({
                    firstNames: userData.nombres,
                    lastNames: userData.apellidos,
                    email: userData.email,
                    phone: userData.celular,
                    idnumber: userData.cedula,
                    address: userData.direccion_facturacion,
                    password: userData.password
                })
                setEditableData({
                    firstNames: userData.nombres,
                    lastNames: userData.apellidos,
                    email: userData.email,
                    phone: userData.celular,
                    idnumber: userData.cedula,
                    address: userData.direccion_facturacion,
                })
                return 200;
            } else {
                return 400
            }

        } catch (err) {
            console.error("API call failed:", err);
            return err.status || 500;
        }
    }

    useEffect(() => {
        if (formData && Object.keys(formData).length === 0) {
            fetchUserData()
        }
    }, [formData, editableData]);


    async function handleEditPassword() {
        try {
            setSavePassword(false)
            setLoadingModal(true)

            const response = await axios_api.patch(
                endpoints.update_data,
                {
                    cedula: formData.idnumber,
                    email: formData.email,
                    celular: formData.phone,
                    direccion_facturacion: formData.address,
                    password: passwords.newpassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('authToken')}`
                    }
                }
            );

            if (response.status === 202) {
                setTimeout(() => {
                    setLoadingModalStep(1)
                    setTimeout(() => {
                        setLoadingModal(false);
                        setLoadingModalStep(0);
                    }, 2500);
                }, 2000);
            }
        } catch (err) {
            console.error('Error in POST API', err)
            setTimeout(() => {
                setLoadingModalStep(-1)
                setTimeout(() => {
                    setLoadingModal(false);
                    setLoadingModalStep(0);
                }, 2500);
            }, 2000);
            return
        }
    }
    async function handleSaveFields() {
        setSaveChanges(false);
        setLoadingModal(true);
        try {

            const response = await axios_api.patch(
                endpoints.update_data,
                {
                    cedula: editableData.idnumber,
                    email: editableData.email,
                    celular: editableData.phone,
                    direccion_facturacion: editableData.address,
                    nombres: editableData.firstNames,
                    apellidos: editableData.lastNames
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('authToken')}`
                    }
                }
            );

            login({email: editableData.email, name:  editableData.firstNames.split(' ')[0] + ' ' + editableData.lastNames.split(' ')[0]})
            localStorage.setItem('nombre', editableData.firstNames.split(' ')[0] + ' ' + editableData.lastNames.split(' ')[0])
            if (response.status === 202) {
                setTimeout(() => {
                    setIsEditable(false);
                    setLoadingModalStep(1);
                }, 3000);
            }
        } catch (err) {
            console.error("API call failed:", err);
            setIsEditable(false);
            setLoadingModalStep(-1);
        } finally {
            setTimeout(() => {
                setLoadingModal(false);
                setLoadingModalStep(0);
            }, 2500);
        }
    }

    function checkPasswords() {
        let hasErrors = false;
        const newErrors = {};

        Object.entries(passwords).forEach(([key, value]) => {
            if (!value || value === '') {
                newErrors[key] = 'Campo obligatorio.';
                hasErrors = true
            }
            else if (key === 'newpassword') {
                const isLongEnough = value.length >= 8;
                const hasUppercase = /[A-Z]/.test(value);
                const hasLowercase = /[a-z]/.test(value);
                const hasNumber = /[0-9]/.test(value);

                if (!isLongEnough) {
                    newErrors[key] = 'La contraseña debe tener al menos 8 caracteres.';
                    hasErrors = true;
                } else if (!hasUppercase) {
                    newErrors[key] = 'La contraseña debe tener al menos una mayúscula.';
                    hasErrors = true;
                } else if (!hasLowercase) {
                    newErrors[key] = 'La contraseña debe tener al menos una minúscula.';
                    hasErrors = true;
                } else if (!hasNumber) {
                    newErrors[key] = 'La contraseña debe tener al menos un número.';
                    hasErrors = true;
                }
            } else if (key === 'oldpassword' && passwords.oldpassword !== formData.password) {
                newErrors[key] = 'La contraseña es incorrecta.';
                hasErrors = true;
            }
        })

        setPasswordErrors(newErrors);
        return !hasErrors;
    }

    return (
        <Box sx={{ backgroundColor: 'var(--primary-color)', minHeight: '90vh', display: 'flex', justifyContent: 'center', paddingBottom: '1.5rem' }}>
            <Box
                sx={{
                    width: '85%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        padding: '1.5rem',
                        marginLeft: isMobile ? 0 : '3rem',
                        color: 'var(--blackinput-color)',
                        fontWeight: 'bold',
                        width: '100%',
                    }}
                >
                    <Typography variant='h4' sx={{ fontWeight: 600 }}>Ajustes</Typography>
                </Box>

                <Box
                    sx={{
                        padding: '1.5rem',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        width: '90%',
                        height: 'max-content'
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            marginBottom: '1rem',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: `repeat(${isMobile ? 1 : 2}, 1fr)`,
                                gap: '1rem',
                            }}
                        >
                            {settingsFields.map((field, i) => (
                                field.formData === 'city' ? (
                                    <DataSelect
                                        key={i}
                                        label="Ciudad"
                                        setData={setEditableData}
                                        formLabel="city"
                                        value={editableData.city}
                                        errorMessage={errors.city}
                                        isDisabled={!isEditable}
                                    />
                                ) : (
                                    <DataInput
                                        key={i}
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        setData={setEditableData}
                                        formLabel={field.formData}
                                        type={field.type}
                                        errorMessage={errors[field.formData]}
                                        value={editableData[field.formData]}
                                        disabled={!isEditable}
                                    />
                                )
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, marginLeft: 'auto' }}>
                            {isEditable && (
                                <Box sx={{ width: '40%' }}>
                                    <GrayButton text="Cancelar" action={() => {
                                        setEditableData(formData)
                                        setIsEditable(false)
                                    }} />
                                </Box>
                            )}

                            <Button
                                sx={{
                                    border: '0.1rem solid var(--secondary-color)',
                                    background: isEditable ? 'var(--secondary-color)' : 'transparent',
                                    borderRadius: '0.6rem',
                                    color: isEditable ? 'white' : 'var(--secondary-color)',
                                    fontWeight: 600,
                                    width: isMobile ? '100%' : '60%',
                                    minWidth: 'min-content',
                                    gap: '1rem',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    '&:hover': {
                                        backgroundColor: isEditable ? 'var(--darkgreen-color)' : 'var(--secondary-color)',
                                        border: isEditable ? '0.1rem solid var(--darkgreen-color)' : '0.1rem solid var(--secondary-color)',
                                        color: 'white'
                                    }
                                }}
                                onClick={() => {
                                    if (!isEditable || verifyFields()) setIsEditable(!isEditable);
                                    if (isEditable && verifyFields()) setSaveChanges(true);
                                }}
                            >
                                {!isEditable ? <><FaPencilAlt /> Editar información</> : <><FaRegSave /> Guardar información</>}
                            </Button>
                        </Box>
                    </Box>

                    <Divider />

                    <Box>
                        <Typography
                            variant='h5'
                            sx={{
                                color: 'var(--blackinput-color)',
                                fontWeight: 600
                            }}>
                            Editar contraseña
                        </Typography>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '2fr 2fr 1fr',
                                marginY: '1rem',
                                borderRadius: '0.3rem',
                                gap: '1rem',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >

                            <PasswordLabelWithTooltip label={'Contraseña actual'} placeholder={'Ingrese su actual contraseña'} setData={setPasswords} formLabel={'oldpassword'} value={passwords['oldpassword']} errorMessage={passwordErrors.oldpassword} />
                            <PasswordLabelWithTooltip label={'Nueva contraseña'} placeholder={'Ingrese su nueva contraseña'} showTooltip={true} errorMessage={passwordErrors.newpassword} formLabel={'newpassword'} value={passwords['newpassword']} setData={setPasswords} />
                            <Button
                                sx={{
                                    background: 'var(--error-fill-color)',
                                    color: 'white',
                                    fontWeight: 600,
                                    width: '100%',
                                    '&:hover': {
                                        backgroundColor: 'var(--error-fill-hover-color)'
                                    },
                                    paddingY: '0.5rem',
                                    marginTop: 'auto'
                                }}
                                onClick={() => {
                                    if (checkPasswords()) {
                                        setSavePassword(true)
                                    }
                                }}>
                                Cambiar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Modal
                open={saveChanges}
                onClose={() => setSaveChanges(false)}
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
                        width: { xs: '80%', md: 400 },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            paddingBottom: '1rem'
                        }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'var(--darkgreen-color)' }}>
                            Guardar cambios
                        </Typography>

                        <Typography variant="body1" sx={{ color: 'black' }}>
                            ¿Deseas guardar los cambios realizados en tu información?
                        </Typography>

                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 1,
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => {
                                setSaveChanges(false)
                                setEditableData(formData)
                            }}
                            sx={{
                                borderColor: 'var(--dark-gray-color)',
                                color: 'var(--dark-gray-color)',
                                fontWeight: 600,
                                borderRadius: '0.5rem',
                            }}
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'var(--darkgreen-color)',
                                color: 'white',
                                fontWeight: 600,
                                borderRadius: '0.5rem',
                            }}
                            onClick={() => {
                                handleSaveFields()
                                setFormData(editableData)
                            }}
                        >
                            Guardar
                        </Button>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={savePassword}
                onClose={() => setSavePassword(false)}
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
                        width: { xs: '80%', md: 400 },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            paddingBottom: '1rem'
                        }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'var(--error-fill-hover-color)' }}>
                            Actualizar contraseña
                        </Typography>

                        <Typography variant="body1" sx={{ color: 'black' }}>
                            Se actualizará tu contraseña, ¿deseas continuar?
                        </Typography>

                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 1,
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={() => setSavePassword(false)}
                            sx={{
                                borderColor: 'var(--dark-gray-color)',
                                color: 'var(--dark-gray-color)',
                                fontWeight: 600,
                                borderRadius: '0.5rem',
                            }}
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant="contained"
                            onClick={async () => {

                                await handleEditPassword()
                                setSavePassword(false);
                                setLoadingModal(true);
                            }}
                            sx={{
                                backgroundColor: 'var(--error-fill-hover-color)',
                                color: 'white',
                                fontWeight: 600,
                                borderRadius: '0.5rem',
                            }}
                        >
                            Cambiar contraseña
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <LoadingModal open={loadingModal} text="Guardando cambios..." setOpen={setLoadingModal} modalStep={loadingModalStep} />
        </Box >

    )
}