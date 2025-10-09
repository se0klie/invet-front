import { Box, Container, Typography, Button, Divider } from "@mui/material";
import Section from '../shared components/Section'
import { PlanCard } from "../shared components/PlanCard";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ProductCarousel } from '../shared components/Carousel'
import { useNavigate } from "react-router-dom";
export default function MainPage() {
    const planes = [
        {
            name: 'básico',
            value: 120,
            text: 'Recibe un servicio completo de cremación individual, que incluye la recogida de tu mascota, video del proceso y entrega de las cenizas en una urna personalizada con foto, placa y certificado. Todo con la dignidad y respeto que tu mascota merece.',
            img: 'basico-1.jpg'
        },
        {
            name: 'Premium',
            value: 230,
            text: 'Un servicio completo que incluye la recogida de tu mascota, video del proceso, y la entrega de las cenizas en una urna de porcelana personalizada, junto con un porta retrato, huellita de yeso, jarro mágico con imagen sublimada, carta de despedida y certificado de cremación. Todo con el mayor cuidado y respeto.',
            img: 'premium-1.png'

        },
        {
            name: 'Presencial',
            value: 300,
            text: 'Vive la despedida de tu mascota en persona, con la posibilidad de estar presente durante el proceso de cremación. Recibe las cenizas el mismo día en una urna de cerámica, junto con un porta retrato, huellita de yeso, jarro mágico y certificado de cremación. Una opción única para una despedida más cercana y emocional.',
            img: 'presencial-1.png'
        }
    ]

    const opinions = [
        {
            text: 'Muy buen servicio, rápido y con mucha empatía. Me explicaron todo con claridad y me sentí acompañado en todo el proceso. Los recomiendo sin dudar.',
            img: 'dog1-opinion.jpg'
        },
        {
            text: 'Excelente Atención! Muy buenos profesionales, comprometidos con su trabajo y muy empáticos. Tienen disponible el servicio de cremación.',
            img: ''
        },
        {
            text: 'Excelente experiencia, gracias por permitir tener aún a mi Ángel Perruna 🐶 🐕 🪽, excelente servicio, delicadeza y un buen trabajo y trato, mil gracias 🫂',
            img: ''
        },
        {
            text: 'Muy buen servicio, muy buen costo el de la cremacion; gracias por darnos la posibilidad de tener ese recuerdo de nuestra mascota.',
            img: ''
        },
    ]
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const navigate = useNavigate()
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Box
                component="section"
                sx={{
                    position: "relative",
                    width: "100%",
                    height: { xs: "300px", md: "500px" },
                    backgroundImage: `url('${import.meta.env.VITE_BASE_URL}/images/img-inicio.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    color: "#fff",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: "rgba(231, 242, 220, 0.15)"
                    }}
                />

                <Container
                    disableGutters
                    maxWidth={false}
                    sx={{ px: 5, mx: 0, }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: "bold",
                            color: "#104F57",
                        }}
                    >
                        Cremación de mascotas
                    </Typography>

                    <Typography
                        variant="subtitle1"
                        sx={{
                            mt: 1,
                            color: "white",
                            fontWeight: 600,
                            maxWidth: "400px",
                        }}
                    >
                        Despedir con amor es también una forma de agradecer.
                    </Typography>

                    <Button
                        variant="contained"
                        sx={{
                            mt: 3,
                            backgroundColor: "#2C7A7B",
                            textTransform: "none",
                            fontWeight: "bold",
                            borderRadius: "8px",
                            "&:hover": { backgroundColor: "#256d6d" },
                        }}
                        onClick={() => {navigate('/ourService')}}
                    >
                        Nuestros servicios
                    </Button>
                </Container>
            </Box>
            <Section bgColor='var(--primary-color)'>
                <Box
                    sx={{
                        paddingY: '1rem',
                    }}>
                    <Divider textAlign="center">
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 600, color: "#1F4E43" }}
                        >
                            Planes de Cremación
                        </Typography>
                    </Divider>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        paddingY: '1rem',
                        justifyContent: isMobile ? 'flex-start' : 'space-between',
                        flexWrap: 'wrap',
                        minWidth: '500',
                        gap: isMobile ? 0 : 2,
                    }}
                >
                    {planes.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: 1,
                                mx: isMobile ? 0 : 1,
                                height: '100%',
                            }}
                        >
                            <PlanCard {...item} />
                        </Box>
                    ))}
                </Box>
            </Section>
            <Box
                component="section"
                sx={{
                    position: "relative",
                    minHeight: { xs: "300px", md: "400px" },
                    backgroundImage: `url('${import.meta.env.VITE_BASE_URL}/images/bg-inicio-comentarios.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "flex-start",
                    color: "#fff",
                    py: { xs: 4, md: 6 },
                }}
            >
                <Container
                    disableGutters
                    maxWidth="lg"
                    sx={{
                        px: { xs: 2, md: 5 },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                    }}
                >
                    <Box textAlign="center">
                        <Typography
                            variant="h4"
                            sx={{
                                color: "white",
                                fontWeight: "bold",
                            }}
                        >
                            Estás en <strong>buena compañía</strong>
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            sx={{
                                mt: 1,
                                color: "white",
                                fontWeight: 600,
                                maxWidth: "400px",
                                mx: "auto",
                            }}
                        >
                            Testimonios de nuestros clientes
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, 1fr)",
                            },
                            gap: 3,
                        }}
                    >
                        {opinions.map((opinion, index) => (
                            <Box
                                key={index}
                                sx={{
                                    backgroundColor: "white",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 2,
                                    p: 2,
                                    borderRadius: 2,
                                    boxShadow: 1,
                                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: 3,
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        height: 60,
                                        width: 60,
                                        borderRadius: "50%",
                                        backgroundImage: `url(${import.meta.env.VITE_BASE_URL}/images/dog${index + 1}-opinion.jpg)`,
                                        backgroundColor: 'pink',
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        flexShrink: 0,
                                    }}
                                />

                                <Box sx={{ flex: 1 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                size={20}
                                                style={{ color: "#FFDD55" }}
                                            />
                                        ))}
                                    </Box>

                                    <Typography
                                        sx={{
                                            color: "text.primary",
                                            fontSize: "0.95rem",
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {opinion.text}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>
            <Box
                component="section"
                sx={{
                    position: "relative",
                    background: 'var(--primary-color)',
                    width: "100%",
                    minHeight: { xs: "300px", md: "400px" },
                    display: "flex",
                    alignItems: "flex-start",
                    color: "#fff",
                    py: { xs: 4, md: 6 },
                }}
            >
                <Container
                    disableGutters
                    maxWidth="lg"
                    sx={{
                        px: { xs: 2, md: 5 },
                        mx: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 4,
                    }}
                >
                    <Box textAlign="center">
                        <Typography
                            variant="h5"
                            sx={{
                                color: "var(--darkgreen-color)",
                                fontWeight: "bold",
                            }}
                        >
                            Nuestros productos
                        </Typography>

                        <Typography
                            variant="subtitle1"
                            sx={{
                                mt: 1,
                                color: "var(--blackinput-color)",
                                fontWeight: 600,
                                fontSize: '1rem'
                            }}
                        >
                            Un vistazo a los productos que ofrecemos en nuestros distintos planes para darte la mejor compañía posible.                        </Typography>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <ProductCarousel />
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}