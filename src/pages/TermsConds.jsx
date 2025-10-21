import { Box, Typography, Checkbox, FormControl, Link, FormHelperText, Modal, Divider, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { useNavigate, useLocation, data } from "react-router-dom";
import Cookies from "js-cookie";
import axios_api from "./axios";
import { endpoints } from "./endpoints.js";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function TermsAndConds() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const location = useLocation()
    const data_received = location?.state?.pets_plans;
    const [openModal, setOpenModal] = useState(false)
    const [stepModal, setStepModal] = useState(0)
    const [canAccept, setCanAccept] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const termsRef = useRef(null);
    const navigate = useNavigate()
    const [paymentURL, setPaymentURL] = useState('')

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    async function handleSubscription(tarjeta_id) {
        try {
            for (const [plan, pet_id] of Object.entries(data_received)) {
                let plan_name = plan.split('-')[0]
                const response = await axios_api.post(
                    endpoints.create_sub,
                    {
                        plan_id: plan_name === "basic" ? 1 : plan_name === "premium" ? 2 : 3,
                        tarjeta_id: tarjeta_id,
                        mascota_id: pet_id
                    }
                );
            }

            setOpenModal(false);
            navigate('/good-end')
        } catch (err) {
            console.error("Error, subscription", err);
            setTimeout(() => {
                setStepModal(-1)
                setTimeout(() => {
                    setOpenModal(false)
                    setStepModal(0)
                }, 1000);
            }, 2000);
            return err;
        }
    }

    function openSocket(function_name) {
        const ws = new WebSocket("wss://api.cremacionesinvet.com/ws/notifications/");
        ws.onopen = () => {
            const payload = {
                function: function_name
            };
            ws.send(JSON.stringify(payload));
        };
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)

            if (function_name === "card_registration") {
                if (data?.function != "card_registration_callback") {
                    ws.close();
                    return;
                }
                if (data?.data?.url) {
                    setPaymentURL(data?.data?.url)
                    window.open(data.data.url, "_blank", "noopener,noreferrer");
                } else if (data?.id) {
                    const card_data = data.id;
                    handleSubscription(card_data)
                    ws.close()
                }
                else if (!data?.success) {
                    console.error("Error de Pagomedios:", data);
                    ws.close();
                }
            }
        };
        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
        ws.onclose = (e) => {
            console.warn("WebSocket closed:", e.code, e.reason);
        };
        setOpenModal(true)
    }

    useEffect(() => {
        const handleScroll = () => {
            const el = termsRef.current;
            if (el) {
                const scrolledToBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 1;
                if (scrolledToBottom) {
                    setCanAccept(true);
                }
            }
        };

        const el = termsRef.current;
        if (el) el.addEventListener("scroll", handleScroll);

        return () => {
            if (el) el.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Box
            sx={{
                backgroundColor: "var(--primary-color)",
                color: "var(--secondary-color)",
                minHeight: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                py: 5,
                px: 2
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'left',
                    alignItems: 'center',
                    width: '80%',
                    gap: 2,
                }}
            >
                <Typography
                    variant="h5"
                    sx={{
                        color: 'var(--darkgreen-color)',
                        fontWeight: 600,
                        textAlign: 'center'
                    }}
                >
                    Términos y condiciones
                </Typography>

                <Box sx={{ width: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'rgba(255, 249, 196, 0.8)',
                            color: '#FBC02D',
                            padding: '0.75rem 1rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(251, 192, 45, 0.4)',
                            textAlign: 'center',
                            mb: 1
                        }}
                    >
                        <Typography sx={{ fontWeight: 500 }}>
                            ¡Recuerda que nuestros servicios cubren únicamente <strong>Guayaquil, Samborondón, Durán y Chongón</strong>!
                        </Typography>
                    </Box>

                    <Typography
                        sx={{
                            color: 'black',
                            textAlign: 'left',
                        }}
                    >
                        Una vez completado este paso, se te redirigirá a registrar tu método de pago donde se harán <strong>dos cobros</strong>: de verificación (el cuál es <strong>reembolsado automáticamente</strong>) y el primer cobro de tu(s) plan/es.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        backgroundColor: "white",
                        p: 3,
                        pr: 0,
                        maxHeight: "50vh",
                        boxShadow: 1,
                        borderRadius: 2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1
                    }}
                >
                    <Box
                        ref={termsRef}
                        sx={{
                            flex: 1,
                            overflowY: "scroll",
                            pr: 1,
                            scrollbarWidth: "thin",
                            "&::-webkit-scrollbar": {
                                width: "8px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "rgba(0,0,0,0.4)",
                                borderRadius: "4px",
                            },
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'black', mb: 2 }}>
                            TÉRMINOS Y CONDICIONES – PLANES PREVENTIVOS DE CREMACIÓN DE MASCOTAS
                        </Typography>

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
                    <Divider style={{ color: 'gray', width: '97%' }} />
                    <Box>
                        <FormControl error={!canAccept}>
                            <Box display="flex" alignItems="center">
                                <Checkbox
                                    disabled={!canAccept}
                                    checked={accepted}
                                    onChange={(e) => setAccepted(e.target.checked)}
                                    sx={{
                                        "&.Mui-disabled": {
                                            color: "rgba(0, 0, 0, 0.26)",
                                            opacity: 0.5,
                                        },
                                    }}
                                />
                                <Typography sx={{ color: 'black' }}>Acepto los términos y condiciones</Typography>
                            </Box>

                            {!canAccept && (
                                <FormHelperText>Debes leer todo antes de continuar.</FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 2,
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{ minWidth: 120, borderColor: 'var(--dark-gray-hover-color)', color: 'var(--dark-gray-hover-color)' }}
                        onClick={() => {
                            navigate('/identify-pet', { state: { plans: location?.state?.back_info } })
                        }}
                    >
                        Regresar
                    </Button>
                    <Button
                        variant="contained"
                        disabled={!accepted}
                        sx={{ minWidth: 120, background: 'var(--darkgreen-color)', fontWeight: 600 }}
                        onClick={() => {
                            openSocket("card_registration")
                        }}
                    >
                        Registrar método de pago
                    </Button>
                </Box>
            </Box>

            <Modal
                open={openModal}
                onClose={(event, reason) => {
                    if (reason === "backdropClick") return;
                    setOpenModal(false);
                }}
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
                        width: { xs: '70%', md: 650, lg: 700 },
                    }}
                >
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Typography
                                variant="h5"
                                sx={{ fontWeight: "bold", color: "black" }}
                            >
                                Esperando OK para continuar... Por favor, no cierres esta ventana.
                            </Typography>

                            <Typography variant="body1" sx={{ color: "black" }}>
                                Si no se abre una pestaña nueva, haz click aquí:{" "}
                                {!paymentURL &&
                                    <Typography sx={{ color: 'var(--gray-color)', fontWeight: 600 }}>
                                        Cargando URL
                                    </Typography>
                                }
                                <Link href={paymentURL} target="_blank" rel="noopener noreferrer">
                                    {paymentURL}
                                </Link>
                            </Typography>
                        </Box>
                        <DotLottieReact
                            src="https://lottie.host/93f00827-07f6-4b9d-baa2-798cc4138b2c/v252HHvfL0.lottie"
                            loop
                            autoplay
                            style={{ width: 200 }}
                        />
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}