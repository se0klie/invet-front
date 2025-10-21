import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/login"); 
        }, 3000); 

        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <Box
            sx={{
                backgroundColor: "var(--primary-color)",
                color: "var(--darkgreen-color)",
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
            }}
            className="main-box"
        >
            <Box
                component="img"
                src={`${import.meta.env.VITE_BASE_URL}/images/welcome-img.webp`}
                alt="Welcome illustration"
                sx={{
                    maxWidth: '300px',
                    height: 'auto',
                    mb: 4,
                }}
            />

            <Typography variant="h4" fontWeight={700} mb={2}>
                ¡Bienvenido a la plataforma!
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: '500px' }}>
                Estamos emocionados de tenerte aquí. Explora y gestiona todo lo que necesites para tu mascota.
            </Typography>
        </Box>
    );
}
