import { Box, Typography, Grid, TextField, Button } from "@mui/material"
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoIosPin } from "react-icons/io";
import { useState, useEffect } from "react";
import { LoadingModal } from "../shared components/Modals";
import { DataInput } from "../shared components/Inputs";
import axios_api from '../axios'
import { endpoints } from "../endpoints.js";
export default function ContactPage() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [loadingModal, setLoadingModal] = useState(false)
    const [loadingModalStep, setLoadingModalStep] = useState(0)
    const [modalMessage, setModalMessage] = useState('Cargando...')
    const [contactForm, setContactForm] = useState({
        firstname: '',
        lastname: '',
        email: '',
        body: '',
        subject: ''
    })

    const contact = [
        {
            label: 'Mándanos un mensaje',
            text: '0999495379 - 0991896990',
            title: 'whatsapp'
        },
        {
            label: 'Mándanos un correo',
            text: 'drchicaiza25@gmail.com',
            title: 'email'
        },
        {
            label: '¿Dónde estamos?',
            text: 'Matriz Coop. Quisquis Mz Y2',
            title: 'ubi'
        }
    ]

    const contactFormLabels = [
        {
            label: 'Nombre',
            size: '1',
            formData: 'firstname'
        },
        {
            label: 'Apellido',
            size: 1,
            formData: 'lastname'
        },
        {
            label: 'Correo electrónico',
            size: 2,
            formData: 'email'
        },
        {
            label: 'Estoy interesado/a en...',
            size: 1,
            formData: 'subject'
        },
        {
            label: 'Mi consulta es...',
            size: 2,
            type: 'big',
            formData: 'body'
        },
    ]
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const sendContactEmail = async (data) => {
        setModalMessage('Enviando correo...')
        setLoadingModalStep(0)
        setLoadingModal(true)
        try {
            const response = await axios_api.post(endpoints.contact_email, data);
            if ([200, 201].includes(response.status)) {
                setTimeout(() => {
                    setLoadingModalStep(1);
                    setTimeout(() => {
                        setLoadingModal(false)
                        setLoadingModalStep(0)
                    }, 2000);
                }, 3000);
                setContactForm({
                    firstname: '',
                    lastname: '',
                    email: '',
                    body: '',
                    subject: ''
                })
            }
        } catch (err) {
            console.error('Error POST to /contact-email/', err);
            setTimeout(() => {
                setLoadingModalStep(-1);
                setTimeout(() => {
                    setLoadingModal(false)
                    setLoadingModalStep(0)
                }, 2000);
            }, 3000);
        }
    };


    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <LoadingModal text={modalMessage} modalStep={loadingModalStep} open={loadingModal} setOpen={setLoadingModal} />
            <Box
                component="section"
                sx={{
                    position: "relative",
                    background: 'var(--primary-color)',
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingX: 4,
                    paddingY: '3rem',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="h3" sx={{ fontWeight: 600, color: '#285D64', marginBottom: '1rem' }}><span style={{ color: 'teal', fontWeight: 'bold', }}>¿Dudas?</span> ¡Te ayudamos!</Typography>
            </Box>

            <Box
                component="section"
                sx={{
                    position: "relative",
                    background: "white",
                    display: "flex",
                    justifyContent: "center",
                    paddingY: isMobile ? 1 : "3rem",
                    px: 2,

                }}
            >
                <Box
                    sx={{
                        position: isMobile ? 'relative' : 'absolute',
                        top: { xs: -60, md: -40 },
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        flexWrap: "wrap",
                        justifyContent: "center",
                        alignItems: { xs: "stretch", md: "flex-start" },
                        gap: 4,
                        px: 2,
                        width: '100%',
                        maxWidth: '1000px',
                    }}
                >
                    {contact.map((item, i) => (
                        <Box
                            key={i}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                background: "white",
                                padding: 3,
                                borderRadius: 3,
                                boxShadow: 3,
                                minWidth: { xs: "100%", md: 220 },
                                maxWidth: { xs: "100%", md: 300 },
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                {item.title === "whatsapp" && (
                                    <FaWhatsapp size={25} color="var(--darkgreen-color)" />
                                )}
                                {item.title === "email" && (
                                    <MdEmail size={25} color="var(--darkgreen-color)" />
                                )}
                                {item.title === "ubi" && (
                                    <IoIosPin size={25} color="var(--darkgreen-color)" />
                                )}
                                <Typography
                                    sx={{ fontWeight: 600, color: "var(--darkgreen-color)" }}
                                >
                                    {item.label}
                                </Typography>
                            </Box>
                            <Typography>{item.text}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box
                component="section"
                sx={{
                    position: "relative",
                    background: "white",
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
                    gap: 2,
                    paddingBottom: 3,
                    px: 4,
                }}
            >
                <Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ background: 'var(--primary-color)', paddingX: 2, paddingY: 1, borderRadius: 3, borderBottomLeftRadius: 0 }}>
                            <Typography sx={{ color: 'var(--darkgreen-color)', fontWeight: 600 }}>Envíanos un correo</Typography>
                        </Box>
                        <Typography sx={{ fontWeight: 600 }}>¡Escríbenos tu duda y nos encargaremos de responderte lo antes posible!</Typography>
                    </Box>
                </Box>
                <Box
                    component="form"
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
                        width: '100%',
                        gap: 1
                    }}
                >
                    {contactFormLabels.map((field, i) => (
                        <Box
                            key={i}
                            sx={{
                                gridColumn: isMobile ? 'span 2' : field.size === 2 ? 'span 2' : 'span 1',
                            }}
                        >
                            <TextField
                                fullWidth
                                placeholder={field.label}
                                value={contactForm[field.formData]}
                                multiline={field.type === 'big'}
                                rows={field.type === 'big' ? 5 : 1}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        background: 'var(--primary-color)',
                                        '& fieldset': {
                                            borderColor: 'transparent',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'var(--darkgreen-color)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'var(--darkgreen-color)',
                                        },
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'var(--secondary-color)',
                                        opacity: 1,
                                        fontWeight: 600
                                    },
                                    '& .MuiInputBase-inputMultiline::placeholder': {
                                        color: 'var(--secondary-color)',
                                        opacity: 1,
                                    },
                                }}
                                onChange={(e) => {
                                    const value = e.target.value;

                                    setContactForm((prev) => ({
                                        ...prev,
                                        [field.formData]: value,
                                    }));
                                }}

                            />
                        </Box>
                    ))}
                    <Button
                        onClick={() => sendContactEmail(contactForm)}
                        sx={{
                            width: '100%',
                            gridColumn: 'span 2',
                            background: 'var(--darkgreen-color)',
                            fontWeight: 600,
                            color: 'white',
                            borderRadius: 3,
                            '&:hover': {
                                background: 'var(--hoverdarkgreen-color)'
                            }
                        }}>Enviar</Button>
                </Box>
            </Box>
        </Box>
    )
}