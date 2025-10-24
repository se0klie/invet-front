import { Box, Button, Divider, FormControlLabel, Checkbox, Typography, Menu, MenuItem, IconButton } from "@mui/material"
import { useState, useEffect } from "react"
import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { DarkGreenButton } from "../shared components/Buttons";
import { YellowAlert } from "../shared components/Alerts";


export default function PaymentPage() {
    const [bill, setBill] = useState({
        number: '0',
        items: { basic: { label: 'básico', subtext: '10 meses', quantity: 0, value: 11 }, premium: { label: 'premium', subtext: '12 meses', quantity: 0, value: 18.3 }, onsite: { label: 'presencial', subtext: '12 meses', quantity: 0, value: 24.15 } }
    })
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [quantities, setQuantities] = useState({
        basic: 0,
        premium: 0,
        onsite: 0
    });
    const [selectedFlags, setSelectedFlags] = useState({
        basic: false,
        premium: false,
        onsite: false,
    });

    const [latePrice, setLatePrice] = useState({
        subtotal: 0,
    })
    const location = useLocation()
    const navigate = useNavigate()
    const plan = location?.state?.plan;


    useEffect(() => {
        if (location?.state?.from === 'plan-assoc') {
            const newQuantities = Object.fromEntries(
                Object.entries(plan).map(([key, value]) => [key, value.quantity])
            );
            setQuantities(newQuantities);
        } else if (location?.state?.from === 'login') {
            const newQuantities = Object.fromEntries(
                Object.entries(plan).map(([key, value]) => [key, plan[key]])
            );
            setQuantities(newQuantities);
        } else {
            setQuantities({
                ...quantities,
                [plan.name]: quantities[plan.name] + 1
            });
        }
    }, [plan])

    useEffect(() => {
        const updatedBill = {
            ...bill,
            items: {
                ...bill.items,
                basic: { ...bill.items.basic, quantity: quantities.basic },
                premium: { ...bill.items.premium, quantity: quantities.premium },
                onsite: { ...bill.items.onsite, quantity: quantities.onsite }
            }
        };

        setBill(updatedBill);

        const totalToBill = Object.values(updatedBill.items).reduce(
            (sum, item) => sum + item.value.toFixed(2) * item.quantity,
            0
        );

        setLatePrice({
            subtotal: totalToBill.toFixed(2),
        });
    }, [quantities]);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleChange = (plan, delta) => {
        setQuantities((prev) => ({
            ...prev,
            [plan]: Math.max(prev[plan] + delta, 0),
        }));
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.default',
                minHeight: '100vh',
                overflowY: 'hidden',
            }}
        >
            <Box
                component="section"
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' }, // Stack on mobile, side by side on desktop
                    minHeight: '100vh',
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'var(--secondary-color)',
                        flex: '1 1 400px',
                        p: { xs: 2, sm: 3 },
                        color: 'text.primary',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: { xs: 1.5, sm: 2 },
                    }}
                >

                    <Button variant="outlined" sx={{ alignSelf: 'flex-start', mb: isMobile ? '' : 'auto', color: 'white', borderColor: 'white', gap: 2 }}
                        onClick={() => { navigate('/servicios') }}>
                        <IoIosArrowBack /> Regresar
                    </Button>

                    <Typography variant="h4" sx={{ fontWeight: '600', color: 'white' }}>
                        Detalles del pago
                    </Typography>

                    <Box
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: 2,
                            p: 3,
                            width: '80%',
                            boxShadow: 1,
                            color: 'text.primary',
                            mb: isMobile ? '' : 'auto'
                        }}
                    >
                        <Box sx={{ background: 'var(--disabled-color)', px: 2, py: 1, my: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray' }}>Planes seleccionados</Typography>
                                <Typography sx={{ fontWeight: 'bold', color: 'gray' }}># de mascotas</Typography>
                            </Box>
                            {['basic', 'premium', 'onsite'].map((plan) => (
                                <Box key={plan} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={quantities[plan]}
                                                onChange={(e) => {
                                                    const checked = e.target.checked;
                                                    setQuantities(prev => ({ ...prev, [plan]: checked ? 1 : 0 }));
                                                }}
                                                sx={{ color: 'var(--dark-gray-hover-color)' }}
                                            />
                                        }
                                        label={
                                            plan === 'basic'
                                                ? 'Plan básico'
                                                : plan === 'premium'
                                                    ? 'Plan premium'
                                                    : 'Plan presencial'
                                        }
                                    />
                                    {quantities[plan] > 0 && (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleChange(plan, -1)}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </IconButton>
                                            <Typography>{quantities[plan]}</Typography>
                                            <IconButton
                                                size="small"
                                                onClick={() => handleChange(plan, 1)}
                                            >
                                                <AddIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Box>
                            ))}
                        </Box>

                        <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                            Desglose de productos
                        </Typography>

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: '3fr 1fr',
                                gap: 2,
                                mb: 2,
                                fontWeight: '600',
                                pb: 1,
                            }}
                        >
                            <Typography sx={{ fontWeight: 600 }}>Item(s)</Typography>
                            <Typography sx={{ fontWeight: 600 }} textAlign="right">Precio</Typography>
                        </Box>

                        <Box sx={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: 1 }}>
                            {Object.entries(bill.items).filter(([_, item]) => item.quantity > 0).map(([index, item]) => (
                                <React.Fragment key={index}>
                                    <Box sx={{ gridColumn: 'span 2' }}>
                                        <Typography >Plan {item.label} (x{item.quantity})</Typography>
                                        <Typography sx={{ color: 'var(--dark-gray-color)' }}>(Precio mensual. Pago por {item.subtext})</Typography>
                                    </Box>
                                    <Typography sx={{ textAlign: 'right' }}>
                                        ${item.value * item.quantity}
                                    </Typography>
                                </React.Fragment>
                            ))}
                            <Divider sx={{ gridColumn: 'span 3' }} />
                            <Typography sx={{ gridColumn: 'span 2', fontWeight: 600 }}>Precio final mensual</Typography>
                            <Typography>  ${latePrice.subtotal} </Typography>
                        </Box>
                    </Box>

                    {isMobile &&
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, width: '100%', marginY: 'auto' }}>
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 600,
                                    color: 'black',
                                    textAlign: 'center',
                                }}
                            >
                                Asigne los planes a sus mascotas
                            </Typography>

                            {localStorage.getItem('email') ? (
                                <Box
                                    sx={{
                                        width: '50%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <DarkGreenButton text="Continuar" action={() => {
                                        navigate('/login', { state: { from: 'checkout', plans: quantities } })
                                    }} />
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        width: '50%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography sx={{ color: 'black', fontWeight: 600 }}>Para continuar</Typography>
                                    <DarkGreenButton text="Inicia sesión" action={() => {
                                        navigate('/login', { state: { from: 'checkout', plans: quantities } })
                                    }} />
                                    <Typography>o</Typography>
                                    <DarkGreenButton text="Regístrate" action={() => {
                                        navigate('/login', { state: { from: 'checkout', plans: quantities, step: 3 } })
                                    }} />
                                </Box>
                            )}
                        </Box>
                    }
                </Box>

                {!isMobile &&
                    <Box
                        component="section"
                        sx={{
                            backgroundColor: 'var(--primary-color)',
                            flex: '1 1 300px',
                            p: 3,
                            minWidth: 280,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                color: 'var(--hoverdarkgreen-color)',
                                textAlign: 'center',
                            }}
                        >
                            Asigne los planes a sus mascotas
                        </Typography>

                        {localStorage.getItem('email') ? (
                            <Box
                                sx={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 1,
                                    width: '40%'
                                }}
                            >
                                <DarkGreenButton 
                                text="Continuar" 
                                disabled={Object.values(quantities).reduce((accumulator, currentValue) => accumulator + currentValue, 0) < 1}
                                action={() => {
                                    navigate('/login', { state: { from: 'checkout', plans: quantities } })
                                }} />
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 1,
                                    width: '40%'
                                }}
                            >
                                <Typography sx={{ color: 'black', fontWeight: 600 }}>Para continuar</Typography>
                                <DarkGreenButton text="Inicia sesión" action={() => {
                                    navigate('/login', { state: { from: 'checkout', plans: quantities } })
                                }} />
                                <Typography>o</Typography>
                                <DarkGreenButton text="Regístrate" action={() => {
                                    navigate('/login', { state: { from: 'checkout', plans: quantities, step: 3 } })
                                }} />
                            </Box>
                        )}
                    </Box>

                }
            </Box>
        </Box >
    )
}