import {
    Box,
    Typography,
    Link,
    useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { useState, useEffect } from "react";
export default function MainflowFooter() {
    const theme = useTheme();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#8CB5AA",
                px: 5,
                py: 3,
                position: "relative",
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(2,1fr)',
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    <Typography sx={{ fontWeight: 600, fontSize: '1.5rem', color: 'white' }}>Contáctanos</Typography>
                    <Typography sx={{ color: 'white' }}> Lunes a Domingo 6:30AM - 10:30PM </Typography>
                    <Typography sx={{ color: 'white' }}> Whatsapp: 0999495379 - 0991896990  </Typography>
                    <Typography sx={{ color: 'white' }}> Dirección: Matriz Coop. Quisquis Mz Y2  </Typography>
                </Box>


                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        alignItems: isMobile ? 'flex-end' : 'flex-end',
                        py: '1rem',
                        gap: 1,

                    }}
                >
                    <Typography sx={{ color: 'white' }}>
                        Correo:{' '}
                        <Link href="mailto:drchicaiza25@gmail.com" sx={{ color: 'white' }}>
                            drchicaiza25@gmail.com
                        </Link>
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: isMobile ? 1 : 2,
                            justifyContent: isMobile ? 'flex-end' : 'flex-start',
                        }}
                    >
                        <a
                            href="https://www.facebook.com/people/Invet-cremación-de-mascotas/61575194321265/?mibextid=wwXIfr&rdid=g9extWXt3QtGOV7b&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1EaH5ZwLrc%2F%3Fmibextid%3DwwXIfr"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'white' }}
                        >
                            <FaFacebook size={32} />
                        </a>

                        <a
                            href="https://www.instagram.com/invet_ec/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{color: 'white' }}
                        >
                            <FaInstagram size={32} />
                        </a>

                        <a
                            href="https://www.tiktok.com/@invet__"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'white' }}
                        >
                            <FaTiktok size={32} />
                        </a>
                    </Box>
                </Box>
            </Box>
            <Typography sx={{ mx: 'auto', textAlign: 'center', fontWeight: 600, color: 'white' }}>
                Todos los derechos reservados
            </Typography>
        </Box>
    );
}
