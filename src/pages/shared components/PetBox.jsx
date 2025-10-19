import { Box, Button, Typography, Modal, Select, MenuItem, Snackbar, Alert } from "@mui/material";
import { YellowAlert } from "./Alerts";
import { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { LightGreenButton } from "./Buttons";
import { CancelPlanModal, LoadingModal } from "./Modals";
import { TfiExchangeVertical } from "react-icons/tfi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import axios_api from "../axios";
import { endpoints } from "../endpoints.js";
import Cookies from "js-cookie";
import { FaCircle } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import { X } from 'lucide-react';
import { DataInput, DataSelect } from "./Inputs.jsx";

const plans = { 1: 'Básico', 2: 'Premium', 3: 'Presencial' }

export default function PetBox({ pets, pet, refreshDashboard, sub, subs }) {
    const [transferPlan, setTransferPlan] = useState(false)
    const [cancelPlan, setCancelPlan] = useState(false)
    const [selectedPet, setSelectedPet] = useState('')
    const [loadingModal, setLoadingModal] = useState(false)
    const [loadingModalStep, setLoadingModalStep] = useState(0)
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const [showEditPet, setShowEditPet] = useState(false)
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const planState = sub?.estado === 0 ? 'Activo' : sub?.estado === 1 ? 'Pagado' : sub?.estado === 2 ? 'Suspendido' : sub?.estado === 3 ? 'Cancelado' : 'Finalizado'
    const [editedPetData, setEditedPetData] = useState(pet || {})

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    async function handleCancelPlan() {
        setCancelPlan(false)
        setLoadingModal(true)
        try {
            const response = await axios_api.patch(
                endpoints.cancel_sub,
                {
                    subscripcion_id: sub.id
                }
            )
            refreshDashboard()
            if (response.status === 200) {
                setTimeout(() => {
                    setLoadingModalStep(1)
                    setTimeout(() => {
                        setLoadingModalStep(0)
                        setLoadingModal(false)
                    }, 2000);
                }, 3000);
            }
            return 200
        } catch (err) {
            console.error('/PATCH cancel subs: ', err)
            setTimeout(() => {
                setLoadingModalStep(-1)
                setTimeout(() => {
                    setLoadingModalStep(0)
                    setLoadingModal(false)
                }, 2000);
            }, 3000);
            return err;
        }
    }

    async function onExchangePlan() {
        setTransferPlan(false)
        setLoadingModal(true)
        try {
            const response = await axios_api.post(endpoints.exchange_plans,
                {
                    mascota_1_id: pet.id,
                    mascota_2_id: selectedPet.id
                }
            )
            if (response.status === 200) {
                refreshDashboard()
                setLoadingModalStep(1)
                setTimeout(() => {
                    setLoadingModal(false)
                    setLoadingModalStep(0)
                }, 2000);
            }
        } catch (err) {
            console.error('Error exchange /POST', err)
            return err
        }
    }

    useEffect(()=> {
        console.log(sub)
    }, [sub])
    async function handleEditPetData() {
        try {
            setShowEditPet(false)
            setLoadingModal(true)
            const response = await axios_api.patch(endpoints.modify_pet,
                {
                    mascota_id: editedPetData.id,
                    nombre: editedPetData.nombre,
                    raza: editedPetData.raza,
                    fecha_nacimiento: editedPetData.fecha_nacimiento
                }
            )
            if (response.status === 200 || response.status === 201) {
                refreshDashboard()
                setLoadingModalStep(1)
                setTimeout(() => {
                    setLoadingModal(false)
                    setLoadingModalStep(0)
                }, 2000);
            }
        } catch (err) {
            console.error(err)
            setLoadingModalStep(-1)
            setTimeout(() => {
                setLoadingModal(false)
                setLoadingModalStep(0)
            }, 2000);
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
                    src={pet?.url_foto || "./images/emptyicon_pet.jpg"}
                    alt={`Foto de ${pet?.nombre || ''}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Box>

            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'background 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                            background: 'rgba(231, 242, 220, 0.7)',
                        },
                    }}
                    onClick={() => {
                        setShowEditPet(true)
                        setEditedPetData(pet)
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'var(--darkgreen-color)',
                            fontWeight: 'bold',
                        }}
                    >
                        {pet?.nombre}
                    </Typography>
                    <Box
                        component={FaPencilAlt}

                        sx={{
                            color: 'var(--darkgreen-color)',
                            cursor: 'pointer',
                            transition: 'color 0.2s',
                            '&:hover': {
                                color: 'var(--hoverdarkgreen-color)',
                            },
                        }}
                    />
                </Box>


                <Box sx={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
                    {(!sub || sub?.estado === 3) ? (
                        <YellowAlert message={`${pet?.nombre} no tiene un plan asociado, ¡Contrata uno!`} fromDashboard={true} />
                    ) : (
                        <Box sx={{ my: 1, display: 'flex', flexDirection: 'column', gap: 0.5, opacity: pet?.subscripcion_id ? '100%' : '0', cursor: 'default' }}>
                            <Typography variant="body1" sx={{ color: 'gray' }}>
                                <strong>Plan: </strong>
                                <Typography component="span" sx={{ color: 'black' }}>
                                    {plans[sub?.plan_id] || ''}
                                </Typography>
                            </Typography>

                            <Typography variant="body1" sx={{ color: 'gray', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <strong>Estado del plan:</strong>
                                <FaCircle
                                    style={{
                                        color:
                                            sub?.estado <= 1
                                                ? 'green'
                                                : sub?.estado === 2
                                                    ? 'red'
                                                    : 'gray',
                                    }}
                                />
                                <Typography component="span" sx={{ color: 'black' }}>
                                    {planState || ''}
                                </Typography>
                            </Typography>
                        </Box>
                    )}
                </Box>

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
                    {pet?.subscripcion_id && sub?.estado <= 1 ? (
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
                    ) : pet?.fallecida === false ? (
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
                    ) :
                        <Typography>
                            Gracias por tu confianza. Este plan ha finalizado.
                        </Typography>}
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
                                    {plans[sub?.plan_id] || '-'}
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
                                                {plans[subs[selectedPet?.id]?.subscripcion?.plan_id] || 'Sin plan'}
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
                                                    .filter(petX => petX.nombre !== pet?.nombre && petX.fallecida === false)
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
                        {selectedPet && !selectedPet.subscripcion_id && (
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
            <CancelPlanModal open={cancelPlan} setOpen={setCancelPlan} petName={pet?.nombre} onCancel={handleCancelPlan} />
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
            <Modal open={showEditPet} onClose={() => setShowEditPet(false)}>
                <Box
                    component="form"
                    onSubmit={handleEditPetData}
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: isMobile ? '70%' : '40%',
                        bgcolor: "background.paper",
                        borderRadius: 3,
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h5" sx={{ fontWeight: 600, color: 'var(--darkgreen-color)' }}>{pet.nombre}</Typography>
                        <X onClick={() => setShowEditPet(false)} style={{ cursor: 'pointer' }} />
                    </Box>


                    <DataInput label='Nombre' isMandatory={false} value={editedPetData.nombre} formLabel='nombre' setData={setEditedPetData} />
                    <DataInput label='Raza' isMandatory={false} value={editedPetData.raza} formLabel='raza' setData={setEditedPetData} />
                    <DataInput label='Fecha de nacimiento' type='date' isMandatory={false} value={editedPetData.fecha_nacimiento} formLabel='fecha_nacimiento' setData={setEditedPetData} />
                    <DataSelect label='Ciudad' isMandatory={false} value={editedPetData.ciudad} formLabel='ciudad' setData={setEditedPetData} />


                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, alignItems: 'center' }}>
                        <Box sx={{ width: '40%' }}>
                            <LightGreenButton text="Guardar cambios" action={() => {
                                handleEditPetData()
                            }} />
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>

    )
}