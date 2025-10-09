import { Box, Typography } from '@mui/material';

export default function EmptyPet() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box
                component="img"
                src={`${import.meta.env.VITE_BASE_URL}/images/Dog.png`}
                alt="Welcome illustration"
                sx={{
                    maxWidth: '200px',
                    height: 'auto',
                    mb: 4,
                }}
            />
            <Typography variant="body1" sx={{ color: 'var(--soft-black-color)', fontWeight: 'bold' }}>
                ¡Oh no! No tienes ninguna mascota registrada :( 
            </Typography>
            <Typography variant="body1" sx={{ color: 'var(--soft-black-color)', fontWeight: 'bold' }}>
                Añádela para poder visualizarla aquí.
            </Typography>
        </Box>
    )
}