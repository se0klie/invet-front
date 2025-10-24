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
                            fontSize: { xs: '1.5rem', md: '2rem' }
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
                            fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1.1rem", lg: "1.2rem" },
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
                            fontSize: { xs: "0.4rem", sm: "0.6rem", md: "0.9rem", lg: "1rem" },

                        }}
                        onClick={() => { navigate('/servicios') }}
                    >
                        Nuestros servicios
                    </Button>
                </Container>
            </Box>
            <Section bgColor="var(--primary-color)">
                {/* Section Title */}
                <Box sx={{ py: { xs: 1, sm: 1.5, md: 2 } }}>
                    <Divider textAlign="center">
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 600,
                                color: "#1F4E43",
                                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem", lg: "1.3rem" },
                            }}
                        >
                            Planes de Cremación
                        </Typography>
                    </Divider>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: { xs: "column", md: "row" },
                        justifyContent: { xs: "flex-start", md: "space-between" },
                        flexWrap: "wrap",
                        gap: { xs: 1, md: 2 },
                    }}
                >
                    {planes.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: 1,
                                mx: { xs: 0, md: 1 },
                                minHeight: { xs: "auto", md: 400 }, // adjust desktop card height
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
                    minHeight: { xs: "300px", sm: "350px", md: "400px" }, // responsive height
                    backgroundImage: `url('${import.meta.env.VITE_BASE_URL}/images/bg-inicio-comentarios.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "flex-start",
                    color: "#fff",
                    py: { xs: 4, sm: 5, md: 6 },
                }}
            >
                <Container
                    disableGutters
                    maxWidth="lg"
                    sx={{
                        px: { xs: 2, sm: 3, md: 5 },
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: { xs: 3, md: 4 },
                    }}
                >
                    <Box textAlign="center">
                        <Typography
                            variant="h4"
                            sx={{
                                color: "white",
                                fontWeight: "bold",
                                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
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
                                maxWidth: { xs: "90%", sm: "400px" },
                                mx: "auto",
                                fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1.1rem" },
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
                                sm: "repeat(2, 1fr)", // optional: show 3 on larger screens
                                md: "repeat(2, 1fr)", // optional: show 3 on larger screens
                            },
                            gap: { xs: 2, sm: 3 },
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
                                    p: { xs: 1.5, sm: 2 },
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
                                        height: { xs: 50, sm: 60, md: 70 },
                                        width: { xs: 50, sm: 60, md: 70 },
                                        borderRadius: "50%",
                                        backgroundImage: `url(${import.meta.env.VITE_BASE_URL}/images/dog${index + 1}-opinion.jpg)`,
                                        backgroundColor: "pink",
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
                                                size={18} // optional: can make responsive too
                                                style={{ color: "#FFDD55", marginRight: 2 }}
                                            />
                                        ))}
                                    </Box>

                                    <Typography
                                        sx={{
                                            color: "text.primary",
                                            fontSize: { xs: "0.85rem", sm: "0.95rem", md: "1rem" },
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
                    background: "var(--primary-color)",
                    width: "100%",
                    minHeight: { xs: "300px", sm: "350px", md: "400px" },
                    display: "flex",
                    alignItems: "flex-start",
                    color: "#fff",
                    py: { xs: 4, sm: 5, md: 6 },
                }}
            >
                <Container
                    disableGutters
                    maxWidth="lg"
                    sx={{
                        px: { xs: 2, sm: 3, md: 5 },
                        mx: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: { xs: 3, md: 4 },
                    }}
                >
                    <Box textAlign="center">
                        <Typography
                            variant="h5"
                            sx={{
                                color: "var(--darkgreen-color)",
                                fontWeight: "bold",
                                fontSize: { xs: "1.2rem", sm: "1.4rem", md: "1.6rem" },
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
                                fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                                maxWidth: { xs: "90%", sm: "80%", md: "700px" },
                                mx: "auto",
                                lineHeight: 1.5,
                            }}
                        >
                            Un vistazo a los productos que ofrecemos en nuestros distintos planes para darte la mejor compañía posible.
                        </Typography>
                    </Box>
                    <Box sx={{ width: "100%", mt: { xs: 2, md: 4 } }}>
                        <ProductCarousel />
                    </Box>
                </Container>
            </Box>

        </Box>
    )
}