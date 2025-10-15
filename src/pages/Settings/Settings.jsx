import React, { useEffect, useState } from 'react';
import { Box, Divider, Button, Typography, Modal, TextField, Tooltip } from '@mui/material';
import { DataInput, PasswordLabelWithTooltip, DataSelect } from '../shared components/Inputs';
import { FaPencilAlt, FaRegSave } from "react-icons/fa";
import { GrayButton } from '../shared components/Buttons';
import { LoadingModal } from '../shared components/Modals'
import axios_api from '../axios';
import { endpoints } from '../endpoints'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
    const [formData, setFormData] = useState({})
    const [passwords, setPasswords] = useState({
        newpassword: '',
        oldpassword: ''
    })
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [isEditable, setIsEditable] = useState(false)
    const [saveChanges, setSaveChanges] = useState(false)
    const [savePassword, setSavePassword] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)
    const [loadingModalStep, setLoadingModalStep] = useState(0)
    const [passwordErrors, setPasswordErrors] = useState({})
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [settingsFields, setSettingsFields] = useState([])
    const [deleteAccountModal, setDeleteAccountModal] = useState(false)
    const [openTerms, setOpenTerms] = useState(false)
    const { login } = useAuth()

    useEffect(() => {
        fetchUserData()
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        let settings = [
            {
                label: 'Nombres completos',
                value: formData.firstNames,
                formData: 'firstNames',
                type: 'text'
            },
            {
                label: 'Apellidos completos',
                value: formData.lastNames,
                formData: 'lastNames',
                type: 'text'
            },
            {
                label: 'Celular',
                value: formData.phone,
                formData: 'phone',
                type: 'text'
            },
            {
                label: 'Dirección',
                value: formData.address,
                formData: 'address',
                type: 'text'
            },
        ]
        setSettingsFields(settings)
    }, [formData])

    function verifyFields() {
        let hasErrors = false;
        const newErrors = {};
        const cleanedData = {}
        Object.entries(formData).forEach(([key, value]) => {
            if (value === '') {
                return
            }
            else if (key === 'idnumber' && value.length !== 10) {
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

        setFormData(cleanedData);
        setErrors(newErrors);
        return !hasErrors;
    }

    async function fetchUserData() {
        try {
            const response = await axios_api.get(endpoints.account_data);
            const userData = response.data;
            if (userData) {
                setFormData({
                    email: userData.email,
                    cedula: userData.cedula,
                    firstNames: userData.nombres,
                    lastNames: userData.apellidos,
                    phone: userData.celular,
                    address: userData.direccion_facturacion
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

    async function handleEditPassword() {
        const newErrors = {}
        try {
            setSavePassword(false)
            setLoadingModal(true)

            const passwordCheck = await axios_api.post(
                endpoints.check_password,
                {
                    password: passwords.oldpassword
                }
            )
            if (passwordCheck.data.verification) {
                const response = await axios_api.patch(
                    endpoints.update_data,
                    {
                        cedula: formData.idnumber,
                        new_password: passwords.newpassword,
                        current_password: passwords.oldpassword
                    }
                );
                setTimeout(() => {
                    setLoadingModalStep(1)
                    setTimeout(() => {
                        setLoadingModal(false);
                        setLoadingModalStep(0);
                    }, 2500);
                }, 2000);
                setPasswords({
                    newpassword: '',
                    oldpassword: ''
                })
            } else {
                setTimeout(() => {
                    setLoadingModalStep(-1)
                    setTimeout(() => {
                        setLoadingModal(false);
                        setLoadingModalStep(0);
                    }, 2500);
                }, 2000);
                setPasswordErrors((prev) => ({
                    ...prev,
                    oldpassword: 'La contraseña es incorrecta.'
                }))
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
                    cedula: formData.idnumber,
                    celular: formData.phone,
                    direccion_facturacion: formData.address,
                    nombres: formData.firstNames,
                    apellidos: formData.lastNames
                }
            );

            login({ email: localStorage.getItem('email'), name: formData.firstNames.split(' ')[0] + ' ' + formData.lastNames.split(' ')[0] })
            localStorage.setItem('nombre', formData.firstNames.split(' ')[0] + ' ' + formData.lastNames.split(' ')[0])
            if ([200, 201, 202].includes(response.status)) {
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

    async function handleDeleteAccount() {
        try {

            const response = await axios_api.delete(endpoints.delete_acc)
            if (response.status === 200 || response.status === 201) {
                setLoadingModalStep(1)
                setTimeout(() => {
                    setLoadingModal(false)
                    navigate('/logout')
                }, 2000);
            }
        } catch (err) {
            console.error(err)
            return err
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
                            <Box>
                                <Typography fontWeight="bold">Correo electrónico</Typography>
                                <Tooltip title={'No puedes realizar cambios a tu correo electrónico.'} placement="top" arrow>
                                    <TextField
                                        fullWidth
                                        sx={{
                                            "& .MuiInputBase-root": {
                                                padding: "4px 8px",
                                                fontSize: "0.875rem",
                                            },
                                            "& input": {
                                                padding: "6px 8px",
                                            },
                                        }}
                                        placeholder={ formData.email}
                                        disabled
                                    />
                                </Tooltip>
                            </Box>

                            <Box>
                                <Typography fontWeight="bold">Cédula</Typography>
                                <Tooltip title={'No puedes realizar cambios a tu cédula.'} placement="top" arrow>
                                    <TextField
                                        fullWidth
                                        sx={{
                                            "& .MuiInputBase-root": {
                                                padding: "4px 8px",
                                                fontSize: "0.875rem",
                                            },
                                            "& input": {
                                                padding: "6px 8px",
                                            },
                                        }}
                                        placeholder={formData.cedula}
                                        disabled
                                    />
                                </Tooltip>
                            </Box>

                            {settingsFields.map((field, i) => (
                                field.formData === 'city' ? (
                                    <DataSelect
                                        key={i}
                                        label="Ciudad"
                                        setData={setFormData}
                                        formLabel="city"
                                        value={formData.city ?? ""}
                                        errorMessage={errors.city ?? ""}
                                        isDisabled={!isEditable}
                                    />
                                ) : (
                                    <DataInput
                                        key={i}
                                        label={field.label ?? ""}
                                        setData={setFormData}
                                        formLabel={field.formData ?? ""}
                                        type={field.type ?? ""}
                                        errorMessage={errors[field.formData] ?? ""}
                                        value={formData[field.formData] ?? ""}
                                        disabled={!isEditable}
                                    />
                                )
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2, marginLeft: 'auto' }}>
                            {isEditable && (
                                <Box sx={{ width: '40%' }}>
                                    <GrayButton text="Cancelar" action={async () => {
                                        setFormData(formData)
                                        setIsEditable(false)
                                        await fetchUserData();
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
                                fontWeight: 600,
                                paddingTop: 1
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
                    <Divider />
                    <Box>
                        <Typography
                            variant='h5'
                            sx={{
                                color: 'var(--blackinput-color)',
                                fontWeight: 600,
                                paddingTop: 1
                            }}>
                            Eliminar mi cuenta
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
                            <Button
                                sx={{
                                    color: 'var(--darkgreen-color)',
                                    fontWeight: 600,
                                    width: '100%',
                                    borderColor: 'var(--darkgreen-color)',
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    py: '0.5rem',
                                    mt: 'auto',
                                    '&:hover': {
                                        borderColor: 'var(--darkgreen-color)',
                                    },
                                }}
                                onClick={() => { setOpenTerms(true) }}>
                                Ver términos y condiciones
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    color: 'var(--error-color)',
                                    fontWeight: 600,
                                    width: '100%',
                                    borderColor: 'var(--error-color)',
                                    borderWidth: 1,
                                    borderStyle: 'solid',
                                    py: '0.5rem',
                                    mt: 'auto',
                                    '&:hover': {
                                        borderColor: 'var(--error-color)',
                                    },
                                }}
                                onClick={() => {
                                    setDeleteAccountModal(true)
                                }}
                            >
                                Eliminar
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
                                setSaveChanges(false);
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
                                setFormData(formData)
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

            <Modal
                open={deleteAccountModal}
                onClose={() => setDeleteAccountModal(false)}
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
                            Eliminar tu cuenta
                        </Typography>

                        <Typography variant="body1" sx={{ color: 'black' }}>
                            Se eliminará tu cuenta luego de esta acción la cuál es irreversible. Cualquier plan cuya suscripción fue realizada
                            en los últimos 60 días será cobrada según los términos y condiciones aplicados. ¿Desea continuar?
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
                            onClick={() => setDeleteAccountModal(false)}
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
                                setDeleteAccountModal(false);
                                setLoadingModal(true);
                                await handleDeleteAccount()
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

            <Modal open={openTerms} onClose={() => setOpenTerms(false)}>

                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: 600,
                        bgcolor: 'background.paper',
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        maxHeight: '80vh',
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', color: 'black', mb: 2 }}
                    >
                        TÉRMINOS Y CONDICIONES – PLANES PREVENTIVOS DE CREMACIÓN DE MASCOTAS
                    </Typography>

                    <Box
                        sx={{
                            flex: 1,
                            overflowY: 'auto',
                            pr: 1,
                            mb: 2,
                            scrollbarWidth: 'thin',
                            maxHeight: '60vh',
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'rgba(0,0,0,0.4)',
                                borderRadius: '4px',
                            },
                        }}
                    >
                        {[
                            {
                                title: "Cobertura geográfica",
                                items: [
                                    "Este servicio está disponibe exclusivamente en Guayaquil, Samborondón, Durán y Chongón.",
                                    "Si el cliente contrata el plan desde una ciudad o zona no cubierta, la empresa se reserva el derecho de cancelar la suscripción y reembolsar el valor pagado si corresponde.",
                                    "En caso de futuras expansiones, estas condiciones serán actualizadas oportunamente."
                                ]
                            },
                            {
                                title: "Activación del plan",
                                items: [
                                    "El plan podrá utilizarse únicamente después de haber transcurrido un período mínimo de 60 días desde el primer pago exitoso.",
                                    "Si la mascota fallece antes de cumplir los 60 días, el cliente deberá abonar el valor del plan inmediato vigente (ver punto siguiente)."
                                ]
                            },
                            {
                                title: "Valores del servicio inmediato (si fallece antes de 60 días)",
                                items: ["Plan Básico: $120", "Plan Premium: $230", "Plan Presencial: $300"]
                            },
                            {
                                title: "Diferencias a pagar (si fallece después de 60 días pero sin completar el plan)",
                                items: ["Si la mascota fallece después de los 60 días, pero el cliente aún no ha completado el pago total del plan, deberá abonar la diferencia pendiente para acceder al servicio."]
                            },
                            {
                                title: "Valor congelado y transferibilidad",
                                items: [
                                    "Una vez realizado el primer pago, el valor del plan queda congelado, incluso si el precio del servicio sube posteriormente.",
                                    "El plan puede ser transferido a otra mascota si así lo desea el cliente."
                                ]
                            },
                            {
                                title: "Aplicación del precio por especie o peso",
                                items: ["El precio del plan se mantiene independientemente de la especie, tamaño o peso de la mascota."]
                            },
                            {
                                title: "Cancelación del plan",
                                items: ["El cliente puede cancelar su plan en cualquier momento. Sin embargo, no se realizarán reembolsos de los pagos ya realizados."]
                            },
                            {
                                title: "Solicitud del servicio",
                                items: ["En caso de fallecimiento de la mascota, el cliente deberá contactar inmediatamente al WhatsApp oficial de la empresa para coordinar la recolección y activación del servicio."]
                            },
                            {
                                title: "Cobros automáticos",
                                items: [
                                    "Al aceptar estos términos, el cliente autoriza expresamente el débito automático mensual del valor correspondiente a su plan, a través del método de pago registrado.",
                                    "El cobro se realizará cada mes de forma recurrente, hasta completar el total del plan contratado."
                                ]
                            },
                            {
                                title: "Aceptación digital",
                                items: [
                                    "Al marcar la casilla correspondiente y enviar el formulario, el cliente declara que acepta plenamente estos Términos y Condiciones, constituyendo un contrato digital válido conforme a la Ley de Comercio Electrónico, Firmas Electrónicas y Mensajes de Datos del Ecuador."
                                ]
                            },
                            {
                                title: '⁠Política de cobros y avisos.',
                                items: [
                                    "En caso de que el débito automático a la tarjeta registrada por el cliente no pueda efectuarse, se enviarán hasta tres notificaciones de alerta al correo o número de contacto proporcionado.Si, luego de estos intentos, el pago no se realiza, el plan preventivo será suspendido temporalmente por un período de 14 días calendario, durante el cual el cliente podrá regularizar su situación mediante el pago pendiente.Si al finalizar dicho período no se registra el pago correspondiente, el plan será cancelado de manera definitiva, perdiendo el cliente los beneficios asociados."
                                ]
                            }
                        ].map((section, index) => (
                            <Typography key={index} sx={{ color: 'black', mb: 2 }}>
                                <strong>{index + 1}. {section.title}</strong>
                                <ul>
                                    {section.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            </Typography>
                        ))}
                    </Box>

                    <Button
                        onClick={() => setOpenTerms(false)}
                        sx={{
                            alignSelf: 'flex-end', mt: 1, backgroundColor: 'var(--darkgreen-color)', color: 'white',
                            '&:hover': {
                                backgroundColor: 'var(--hoverdarkgreen-color)'
                            }
                        }}
                    >
                        Cerrar
                    </Button>
                </Box>
            </Modal>

            <LoadingModal open={loadingModal} text="Guardando cambios..." setOpen={setLoadingModal} modalStep={loadingModalStep} />
        </Box >

    )
}