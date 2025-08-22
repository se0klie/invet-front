import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from "../../context/AuthContext"
import '../../style.css'
import './login.css'
import { Box, TextField, Typography, InputAdornment, IconButton, Button, Tooltip, Divider, Snackbar, Alert } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { NextButton, PreviousButton, DarkGreenButton, GrayButton, LightGreenButton } from "../shared components/Buttons";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSnackbar } from 'notistack';
import { DataInput, DataSelect, PasswordLabelWithTooltip } from '../shared components/Inputs';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material'
import { YellowAlert } from '../shared components/Alerts';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import axios_api from '../axios';
import { endpoints } from '../endpoints';
import Cookies from 'js-cookie';

Cookies.set('authToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDk1NDU1OTYxMyJ9.luImfOzxhv81mTEdho1gYRL8rPLW8AZHi-Gkklq2ClM', { expires: 1 });

export default function InitialState() {
    const [currentStep, setCurrentStep] = useState(1) //1: login, 2: reset psswd, 3: confirm code, 4: changepassword, 5: register
    const fromCheckout = useLocation().state?.from === 'checkout' || false

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <Box
            sx={{
                backgroundColor: "var(--primary-color)",
                color: "var(--secondary-color)",
            }}
            className='main-box'
        >
            {currentStep === 1 && <Login setStep={setCurrentStep} />}
            {currentStep === 2 && <ChangePassword setStep={setCurrentStep} currentStep={currentStep} />}
            {currentStep === 3 && <VerifyCode setStep={setCurrentStep} currentStep={currentStep} />}
            {currentStep === 4 && <UpdatePasswordForm setStep={setCurrentStep} currentStep={currentStep} />}
            {currentStep === 5 && <Register setStep={setCurrentStep} currentStep={currentStep}  />}
            {currentStep === 6 && <SuccessPasswordPage setStep={setCurrentStep} />}

        </Box>
    )
}

