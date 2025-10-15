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
import { YellowAlert } from '../shared components/Alerts';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import axios_api from '../axios';
import { endpoints } from '../endpoints';
import Cookies from 'js-cookie';
import { loginHelper } from '../../helpers/login-helper';
import { ErrorModal } from '../shared components/Modals';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LoadingModal } from '../shared components/Modals';
export default function InitialState() {
    const location = useLocation()
    const [currentStep, setCurrentStep] = useState(location?.state?.step || 1) //1: login, 2: reset psswd, 3: confirm code, 4: changepassword, 5: register
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [userData, setUserData] = useState({})

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
            {currentStep === 4 && <VerifyCode setStep={setCurrentStep} currentStep={currentStep} formData={userData} />}
            {currentStep === 3 && <Register setStep={setCurrentStep} setUserData={setUserData} userData={userData} />}

        </Box>
    )
}

function Login({ setStep }) {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const location = useLocation()
    const [showPassword, setShowPassword] = useState()
    const handleTogglePassword = () => setShowPassword((prev) => !prev);
    const navigate = useNavigate()
    const [fromCheckout, setFromCheckout] = useState(location.state?.from === 'checkout' || false)
    const plans = location?.state?.plans
    const [openErrorModal, setOpenErrorModal] = useState(false)
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const { login, user } = useAuth()
    const [showLoadingModal, setShowLoadingModal] = useState(false)

    useEffect(() => {
        if (location.state?.from === 'checkout') {
            setFromCheckout(true)
        }
        if (user?.email || (localStorage.getItem('email') && localStorage.getItem('cedula') && Cookies.get('authToken'))) {
            if (fromCheckout) {
                navigate('/identify-pet', { state: { plans } })
            } else {
                navigate('/dashboard')
            }
        }
    }, [])

    async function handleLogin() {
        setShowLoadingModal(true)
        try {
            if (!data.email || !data.password) {
                setLoginErrorMessage('Se requieren el correo y contraseña para continuar')
                setOpenErrorModal(true)
                return;
            }
            const request = await loginHelper(data.email, data.password);
            if (request.response === true) {
                login({
                    nombre: request.data.nombres.split(' ')[0] + ' ' + request.data.apellidos.split(' ')[0],
                    email: data.email,
                    cedula: request.data.cedula
                })
                setShowLoadingModal(false)
                if (fromCheckout) {
                    navigate('/identify-pet', { state: { plans } })
                } else {
                    navigate('/dashboard')
                }
            } else {
                setShowLoadingModal(false)
                setLoginErrorMessage(request.message)
                setOpenErrorModal(true)
            }
        } catch (err) {
            setShowLoadingModal(false)
            console.error("API call failed:", err);
            return err.status || 500;
        }
    }

    return (
        <Box
            className='content-box1'
        >
            <Box sx={{ position: "absolute", top: 16, left: 16 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    variant="text"
                    color="secondary"
                    sx={{
                        fontWeight: 500,
                        textTransform: "none",
                        fontSize: "0.9rem",
                        "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                        },
                        color: 'var(--darkgreen-color)'
                    }}
                    onClick={() => {
                        if (fromCheckout) {
                            navigate('/payment', { state: { plan: plans, from: 'login' } })
                        } else {
                            navigate('/')
                        }
                    }}
                >
                    {fromCheckout ? 'Regresar a su factura' : 'Página principal'}
                </Button>
            </Box>
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
                                async () => {
                                    await handleLogin()
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
                        <LightGreenButton text={'Regístrate'} action={() => setStep(3)} />
                    </Box>
                </Box>
            </Box>
            <LoadingModal text={'Iniciando sesión...'} open={showLoadingModal} setOpen={setShowLoadingModal} modalStep={0} />
            <ErrorModal open={openErrorModal} onClose={() => setOpenErrorModal(false)} message={loginErrorMessage} />
        </Box>
    )
}

function ChangePassword({ setStep, currentStep }) {
    const [email, setEmail] = useState('')
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    async function sendEmail() {
        try {
            if (!email || !email.includes('@')) {
                setSnackbar({
                    open: true,
                    message: `Correo no válido.`,
                    severity: 'error'
                })
                return;
            }

            const response = await axios_api.post(endpoints.send_password_reset,
                {
                    email: email
                }
            )
            if (response.status === 200 || response.status === 201) {
                setSnackbar({
                    open: true,
                    message: `Correo enviado, revise su bandeja de entrada.`,
                    severity: 'success'
                })
                setTimeout(() => {
                    setStep(1);
                }, 3000);
            }
        } catch (err) {
            console.error('API POST ERROR, send-email-pswd', err)
            if (err.status === 404) {
                setSnackbar({
                    open: true,
                    message: `No existe una cuenta con ese correo.`,
                    severity: 'error'
                })
            }
            return err
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
                            Ingresa tu correo electrónico para enviar una contraseña temporal. Con esta, podrás iniciar sesión y luego cambiar tu contraseña.
                        </Typography>
                        <TextField fullWidth placeholder="Correo electrónico" onChange={(e) => { setEmail(e.target.value) }} />
                    </Box>
                </Box>

            </Box>
            <Box className="buttons-container">
                <PreviousButton action={() => { setStep(currentStep - 1) }} />
                <NextButton action={async () => { await sendEmail() }} isSend={true} />
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

function VerifyCode({ setStep, formData }) {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputsRef = useRef([]);
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation()
    const plans = location?.state?.plans
    const navigate = useNavigate()
    const [counter, setCounter] = useState(50);
    const [canResend, setCanResend] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    useEffect(() => {
        if (counter === 0) {
            setCanResend(true);
            return;
        }

        const timer = setInterval(() => {
            setCounter(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [counter]);

    const handleResendCode = () => {
        if (canResend) {
            setCounter(50);
            setCanResend(false);
            setSnackbar({
                open: true,
                message: `Código enviado. Revise la bandeja de entrada de su correo.`,
                severity: 'success'
            })
            resend()
        } else {
            setSnackbar({
                open: true,
                message: `Espere un momento para reenviar el código. Quedan ${counter} segundos`,
                severity: 'error'
            })
        }
    };
    const [fromCheckout, setFromCheckout] = useState(location?.state?.from === 'checkout' || false)
    const { login } = useAuth()

    useEffect(() => {
        if (location.state?.from === 'checkout') {
            setFromCheckout(true)
        }
    }, [])

    async function resend() {
        try {
            await axios_api.post(endpoints.send_email,
                {
                    email: formData.email
                }``
            )
        } catch (err) {
            console.error('Error resend POST', err)
            return err
        }
    }
    async function handleRegister() {
        try {
            const response = await axios_api.post(
                endpoints.create_user,
                {
                    cedula: formData.idnumber,
                    nombres: formData.firstNames
                        .toLowerCase()
                        .split(" ")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" "),
                    apellidos: formData.lastNames
                        .toLowerCase()
                        .split(" ")
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(" "),
                    password: formData.password,
                    email: formData.email,
                    celular: formData.phone,
                    direccion_facturacion: formData.address,
                    verification_code: String(code.join(''))
                },
            );
            if (response.status === 201 || response.status === 200) {
                if (fromCheckout) {
                    const request = await loginHelper(formData.email, formData.password);

                    if (request.response) {
                        login({
                            nombre: request.data.nombres.split(' ')[0] + ' ' + request.data.apellidos.split(' ')[0],
                            email: request.data.email,
                            cedula: request.data.cedula
                        })
                        navigate('/identify-pet', { state: { plans } })
                    }
                } else {
                    navigate('/welcomePage')
                }
            }
            return true;
        } catch (err) {
            console.error(err)
            if (err.status === 422) {
                setSnackbar({
                    open: true,
                    message: `Código incorrecto, por favor verifica e intenta nuevamente.`,
                    severity: 'error'
                })
            } else {
                setSnackbar({
                    open: true,
                    message: `Hubo un error en su registro, intente más tarde.`,
                    severity: 'error'
                })
            }

            console.error('API CALL failed, /post register', err)
            return err
        }
    }

    const handleChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
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
                            Ingresa el código que fue enviado a tu correo para poder verificar tu cuenta.
                        </Typography>

                        <Box className="code-inputs">
                            {[0, 1, 2, 3, 4, 5].map((i) => (
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
                    <PreviousButton action={() => {
                        setStep(3)
                    }} />
                    <NextButton action={async () => {
                        await handleRegister()
                    }} />
                </Box>
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

function Register({ setStep, setUserData, userData }) {
    const [formData, setFormData] = useState({
        firstNames: userData.firstNames || '',
        lastNames: userData.lastNames || '',
        idnumber: userData.idnumber || '',
        email: userData.email || '',
        phone: userData.phone || '',
        city: userData.city || '',
        password: userData.password || '',
        repeatedpassword: userData.repeatedpassword || '',
        address: userData.address || '',
    })
    const isMobile = window.innerWidth <= 1000
    const [formStep, setFormStep] = useState(0);
    const [errors, setErrors] = useState({})
    const [hasErrors, setHasErrors] = useState(false)
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

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
                    newErrors[key] = 'Incluye al menos 8 caracteres.';
                    hasErrors = true;
                } else if (!hasUppercase) {
                    newErrors[key] = 'Incluye al menos una mayúscula.';
                    hasErrors = true;
                } else if (!hasLowercase) {
                    newErrors[key] = 'Incluye al menos una minúscula.';
                    hasErrors = true;
                } else if (!hasNumber) {
                    newErrors[key] = 'Incluye al menos un número.';
                    hasErrors = true;
                }
            } else if (key === 'repeatedpassword' && formData.password !== value) {
                newErrors[key] = 'Las contraseñas no son iguales.';
                hasErrors = true;
            }
        });
        setErrors(newErrors);
        return !hasErrors;
    }

    function verifyFieldsPhone(groupIndex) {
        setErrors({});
        let hasErrors = false;

        const group = groupedFields[groupIndex];

        for (let item of group) {
            const value = formData[item] || '';
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
            } else if (item === 'phone' && value.length !== 10) {
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
                    message = 'Incluye al menos 8 caracteres.';
                } else if (!hasUppercase) {
                    message = 'Incluye al menos una mayúscula.';
                } else if (!hasLowercase) {
                    message = 'Incluye al menos una minúscula.';
                } else if (!hasNumber) {
                    message = 'Incluye al menos un número.';
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

    async function handleSendEmail() {
        try {
            const email = await axios_api.post(endpoints.send_email,
                {
                    email: formData.email
                }
            )
        } catch (err) {
            console.error("API call failed:", err);
            return err
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
                    {(isMobile
                        ? registerFields.filter(field => groupedFields[formStep]?.includes(field.formData))
                        : registerFields
                    ).map((field, i) => {
                        let InputComponent;
                        if (field.formData === 'city') {
                            InputComponent = (
                                <Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                    {isMobile && <YellowAlert message={'Recuerda que nuestros servicios son exclusivos para: Guayaquil, Chongón, Durán y Samborondón.'} />}
                                    <DataSelect
                                        key={i}
                                        label="Ciudad"
                                        setData={setFormData}
                                        formLabel="city"
                                        value={formData.city}
                                    />
                                    {errors.city && (
                                        <Typography variant="caption" color="error">
                                            {errors.city}
                                        </Typography>
                                    )}
                                </Box>
                            );
                        } else if (field.formData === 'password') {
                            InputComponent = (
                                <Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                    <PasswordLabelWithTooltip
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        setData={setFormData}
                                        formLabel={field.formData}
                                        value={formData[field.formData]}
                                        showTooltip={true}
                                    />
                                    {errors.password && (
                                        <Typography variant="caption" color="error">
                                            {errors.password}
                                        </Typography>
                                    )}
                                </Box>
                            );
                        } else if (field.formData === 'repeatedpassword') {
                            InputComponent = (
                                <Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                    <PasswordLabelWithTooltip
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        setData={setFormData}
                                        formLabel={field.formData}
                                        value={formData[field.formData]}
                                    />
                                    {errors.repeatedpassword && (
                                        <Typography variant="caption" color="error">
                                            {errors.repeatedpassword}
                                        </Typography>
                                    )}
                                </Box>
                            );
                        } else {
                            InputComponent = (
                                <Box key={i} sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                    <DataInput
                                        label={field.label}
                                        placeholder={field.placeholder}
                                        setData={setFormData}
                                        formLabel={field.formData}
                                        isOnlyNumber={field.type === 'number'}
                                        value={formData[field.formData]}
                                        type={field.type}
                                    />
                                    {errors[field.formData] && (
                                        <Typography variant="caption" color="error">
                                            {errors[field.formData]}
                                        </Typography>
                                    )}
                                </Box>
                            );
                        }

                        return InputComponent;
                    })}
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
                    if (isValid) {
                        setUserData(formData)
                        handleSendEmail()
                        setStep(4)
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