import { Box, Button, Typography } from "@mui/material";
import { YellowAlert } from "./Alerts";
export default function PetBox({ petName, status, plan }) {
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
                    sm: '80%',
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
                        <YellowAlert message={`${petName} no tiene un plan asociado, ¡Contrata uno!`} fromDashboard={true}/>
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
                            >
                                Transferir plan a otra mascota
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
        </Box>

    )
}