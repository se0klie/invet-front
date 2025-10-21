import { Box, Button, Divider, Typography, Menu, MenuItem, IconButton } from "@mui/material"
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
    const [anchorEl, setAnchorEl] = useState(null);
    const [quantities, setQuantities] = useState({
        basic: 0,
        premium: 0,
        onsite: 0
    });

    const [latePrice, setLatePrice] = useState({
        subtotal: 0,
    })
    const location = useLocation()
    const open = Boolean(anchorEl);
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

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

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
                height: '100vh',
                bgcolor: 'background.default',
            }}
        >
            <Box
                component="section"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    boxSizing: 'border-box',
                    flexWrap: 'wrap',
                    flexGrow: 1,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: 'var(--secondary-color)',
                        flex: '1 1 400px',
                        p: 3,
                        color: 'text.primary',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 2,
                        height: '100%',
                    }}
                >
                    <Button variant="outlined" sx={{ alignSelf: 'flex-start', mb: isMobile ? '' : 'auto', color: 'white', borderColor: 'white', gap: 2 }}
                        onClick={() => { navigate('/ourService') }}>
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

                            <Box sx={{ background: 'var(--disabled-color)', px: 1, py: 0.5, my: 2, gridColumn: 'span 3' }}>
                                <Button
                                    id="fade-button"
                                    aria-controls={open ? 'fade-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                    sx={{ color: 'var(--dark-gray-hover-color)' }}
                                >
                                    + Añadir items
                                </Button>
                                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                                    <MenuItem>
                                        <Box sx={{ flexGrow: 1 }}>Plan básico</Box>
                                        <IconButton size="small" onClick={() => handleChange('basic', -1)}>
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <Typography sx={{ mx: 1 }}>{quantities.basic}</Typography>
                                        <IconButton size="small" onClick={() => handleChange('basic', 1)}>
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </MenuItem>

                                    <MenuItem>
                                        <Box sx={{ flexGrow: 1 }}>Plan premium</Box>
                                        <IconButton size="small" onClick={() => handleChange('premium', -1)}>
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <Typography sx={{ mx: 1 }}>{quantities.premium}</Typography>
                                        <IconButton size="small" onClick={() => handleChange('premium', 1)}>
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </MenuItem>

                                    <MenuItem>
                                        <Box sx={{ flexGrow: 1 }}>Plan Presencial</Box>
                                        <IconButton size="small" onClick={() => handleChange('onsite', -1)}>
                                            <RemoveIcon fontSize="small" />
                                        </IconButton>
                                        <Typography sx={{ mx: 1 }}>{quantities.onsite}</Typography>
                                        <IconButton size="small" onClick={() => handleChange('onsite', 1)}>
                                            <AddIcon fontSize="small" />
                                        </IconButton>
                                    </MenuItem>
                                </Menu>
                            </Box>
                            <Divider sx={{ gridColumn: 'span 3' }} />
                            <Typography sx={{ gridColumn: 'span 2', fontWeight: 600 }}>Precio final mensual</Typography>
                            <Typography>  ${latePrice.subtotal} </Typography>
                        </Box>
                    </Box>

                    {isMobile &&
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, width: '100%' }}>
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
                            height: '100%',
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

                        {localStorage.getItem('email')? (
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
                                <DarkGreenButton text="Continuar" action={() => {
                                    navigate('/login', { state: { from: 'checkout', plans: quantities} })
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