function Login({ setStep }) {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState()
    const handleTogglePassword = () => setShowPassword((prev) => !prev);
    const { login } = useAuth()
    const navigate = useNavigate()
    const fromCheckout = useLocation().state?.from === 'checkout' || false

    async function handleLogin() {
        try {
            const response = await axios_api.get(
                endpoints.create_user,
                {
                    email: data.email,
                    password: data.password
                },
            );

            return response.status;
        } catch (err) {
            console.error("API call failed:", err);
            return err.status || 500; 
        }
    }

    return (
        <Box
            className='content-box1'
        >
            <Box
                className='content-box2'
            >
                <Box className="title-box">
                    <Typography className="title">Inicio de sesión</Typography>
                </Box>

                <Box className="login-form">
                    <Box className='login-inner-box'>
                        <Typography className="login-label">Correo electrónico</Typography>
                        <TextField
                            fullWidth
                            placeholder="Ingresa tu correo electrónico"
                            onChange={(e) => {
                                setData((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }));
                            }}
                        />
                    </Box>

                    <Box className='login-inner-box'>
                        <Typography className="login-label">Contraseña</Typography>
                        <TextField
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Ingresa tu contraseña"
                            onChange={(e) => {
                                setData((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                }));
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Typography className="forgot-password" onClick={() => setStep(2)}>
                            ¿Olvidaste tu contraseña?
                        </Typography>

                        <Box className="login-button-box">
                            <DarkGreenButton text={'Iniciar sesión'} action={
                                () => {
                                    login({ name: 'yop', email: 'asdasd' })
                                    if (fromCheckout) {
                                        navigate('/identify-pet')
                                    } else {
                                        navigate('/dashboard')
                                    }
                                }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className="form-container">
                <Box className="no-account-section">
                    <Divider className="divider-flex" />
                    <Typography className="no-wrap-text noaccount">¿No tienes cuenta?</Typography>
                    <Divider className="divider-flex" />
                </Box>

                <Box className="button-section">
                    <Box className='button-box'>
                        <LightGreenButton text={'Regístrate'} action={() => setStep(5)} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function ChangePassword({ setStep, currentStep }) {
    return (
        <Box
            className='content-box1'
        >
            <Box
                className='content-box2'
            >
                <Box className="title-box">
                    <Typography className="title">
                        Recupera tu contraseña
                    </Typography>
                </Box>

                <Box className="recover-form-container">
                    <Box>
                        <Typography className="label-email">
                            Correo electrónico
                        </Typography>
                        <Typography className="email-description">
                            Ingresa tu correo electrónico para enviar un código de confirmación.
                        </Typography>
                        <TextField fullWidth placeholder="Correo electrónico" />
                    </Box>


                </Box>

            </Box>
            <Box className="buttons-container">
                <PreviousButton action={() => { setStep(currentStep - 1) }} />
                <NextButton action={() => { setStep(currentStep + 1) }} isSend={true} />
            </Box>
        </Box>
    )
}

function VerifyCode({ setStep, currentStep }) {
    const [code, setCode] = useState(['', '', '', '']);
    const inputsRef = useRef([]);
    const { enqueueSnackbar } = useSnackbar();

    const handleResendCode = () => {
        enqueueSnackbar('Código reenviado correctamente.', { variant: 'success' });
    };

    const handleChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 3) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    return (
        <Box
            className='content-box1'
        >
            <Box
                className='content-box2'
            >


                <Box className="verification-title-container">
                    <Typography className="title">
                        Verificación de código
                    </Typography>
                </Box>

                <Box className="verification-content">
                    <Box>
                        <Typography className="code-description">
                            Ingresa el código que fue enviado a tu correo para poder reestablecer tu contraseña.
                        </Typography>

                        <Box className="code-inputs">
                            {[0, 1, 2, 3].map((i) => (
                                <TextField
                                    key={i}
                                    inputRef={(el) => inputsRef.current[i] = el}
                                    value={code[i]}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    inputProps={{
                                        style: { textAlign: 'center', fontSize: '1rem' },
                                    }}
                                />
                            ))}
                        </Box>

                        <Typography className="resend-code" onClick={handleResendCode} >
                            ¿No recibiste el código? Click para reenviar
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Box className="buttons-container">
                    <PreviousButton action={() => { setStep(currentStep - 1) }} />
                    <NextButton action={() => { setStep(currentStep + 1) }} />
                </Box>
            </Box>
        </Box>
    )
}

function UpdatePasswordForm({ setStep, currentStep }) {
    const [passwords, setPasswords] = useState({})

    return (
        <Box
            className='content-box1'
        >
            <Box
                className='content-box2'
            >
                <Box className="title-box">
                    <Typography className="title">
                        Actualiza tu contraseña
                    </Typography>
                </Box>

                <Box className="update-password-form">
                    <Box>
                        <Box className="password-label-tooltip">
                            <Typography className="password-label">
                                Nueva contraseña
                            </Typography>
                            <Tooltip
                                title={
                                    <Box className="tooltip-content">
                                        La contraseña debe tener al menos:
                                        <ul>
                                            <li>8 caracteres</li>
                                            <li>1 mayúscula</li>
                                            <li>1 minúscula</li>
                                            <li>1 número</li>
                                        </ul>
                                    </Box>
                                }
                                arrow
                                placement="right"
                            >
                                <IconButton size="small" className="info-icon-button">
                                    <InfoOutlinedIcon fontSize="small" className="info-icon" />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <TextField
                            fullWidth
                            placeholder="Ingresa tu nueva contraseña"
                            onChange={(e) => {
                                setPasswords((prev) => ({ ...prev, password: e.target.value }));
                            }}
                        />
                    </Box>

                    <Box>
                        <Typography className="password-label">
                            Reescribe la nueva contraseña
                        </Typography>
                        <TextField
                            fullWidth
                            placeholder="Ingresa tu contraseña"
                            onChange={(e) => {
                                setPasswords((prev) => ({ ...prev, repeatedPassword: e.target.value }));
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            <Box className="buttons-container">
                <PreviousButton action={() => setStep(currentStep - 1)} />
                <NextButton isSend={false} text={"Cambiar"} action={() => setStep(6)} />
            </Box>
        </Box>
    )
}


function SuccessPasswordPage({ setStep, currentStep }) {
    return (
        <Box
            className='content-box1'
        >
            <Box
                className='content-box2'
            >
                <Box className="title-box">
                    <Typography className="title">
                        ¡Todo listo!
                    </Typography>
                </Box>

                <Box className="update-password-form">
                    <Box>
                        <Box className="password-label-tooltip">
                            <Typography className='success-message'>
                                ¡Tu contraseña ha sido cambiada con éxito! Serás redirigido al inicio de sesión para ingresar con tus nuevas credenciales.
                            </Typography>
                        </Box>
                    </Box>
                    <Box className="buttons-container">
                        <NextButton isSend={false} text={"Cambiar"} action={() => setStep(1)} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Register({ setStep, currentStep }) {
    const [formData, setFormData] = useState({
        firstNames: '',
        lastNames: '',
        idnumber: '',
        email: '',
        phone: '',
        city: '',
        password: '',
        repeatedpassword: '',
        address: ''
    })
    const isMobile = window.innerWidth <= 1000
    const navigate = useNavigate()
    const [formStep, setFormStep] = useState(0);
    const [errors, setErrors] = useState({})
    const [hasErrors, setHasErrors] = useState(false)
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const fromCheckout = useLocation().state?.from === 'checkout' || false
    const groupedFields = [
        ['idnumber', 'firstNames', 'lastNames', 'email', 'phone'],
        ['city', 'address'],
        ['password', 'repeatedpassword'],
    ]

    const registerFields = [
        {
            label: 'Nombres',
            placeholder: 'Maria Alejandra ',
            formData: 'firstNames',
            type: 'text'
        }, {
            label: 'Apellidos',
            placeholder: 'Lopez Hernandez',
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
            label: 'Ciudad',
            placeholder: 'Guayaquil',
            formData: 'city'
        },
        {
            label: 'Dirección',
            placeholder: 'Ej. Ceibos Norte Mz. 5 Villa 2',
            formData: 'address'
        },
        {
            label: 'Contraseña',
            placeholder: 'Ingrese su contraseña',
            formData: 'password'
        },
        {
            label: 'Repita su contraseña',
            placeholder: 'Ingrese nuevamente su contraseña',
            formData: 'repeatedpassword'
        },

    ]

    useEffect(() => {
        const hasErrors = Object.values(errors).some(error => error);
        setHasErrors(hasErrors)
    }, [errors])

    async function registerUser() {
        try {
            console.log("formData:", formData);

            const response = await axios_api.post(
                endpoints.create_user,
                {
                    cedula: formData.idnumber,
                    nombres: formData.firstNames,
                    apellidos: formData.lastNames,
                    password: formData.password,
                    email: formData.email,
                    celular: formData.phone,
                    direccion_facturacion: formData.address,

                },
            );
            console.log("response:", response);
            return response.status;
        } catch (err) {
            console.error("API call failed:", err);
            return err.status || 500; // Return 500 if no response status is available
        }
    }

    function verifyFields() {
        let hasErrors = false;
        const newErrors = {};

        Object.entries(formData).forEach(([key, value]) => {
            if (!value) {
                newErrors[key] = 'Este campo es necesario.';
                hasErrors = true;
            } else if (key === 'email' && !value.includes('@')) {
                newErrors[key] = 'Correo inválido.';
                hasErrors = true;
            } else if (key === 'idnumber' && value.length !== 10) {
                newErrors[key] = 'Cédula no válida.';
                hasErrors = true;
            } else if (key === 'phone' && value.length < 10) {
                newErrors[key] = 'Celular inválido.';
                hasErrors = true;
            } else if (key === 'password') {
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
            } else if (key === 'repeatedpassword' && formData.password !== value) {
                newErrors[key] = 'Las contraseñas no son iguales.';
                hasErrors = true;
            }
        });
        console.log('newerrors:', newErrors);
        setErrors(newErrors);
        return !hasErrors;
    }

    function verifyFieldsPhone(groupIndex) {
        setErrors({});
        let hasErrors = false;

        const group = groupedFields[groupIndex];

        for (let item of group) {
            const value = formData[item] || '';
            console.log("checking item:", item, "value:", formData[item]);

            if (!value) {
                setErrors(prev => ({
                    ...prev,
                    [item]: 'Este campo es necesario.',
                }));
                hasErrors = true;
                continue;
            }

            if (item === 'email' && !value.includes('@')) {
                setErrors(prev => ({
                    ...prev,
                    [item]: 'Correo inválido.',
                }));
                hasErrors = true;
            } else if (item === 'idnumber' && value.length !== 10) {
                setErrors(prev => ({
                    ...prev,
                    [item]: 'Cédula no válida.',
                }));
                hasErrors = true;
            } else if (item === 'phone' && value.length < 10) {
                setErrors(prev => ({
                    ...prev,
                    [item]: 'Celular inválido.',
                }));
                hasErrors = true;
            } else if (item === 'password') {
                const isLongEnough = value.length >= 8;
                const hasUppercase = /[A-Z]/.test(value);
                const hasLowercase = /[a-z]/.test(value);
                const hasNumber = /[0-9]/.test(value);

                let message = '';
                if (!isLongEnough) {
                    message = 'La contraseña debe tener al menos 8 caracteres.';
                } else if (!hasUppercase) {
                    message = 'La contraseña debe tener al menos una mayúscula.';
                } else if (!hasLowercase) {
                    message = 'La contraseña debe tener al menos una minúscula.';
                } else if (!hasNumber) {
                    message = 'La contraseña debe tener al menos un número.';
                }

                if (message) {
                    setErrors(prev => ({
                        ...prev,
                        [item]: message,
                    }));
                    hasErrors = true;
                }
            } else if (item === 'repeatedpassword' && value !== formData.password) {
                setErrors(prev => ({
                    ...prev,
                    [item]: 'Las contraseñas no son iguales.',
                }));
                hasErrors = true;
            } else if (item === 'city' && !value) {
                setErrors(prev => ({
                    ...prev,
                    [item]: 'Este campo es necesario.',
                }));
                hasErrors = true;
            }
        }
        return !hasErrors;
    }
    useEffect(() => {
        console.log(errors, formData)
    }, [formData, errors])

    return (
        <Box
            className='content-box1'
        >
            <Box
                className='content-box2'
            >
                <Box className="title-box">
                    <Typography className="title">Regístrate</Typography>
                </Box>

                {!isMobile &&
                    <Box
                        sx={{
                            paddingBottom: '1rem'
                        }}>
                        <YellowAlert message={'Recuerda que nuestros servcios son exclusivos para: Guayaquil, Chongón, Durán y Samborondón.'} />
                    </Box>
                }

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: '1fr 1fr',
                        },
                        gap: 1.5,
                    }}
                >

                    {isMobile
                        ? registerFields
                            .filter(field => groupedFields[formStep]?.includes(field.formData))
                            .map((field, i) => (
                                field.formData === 'city' ? (
                                    <>
                                        <YellowAlert message={'Recuerda que nuestros servcios son exclusivos para: Guayaquil, Chongón, Durán y Samborondón.'} />
                                        <DataSelect key={i} label="Ciudad" setData={setFormData} formLabel="city" value={formData.city} errorMessage={errors.city} />
                                    </>
                                ) : field.formData === 'password' ? (
                                    <PasswordLabelWithTooltip key={i} label={field.label} placeholder={field.placeholder} setData={setFormData} formLabel={field.formData} value={formData[field.formData]} errorMessage={errors.password} showTooltip={true} />
                                ) : field.formData === 'repeatedpassword' ? (
                                    <PasswordLabelWithTooltip key={i} label={field.label} placeholder={field.placeholder} setData={setFormData} formLabel={field.formData} value={formData[field.formData]} errorMessage={errors.repeatedpassword} />
                                ) : (
                                    <DataInput
                                        key={i}
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        setData={setFormData}
                                        formLabel={field.formData}
                                        isOnlyNumber={field.type === 'number'}
                                        value={formData[field.formData]}
                                        errorMessage={errors[field.formData]}
                                    />
                                )
                            ))
                        : registerFields.map((field, i) => (
                            field.formData === 'city' ? (
                                <DataSelect key={i} label={field.label} setData={setFormData} formLabel="city" value={formData.city} errorMessage={errors.city} />
                            ) : field.formData === 'password' ? (
                                <PasswordLabelWithTooltip key={i} label={field.label} placeholder={field.placeholder} setData={setFormData} formLabel={field.formData} value={formData[field.formData]} errorMessage={errors.password} showTooltip={true} />
                            ) : field.formData === 'repeatedpassword' ? (
                                <PasswordLabelWithTooltip key={i} label={field.label} placeholder={field.placeholder} setData={setFormData} formLabel={field.formData} errorMessage={errors.repeatedpassword} />
                            ) : (
                                <DataInput
                                    key={i}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    setData={setFormData}
                                    formLabel={field.formData}
                                    type={field.type}
                                    errorMessage={errors[field.formData]}
                                    value={formData[field.formData]}
                                />
                            )
                        ))}
                </Box>

                {isMobile && (
                    <Box mt={2} display="flex" justifyContent="space-between" gap="2rem">
                        <FaArrowLeft
                            size={25}
                            onClick={() => {
                                if (formStep > 0) {
                                    setFormStep(formStep - 1)
                                }
                            }}
                            sx={{ cursor: 'pointer' }}
                            color={formStep === 0 && '#ccc'}
                            disabled={formStep === 0} />
                        <FaArrowRight
                            sx={{ cursor: 'pointer' }}
                            size={25}
                            color={formStep === groupedFields.length - 1 && '#ccc'}
                            onClick={() => {
                                console.log(verifyFieldsPhone(formStep))
                                if (verifyFieldsPhone(formStep)) {
                                    if (formStep !== groupedFields.length - 1) {
                                        setFormStep(formStep + 1)
                                    }
                                }
                            }}
                        />
                    </Box>
                )}


            </Box>
            <Box className="buttons-container">
                <PreviousButton text="Regresar al inicio" isBrighter={true} action={() => { setStep(1) }} />
                <NextButton action={async () => {
                    let isValid = false
                    if (!isMobile) {
                        isValid = verifyFields()
                    } else {
                        isValid = verifyFieldsPhone(formStep)
                    }
                    console.log('isvalid:', isValid);
                    if (isValid) {
                        const response = await registerUser()
                        if (response === 201 || response === 200) {
                            navigate('/welcomePage')
                        } else {
                            setSnackbar({
                                open: true,
                                message: 'Hubo un error al registrar el usuario. Por favor, inténtalo de nuevo.',
                                severity: 'error'
                            })
                        }
                    }
                }}
                    disabled={isMobile && formStep !== groupedFields.length - 1} />
            </Box>
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
        </Box>
    )

}