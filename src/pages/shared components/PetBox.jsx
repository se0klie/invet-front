import { Box, Button, Typography, Modal, Select, MenuItem } from "@mui/material";
import { YellowAlert } from "./Alerts";
import { useMediaQuery, useTheme } from '@mui/material'
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import { CancelButton, LightGreenButton } from "./Buttons";

export default function PetBox({ petName, status, plan, pets }) {
    const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));
    const [transferPlan, setTransferPlan] = useState(false)
    const [cancelPlan, setCancelPlan] = useState(false)
    const [selectedPet, setSelectedPet] = useState('')
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
                    xs: '85%',
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
                    alt={`Foto de ${petName}`}
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
                    {petName}
                </Typography>

                {plan ?
                    (
                        <Box sx={{ mb: 3, }}>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                <strong>Plan:</strong> {plan}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                <strong>Estado del plan:</strong> {status}
                            </Typography>
                        </Box>
                    ) : (
                        <YellowAlert message={`${petName} no tiene un plan asociado, ¡Contrata uno!`} fromDashboard={true} />
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
                    {plan ? (
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
                                {isMobile ? 'Transferir plan' : 'Transferir plan a otra mascota'}
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
                                fromDashboard={true}
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
                        >
                            Añadir plan
                        </Button>
                    )}
                </Box>
            </Box>
            <Modal
                open={transferPlan}
                onClose={() => setTransferPlan(false)}
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
                                Transferir plan
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                Esta acción transferirá el plan actual de {petName} a {selectedPet ? selectedPet.name : 'la mascota que desees'} manteniendo el monto y día de cobro mensual.
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
                            marginY: '1.5rem'
                        }}>
                        <Box
                            sx={{
                                display: 'flex', flexDirection: 'column', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '1rem', width: '90%'
                            }}>
                            <Box>
                                <Typography variant="h6" sx={{ color: 'var(--darkgreen-color)', fontWeight: 600, }}>
                                    {petName}
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
                                    {plan}
                                </Typography>
                            </Box>
                        </Box>
                        {isMobile ? (
                            <FaArrowDown size={16} style={{ color: 'var(--dark-gray-hover-color)' }} />
                        ) : (
                            <FaArrowRight size={60} style={{ color: 'var(--dark-gray-hover-color)' }} />
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
                                                {selectedPet.name || 'Mascota #2'}
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
                                            {selectedPet.name || 'Mascota #2'}
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
                                                    .filter(pet => pet.name !== petName)
                                                    .map((pet, index) => (
                                                        <MenuItem onClick={(e) => { setSelectedPet(pets[index]) }} key={index} value={pet}>{pet.name}</MenuItem>
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
                            display: 'grid',
                            gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
                            gap: '1rem',
                            alignItems: 'center'
                        }}>
                        <YellowAlert message={`${petName} no tendrá un plan asociado luego de esta acción.`} showIcon={false} />
                        <Box
                            sx={{ height: 'max-content' }}>
                            <LightGreenButton text='Transferir' />
                        </Box>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={cancelPlan}
                onClose={() => setCancelPlan(false)}
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
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'var(--error-color)' }}>
                                Cancelar plan
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'black' }}>
                                Se eliminará el plan asociado a <strong>{petName}</strong>, ¿deseas continuar?
                            </Typography>
                        </Box>

                        <RxCross1
                            style={{ color: 'black', cursor: 'pointer' }}
                            onClick={() => setCancelPlan(false)}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        gap: '1rem',
                        marginTop: '1rem'
                    }}>
                        <Button
                            sx={{
                                border: '0.15rem solid var(--dark-gray-color)',
                                color: 'var(--dark-gray-color)',
                                fontWeight: 600,
                                borderRadius: '0.5rem'
                            }}
                            onClick={()=> setCancelPlan(false)}
                        >
                            Cancelar
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: 'var(--error-fill-color)',
                                color: 'white',
                                fontWeight: 600,
                                paddingX: '2rem',
                                paddingY: '0.5rem',
                                borderRadius: '0.5rem'
                            }}>
                            Aceptar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>

    )
}