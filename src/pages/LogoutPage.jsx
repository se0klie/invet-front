import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useAuth } from "../context/AuthContext";
export default function LogoutPage() {
    const {logout} = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        logout()
        Cookies.remove("authToken");
        localStorage.removeItem("email");
        localStorage.removeItem("cedula");
        localStorage.removeItem("nombre");
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate("/");
        }, 5000);

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
                src={`${import.meta.env.BASE_URL}/images/logout.png`}
                alt="Welcome illustration"
                sx={{
                    maxWidth: '300px',
                    height: 'auto',
                    mb: 4,
                }}
            />

            <Typography variant="h4" fontWeight={700}>
                ¡Hasta luego!
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: '500px', fontWeight: 600 }}>
                Has cerrado sesión
            </Typography>
        </Box>
    );
}
