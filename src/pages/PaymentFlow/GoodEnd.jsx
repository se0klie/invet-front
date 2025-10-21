import { Box, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

export default function GoodEnd() {
    const navigate = useNavigate();
    const url = `https://wa.me/593999495379`;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/login");
        }, 5000);

        return () => clearTimeout(timeout);
    }, [navigate]);

    return (
        <Box
            sx={{
                backgroundColor: "var(--primary-color)",
                color: "var(--secondary-color)",
                height: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                py: 5,
            }}
        >

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
                    src={`${import.meta.env.VITE_BASE_URL}/images/endPay.png`}
                    alt="Welcome illustration"
                    sx={{
                        maxWidth: isMobile ? '150px' : '250px',
                        height: 'auto',
                        mb: 4,
                    }}
                />

                <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column', width: isMobile ? '90%' : '40%' }}>
                    <Typography variant="h6" sx={{ color: 'black' }}>
                        ¡Estamos redireccionándote a tu perfil! <br/>
                        Si no se muestra dentro de poco, podrás acceder a información de
                        tu suscripción <span style={{ fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/login')}>iniciando sesión</span>
                    </Typography>
                    <Box sx={{ backgroundColor: '#F8F8F8', display: 'flex', px: 3, py: 2, borderRadius: 3, gap: 2, alignItems: 'center', justifyContent: 'center', boxShadow: 1 }}>
                        <FaWhatsapp size={isMobile ? 70 : 30} />
                        <Typography sx={{ color: 'black', fontSize: '1.2rem' }}>¡Recuerda que si tienes alguna duda, estamos <span style={{ color: 'var(--darkgreen-color)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => window.open(url, '_blank')}>dispuestos a ayudarte</span>!</Typography>

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}