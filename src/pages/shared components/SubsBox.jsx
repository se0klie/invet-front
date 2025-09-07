import { useEffect, useState } from "react";
import { CancelButton, LightGreenButton } from "../../pages/shared components/Buttons";
import { Box, Button, Tooltip, Typography, Modal } from "@mui/material";
import { CancelPlanModal, LoadingModal } from "./Modals";
import { IoCardSharp } from "react-icons/io5";
import axios_api from "../axios";
import { endpoints } from "../endpoints";
import Cookies from 'js-cookie'
import { RxCross1 } from "react-icons/rx";

export default function SubsBox({ pet, subData, handleRefresh }) {
    const [price, setPrice] = useState('$11.00');
    const [planName, setPlan] = useState('Básico')
    const [nextPayDate, setNextPayDate] = useState("")
    const [cancelPlan, setCancelPlan] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)
    const [loadingModalStep, setLoadingModalStep] = useState(0)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [changePaymentMethod, setChangePaymentMethod] = useState(false)
    const [modalText, setModalText] = useState('Generando cambios...')
    const [selectedPlan, setSelectedPlan] = useState(-1)

    function getNextDateForDay() {
        const start_date = subData.fecha_inicio;
        const date = new Date(start_date + "T00:00:00");

        const parts = new Intl.DateTimeFormat("en-US", {
            timeZone: "America/New_York",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).formatToParts(date);

        const dd = parseInt(parts.find(p => p.type === "day").value, 10);

        const now = new Date();
        const year = now.getFullYear();
        let month = now.getMonth();

        if (dd <= now.getDate()) {
            month += 1;
        }

        const result = new Date(year, month, dd);

        const yyyy = result.getFullYear();
        const mm = String(result.getMonth() + 1).padStart(2, "0");

        return `${yyyy}-${mm}-${dd}`;
    }

    useEffect(() => {
        const plan = subData.plan_id
        switch (plan) {
            case 2:
                setPlan('Premium')
            case 3:
                setPlan('Presencial')
        }
    }, []);

    useEffect(() => {
        if (planName === 'Básico') {
            setPrice('$11.00');
        } else if (planName === 'Premium') {
            setPrice('$18.30');
        } else if (planName === 'Presencial') {
            setPrice('$24.15');
        }
    }, [planName])

    useEffect(() => {
        if (!nextPayDate) {
            const pay_date = getNextDateForDay()
            setNextPayDate(pay_date)
        }
    }, [subData])

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function openSocket() {
        const ws = new WebSocket("wss://backendinvet.com/ws/notifications/");
            ws.onopen = () => {
            const payload = {
                session_token: Cookies.get('authToken'),
                email: localStorage.getItem('email')
            };
            ws.send(JSON.stringify(payload));
        };
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data)
            if (data?.data?.url) {
                window.open(data.data.url, "_blank", "noopener,noreferrer");
            } else {
                if (data.authorizationCode) {
                    const card_data = data.cardToken;
                    handlePaymentMethodChange(card_data)
                    ws.close()
                }
            }
        };
        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
        setModalText('Esperando respuesta...')
        setChangePaymentMethod(false)
        setLoadingModal(true)
    }

    async function handlePaymentMethodChange(card) {
        try {
            const response = await axios_api.patch(endpoints.change_method,
                {
                    email: localStorage.getItem('email'),
                    subscripcion_id: subData.id,
                    token_tarjeta: card
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('authToken')}`
                    }
                }
            )
            if (response.status === 200) {
                handleRefresh()
                setTimeout(() => {
                    setLoadingModalStep(1)
                    setTimeout(() => {
                        setLoadingModal(false)
                        setLoadingModalStep(0)
                    }, 2500);
                }, 3000);
            }
        } catch (err) {
            console.error('Error in PATCH method', err);
            setTimeout(() => {
                setLoadingModalStep(-1)
                setTimeout(() => {
                    setLoadingModal(false)
                    setLoadingModalStep(0)
                }, 2500);
            }, 3000);
            return err
        }
    }

    async function onCancelPlan() {
        setCancelPlan(false)
        setLoadingModal(true)
        try {
            const response = await axios_api.patch(endpoints.cancel_sub, {
                email: localStorage.getItem('email'),
                subscripcion_id: selectedPlan
            }, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('authToken')}`
                }
            })
            if (response.status === 200) {
                setTimeout(() => {
                    setLoadingModalStep(1)
                    setTimeout(() => {
                        setLoadingModal(false)
                        setLoadingModalStep(0)
                    }, 2500);
                }, 3000);
            }
        } catch (err) {
            console.error('Error in PATCH cancel sub', err)
            setTimeout(() => {
                setLoadingModalStep(-1)
                setTimeout(() => {
                    setLoadingModal(false)
                    setLoadingModalStep(0)
                }, 2500);
            }, 3000);
            return err
        }
    }

    return (
        <Box
            sx={{ marginY: '1rem', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
                    {pet.nombre}
                </Typography>
                <Typography variant="body1" sx={{ color: 'black', fontWeight: 'bold' }}>
                    {price}
                    <Typography component="span" sx={{ color: '#A0A0A0', fontWeight: 'normal', marginLeft: '4px' }}>
                        /mes
                    </Typography>
                </Typography>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '0.5rem' }}>
                <Box sx={{ width: isMobile ? '40%' : '50%', display: 'flex', gap: '0.3rem' }}>
                    <CancelButton action={() => {
                        setSelectedPlan(subData.id)
                        setCancelPlan(true)
                    }
                    } text={`${isMobile ? 'Cancelar' : 'Cancelar plan'}`} />
                </Box>
                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#007780' }}>
                        Siguiente cobro:
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                        {nextPayDate}
                    </Typography>
                </Box>

                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#007780' }}>
                        Plan:
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                        {planName}
                    </Typography>
                </Box>

                <Box sx={{ paddingX: '0.3rem' }}>
                    <Tooltip title="Cambia tu método de pago" arrow>
                        <span>
                            <IoCardSharp
                                size={30}
                                style={{ color: 'var(--darkgreen-color)', cursor: 'pointer' }}
                                onClick={() => setChangePaymentMethod(true)}
                            />
                        </span>
                    </Tooltip>
                </Box>
            </Box>
            <CancelPlanModal
                open={cancelPlan}
                setOpen={setCancelPlan}
                petName={pet.nombre}
                onCancel={onCancelPlan}
            />

            <Modal
                open={changePaymentMethod}
                onClose={() => setChangePaymentMethod(false)}
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
                    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', gap: '1rem', textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'var(--darkgreen-color)' }}>
                                Cambiar método de pago
                            </Typography>
                            <RxCross1
                                style={{ color: 'black', cursor: 'pointer' }}
                                onClick={() => setChangePaymentMethod(false)}
                            />
                        </Box>
                        <Typography variant="body2" sx={{ color: 'gray', textAlign: 'left' }}>
                            Nosotros no almacenamos los datos de tu tarjeta, por lo que serás redirigido a un entorno seguro para cambiar tu método de pago. <strong>Por favor, no cierres esta ventana hasta terminar el proceso.</strong>
                        </Typography>
                        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', flexDirection: isMobile ? 'column' : "row" }}>
                            <Button
                                sx={{ color: 'white', minWidth: 120, background: 'var(--darkgreen-color)', fontWeight: 600, boxShadow: 0, cursor: 'pointer', px: '1rem' }}
                                onClick={() => openSocket()}
                            >
                                Cambiar método de pago
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <LoadingModal open={loadingModal} setOpen={setLoadingModal} text={modalText} modalStep={loadingModalStep} />
        </Box>
    )
}
