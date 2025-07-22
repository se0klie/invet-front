import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from "../../context/AuthContext"
import '../../style.css'
import './login.css'
import { Box, TextField, Typography, InputAdornment, IconButton, Button, Tooltip, Divider } from "@mui/material"
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { NextButton, PreviousButton, DarkGreenButton, GrayButton, LightGreenButton } from "../shared components/Buttons";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSnackbar } from 'notistack';
import { DataInput, DataSelect, PasswordLabelWithTooltip } from '../shared components/Inputs';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material'
import { YellowAlert } from '../shared components/Alerts';

export default function InitialState() {

    const [currentStep, setCurrentStep] = useState(1) //1: login, 2: reset psswd, 3: confirm code, 4: changepassword, 5: register
    const [disableRegister, setDisableRegister] = useState(true)
    const [registerFieldStatus, setRegisterFieldStatus] = useState({
        toValidate: false,
        validated: false
    })
    const navigate = useNavigate()

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))


    return (
        <Box
            sx={{
                backgroundColor: "var(--primary-color)",
                color: "var(--secondary-color)",
            }}
            className='main-box'
        >
            <Box
                className='content-box1'
            >
                <Box
                    className='content-box2'
                >
                    {currentStep === 1 && <Login setStep={setCurrentStep} />}
                    {currentStep === 2 && <ChangePassword setStep={setCurrentStep} currentStep={currentStep} />}
                    {currentStep === 3 && <VerifyCode setStep={setCurrentStep} currentStep={currentStep} />}
                    {currentStep === 4 && <UpdatePasswordForm setStep={setCurrentStep} currentStep={currentStep} />}
                    {currentStep === 5 && <Register setStep={setCurrentStep} currentStep={currentStep} setDisabled={setDisableRegister} validateFields={registerFieldStatus.toValidate} changeStatus={setRegisterFieldStatus} />}

                </Box>
                {currentStep === 1 &&
                    <Box className="form-container">
                        <Box className="no-account-section">
                            <Divider className="divider-flex" />
                            <Typography className="no-wrap-text noaccount">¿No tienes cuenta?</Typography>
                            <Divider className="divider-flex" />
                        </Box>

                        <Box className="button-section">
                            <Box className='button-box'>
                                <LightGreenButton text={'Regístrate'} action={() => setCurrentStep(5)} />
                            </Box>
                            <Typography className="no-wrap-text or-option">ó</Typography>
                            <Box className='button-box'>
                                <LightGreenButton text={'Ingresa con tu cédula/RUC'} />
                            </Box>
                        </Box>
                    </Box>
                }

                {currentStep === 5 && (disableRegister)
                    &&
                    <Box className="buttons-container">
                        <PreviousButton isBrighter={true} action={() => { setCurrentStep(1) }} />
                        <NextButton action={() => {
                            setRegisterFieldStatus((prev) => ({
                                ...prev,
                                toValidate: true
                            }))
                            if (registerFieldStatus.validated) {
                                navigate('/welcomePage')
                            }
                        }} disabled={!registerFieldStatus.validated} />
                    </Box>
                }
            </Box>

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

    return (
        <>
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
                        <DarkGreenButton text={'Iniciar sesión'} />
                    </Box>
                </Box>
            </Box>

        </>
    )
}

function ChangePassword({ setStep, currentStep }) {
    return (
        <>
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

                <Box className="buttons-container">
                    <PreviousButton action={() => { setStep(currentStep - 1) }} />
                    <NextButton action={() => { setStep(currentStep + 1) }} isSend={true} />
                </Box>
            </Box>

        </>
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
        <>
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

                <Box>
                    <Box className="buttons-container">
                        <PreviousButton action={() => { setStep(currentStep - 1) }} />
                        <NextButton action={() => { setStep(currentStep + 1) }} />
                    </Box>
                </Box>
            </Box>

        </>
    )
}

