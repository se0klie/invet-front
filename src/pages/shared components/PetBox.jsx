import { Box, Button, Typography, Modal, Select, MenuItem, Snackbar, Alert } from "@mui/material";
import { YellowAlert } from "./Alerts";
import { useMediaQuery, useTheme } from '@mui/material'
import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { LightGreenButton } from "./Buttons";
import { CancelPlanModal, LoadingModal } from "./Modals";
import { TfiExchangeVertical } from "react-icons/tfi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import axios_api from "../axios";
import { endpoints } from "../endpoints";
import Cookies from "js-cookie";

export default function PetBox({ status = 'Activa', pets, pet, refreshDashboard }) {
    const [transferPlan, setTransferPlan] = useState(false)
    const [cancelPlan, setCancelPlan] = useState(false)
    const [selectedPet, setSelectedPet] = useState('')
    const [loadingModal, setLoadingModal] = useState(false)
    const [loadingModalStep, setLoadingModalStep] = useState(0)
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success', // "success" | "error" | "warning" | "info"
    });
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function onCancelPlan() {
        setCancelPlan(false)
        setLoadingModal(true)
        setTimeout(() => {
            setLoadingModalStep(1)
            setTimeout(() => {
                setLoadingModalStep(0)
                setLoadingModal(false)
            }, 2000);
        }, 3000);
    }

    async function onExchangePlan() {
        setTransferPlan(false)
        setLoadingModal(true)
        try {
            const response = await axios_api.post(endpoints.exchange_plans,
                {
                    email: localStorage.getItem('email'),
                    mascota_origen_id: pet.id,
                    mascota_destino_id: selectedPet.id
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('authToken')}`
                    }
                }
            )
            if (response.status === 201) {
                refreshDashboard()
                setTimeout(() => {
                    setLoadingModalStep(1)
                    setTimeout(() => {
                        setLoadingModal(false)
                        setLoadingModalStep(0)
                    }, 2000);
                }, 3000);
            }
        } catch (err) {
            console.error('Error exchange /POST', err)
            return err
        }
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                backgroundColor: 'white',
                padding: '1rem',
                borderRadius: '12px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                width: {
                    xs: '100%',
                    sm: '90%',
                    md: '40%',
                    lg: '30%',
                    xl: '30%',
                },
                height: '90%',
            }}
        >
            <Box
                sx={{
                    height: '200px',
                    width: '100%',
                    overflow: 'hidden',
                    backgroundColor: 'var(--disabled-color)',
                    borderRadius: '8px',
                    mb: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img
                    src="https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
                    alt={`Foto de ${pet?.nombre || ''}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>

            <Box sx={{ width: '100%' }}>
                <Typography
                    variant="h6"
                    sx={{
                        color: 'var(--darkgreen-color)',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        mb: 1,
                    }}
                >
                    {pet?.nombre}
                </Typography>

                {pet?.subscripcion ?
                    (
                        <Box sx={{ mb: 3, }}>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                <strong>Plan:</strong>
                                {pet?.subscripcion === 1 ? 'Básico' : pet?.subscripcion === 2 ? 'Premium' : pet?.subscripcion === 3 ? 'Presencial' : ''}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                <strong>Estado del plan:</strong> {status}
                            </Typography>
                        </Box>
                    ) : (
                        <YellowAlert message={`${pet?.nombre} no tiene un plan asociado, ¡Contrata uno!`} fromDashboard={true} />
                    )
                }

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        mt: 1,
                    }}
                >
                    {pet?.subscripcion ? (
                        <>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    backgroundColor: 'var(--secondary-color)',
                                    color: '#fff',
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    px: 2,
                                    py: 1.2,
                                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                    whiteSpace: 'nowrap',
                                    textAlign: 'center',
                                    '&:hover': {
                                        backgroundColor: 'var(--darkgreen-color)',
                                    },
                                }}
                                onClick={() => setTransferPlan(true)}
                            >
                                {isMobile ? 'Intercambiar plan' : 'Intercambiar plan con otra mascota'}
                            </Button>

                            <Button
                                fullWidth
                                sx={{
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    backgroundColor: 'var(--error-fill-color)',
                                    px: 2,
                                    py: 1.2,
                                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'var(--error-fill-hover-color)',
                                    },
                                }}
                                onClick={() => setCancelPlan(true)}
                            >
                                Cancelar plan
                            </Button></>
                    ) : (
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: 'var(--secondary-color)',
                                color: '#fff',
                                borderRadius: 2,
                                fontWeight: 600,
                                px: 2,
                                py: 1.2,
                                fontSize: { xs: '0.8rem', sm: '0.875rem' },
                                whiteSpace: 'nowrap',
                                textAlign: 'center',
                                '&:hover': {
                                    backgroundColor: 'var(--darkgreen-color)',
                                },
                            }}
                            onClick={() => { navigate('/ourService') }}
                        >
                            Añadir plan
                        </Button>
                    )}
                </Box>
            </Box>
            <Modal
                open={transferPlan}
                onClose={() => {
                    setTransferPlan(false)
                    setSelectedPet('')
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
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'var(--darkgreen-color)' }}>
                                Intercambiar plan
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                Esta acción intercambiará el plan actual de {pet?.nombre} a {selectedPet ? selectedPet.nombre : 'la mascota que desees'} manteniendo el monto y día de cobro mensual {selectedPet.plan && 'para cada plan'}.
                            </Typography>
                        </Box>

                        <RxCross1
                            style={{ color: 'black', cursor: 'pointer' }}
                            onClick={() => setTransferPlan(false)}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 2fr',
                            alignItems: 'center',
                            justifyItems: 'center',
                            marginY: '1.5rem',
                            gap: '0.8rem'
                        }}>
                        <Box
                            sx={{
                                display: 'flex', flexDirection: 'column', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '1rem', width: '90%'
                            }}>
                            <Box>
                                <Typography variant="h6" sx={{ color: 'var(--darkgreen-color)', fontWeight: 600, }}>
                                    {pet?.nombre}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-end'
                                }}>
                                <Typography variant="body2" sx={{ color: 'black' }}>
                                    Plan:
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'gray' }}>
                                    {pet?.subscripcion === 1 ? 'Básico' : pet?.subscripcion === 2 ? 'Premium' : pet?.subscripcion === 3 ? 'Presencial' : ''}
                                </Typography>
                            </Box>
                        </Box>
                        {isMobile ? (
                            <TfiExchangeVertical size={16} style={{ color: 'var(--dark-gray-hover-color)' }} />
                        ) : (
                            <LiaExchangeAltSolid size={60} style={{ color: 'var(--dark-gray-hover-color)' }} />
                        )}
                        <Box
                            sx={{
                                display: 'flex', flexDirection: 'column', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '1rem', width: '90%'
                            }}>
                            {selectedPet ?
                                (
                                    <Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="h6" sx={{ color: 'var(--darkgreen-color)', fontWeight: 600, }}>
                                                {selectedPet.nombre || 'Mascota #2'}
                                            </Typography>
                                            <RxCross1
                                                style={{ color: 'black', cursor: 'pointer' }}
                                                onClick={() => setSelectedPet('')}
                                            />
                                        </Box>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-end',
                                                justifyContent: 'center'
                                            }}>
                                            <Typography variant="body2" sx={{ color: 'black' }}>
                                                Plan:
                                            </Typography>
                                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                                {selectedPet.plan || 'Sin plan'}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box>
                                        <Typography variant="h6" sx={{ color: 'var(--darkgreen-color)', fontWeight: 600, }}>
                                            {selectedPet.nombre || 'Mascota #2'}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-end',
                                                justifyContent: 'center'
                                            }}>
                                            <Select
                                                fullWidth
                                                size="small"
                                                displayEmpty
                                                sx={{
                                                    '& .MuiInputBase-root': {
                                                        padding: '4px 8px',
                                                        fontSize: '0.875rem',
                                                    },
                                                }}
                                            >
                                                <MenuItem value="" disabled>Selecciona una mascota</MenuItem>
                                                {pets
                                                    .filter(petX => petX.nombre !== pet?.nombre)
                                                    .map((petX, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={petX}
                                                            onClick={() => setSelectedPet(petX)}
                                                        >
                                                            {petX.nombre}
                                                        </MenuItem>
                                                    ))}

                                            </Select>
                                        </Box>
                                    </Box>
                                )
                            }
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '1rem',
                            flexDirection: isMobile ? 'column' : 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            width: '100%'
                        }}
                    >
                        {selectedPet && !selectedPet.plan && (
                            <YellowAlert
                                message={`${pet?.nombre} no tendrá un plan asociado luego de esta acción.`}
                                showIcon={false}
                            />
                        )}

                        <Box
                            sx={{
                                width: isMobile ? '100%' : '40%',
                            }}
                        >
                            <LightGreenButton text="Transferir" action={() => {
                                if (selectedPet) {
                                    onExchangePlan()
                                } else {
                                    setSnackbar({
                                        open: true,
                                        message: 'Por favor, escoge una mascota antes de continuar.',
                                        severity: 'error'
                                    })
                                }
                            }} />
                        </Box>
                    </Box>
                </Box>
            </Modal>
            <CancelPlanModal open={cancelPlan} setOpen={setCancelPlan} petName={pet?.nombre} onCancel={onCancelPlan} />
            <LoadingModal open={loadingModal} setOpen={setLoadingModal} text="Generando cambios..." modalStep={loadingModalStep} />
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