function UpdatePasswordForm({ setStep, currentStep }) {
    const [passwords, setPasswords] = useState({
        password: '',
        repeatedPassword: ''
    })

    return (
        <>
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
                        placeholder="Ingresa tu correo electrónico"
                        onChange={(e) => {
                            setPasswords((prev) => ({ ...prev, email: e.target.value }));
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
                            setPasswords((prev) => ({ ...prev, password: e.target.value }));
                        }}
                    />

                    <Box className="buttons-container">
                        <PreviousButton action={() => setStep(currentStep - 1)} />
                        <NextButton isSend={false} text={"Cambiar"} action={() => setStep(1)} />
                    </Box>
                </Box>
            </Box>

        </>
    )
}

function Register({ setStep, currentStep, setDisabled, validateFields, changeStatus }) {
    const [formData, setFormData] = useState({
        fullName: '',
        idnumber: '',
        email: '',
        phone: '',
        city: '',
        password: '',
        repeatedpassword: ''
    })
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [formStep, setFormStep] = useState(0);
    const [errors, setErrors] = useState({})
    const [hasErrors, setHasErrors] = useState(false)
    const groupedFields = [
        ['fullName', 'idnumber', 'phone'],
        ['city'],
        ['password', 'repeatedpassword'],
    ]

    const registerFields = [
        {
            label: 'Nombres completos',
            placeholder: 'Maria Alejandra Cortéz López',
            formData: 'fullName',
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
        if (isMobile) {
            setDisabled(false)
        }
    }, [])

    useEffect(() => {
        const hasErrors = Object.values(errors).some(error => error);
        setHasErrors(hasErrors)
    }, [errors])

    useEffect(() => {
        if (!isMobile && validateFields) {
            changeStatus(prev => ({ ...prev, toValidate: false }));
            const isValid = verifyFields();

            if (isValid) {
                changeStatus(prev => ({ ...prev, validated: true }));
            }
        } else if(isMobile && formStep === groupedFields.length - 1) {
            setDisabled(true)
            const isValid = verifyFieldsPhone(formStep);
            if (isValid) {
                changeStatus(prev => ({ ...prev, validated: true }));
            } else {
                changeStatus(prev => ({ ...prev, validated: false }));
            }
            
        }
    }, [formData, validateFields, formStep]);

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


    return (
        <>
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
                    gap: 2,
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
                                <PasswordLabelWithTooltip key={i} label={field.label} placeholder={field.placeholder} setData={setFormData} formLabel={field.formData} value={formData[field.formData]} errorMessage={errors.password} />
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
                            <DataSelect key={i} label="Ciudad" setData={setFormData} formLabel="city" value={formData.city} errorMessage={errors.city} />
                        ) : field.formData === 'password' ? (
                            <PasswordLabelWithTooltip key={i} label={field.label} placeholder={field.placeholder} setData={setFormData} formLabel={field.formData} value={formData[field.formData]} errorMessage={errors.password} />
                        ) : field.formData === 'repeatedpassword' ? (
                            <PasswordLabelWithTooltip key={i} label={field.label} placeholder={field.placeholder} setData={setFormData} formLabel={field.formData} errorMessage={errors.repeatedpassword} />
                        ) : (
                            <DataInput
                                key={i}
                                label={field.label}
                                placeholder={field.placeholder}
                                setData={setFormData}
                                formLabel={field.formData}
                                isOnlyNumber={field.type === 'number'}
                                errorMessage={errors[field.formData]}
                                value={formData[field.formData]}
                            />
                        )
                    ))}
            </Box>

            {isMobile && formStep < groupedFields.length - 1 && (
                <Box mt={2} display="flex" justifyContent="space-between" gap="3rem">
                    <PreviousButton
                        action={() => {
                            if (formStep === 0) {
                                setStep(1)
                            } else {
                                setFormStep(formStep - 1)
                            }
                        }} />
                    <NextButton
                        text={'Siguiente'}
                        action={() => {
                            if (verifyFieldsPhone(formStep)) {
                                if (formStep === groupedFields.length - 1) {
                                    navigate('/welcomePage')
                                } else {
                                    setFormStep(formStep + 1)
                                }
                            }
                        }}
                    />
                </Box>
            )}
        </>
    )

}