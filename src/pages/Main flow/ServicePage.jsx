import { Box, Typography, Button } from "@mui/material"
import { useState, useEffect } from "react";
import { FaPaw } from "react-icons/fa";
import { PlanCardServices } from "../shared components/PlanCard";
import { ProductCarousel } from "../shared components/Carousel";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
export default function ServicePage() {
    const navigate = useNavigate()
    const url = `https://wa.me/593999495379`;
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const inmediatePlans = [
        {
            name: 'Básico',
            value: 120,
            image: 'plan1-inmediato.png',
            points: [
                'Retiro de mascota en su domicilio',
                'Video prueba de cremación',
                'Entrega de cenizas a domicilio',
                'Entrega de urna de madera personalizada',
                'Placa metálica sublimada',
                'Jarro con imagen sublimada',
                'Carta de despedida',
                'Certificado de cremación, con autorización del Ministerio del Medio Ambiente'
            ],
            isHighlight: false,
        },
        {
            name: 'Premium',
            value: 230,
            image: 'plan2-inmediato.png',
            points: [
                'Retiro de mascota en su domicilio',
                'Video prueba de cremación',
                'Entrega de cenizas a domicilio',
                'Entrega de urna de cerámica personalizada',
                'Portarretrato con la imagen de tu mascota',
                'Jarro mágico con imagen sublimada',
                'Recuerdo en yeso de la huella de tu mascota',
                'Carta de despedida',
                'Certificado de cremación, con autorización del Ministerio del Medio Ambiente'
            ],
            isHighlight: true,
        },
        {
            name: 'Presencial',
            value: 300,
            image: 'plan3-inmediato.png',
            points: [
                'Acompañamiento presencial del propietario y un acompañante (No incluye movilización)',
                'Entrega de cenizas el mismo día (horas de la tarde)',
                'Entrega de urna de cerámica personalizada',
                'Portarretrato personalizado',
                'Jarro mágico con imagen sublimada',
                'Recuerdo en yeso de la huella de tu mascota',
                'Carta de despedida',
                'Certificado de cremación, con autorización del Ministerio del Medio Ambiente'
            ],
            isHighlight: false,
        }
    ]

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const preventivePlans = [
        {
            name: 'Básico',
            value: 11,
            months: 10,
            image: 'plan1-inmediato.png',
            points: [
                'Retiro de mascota en su domicilio',
                'Video prueba de cremación',
                'Entrega de cenizas a domicilio',
                'Entrega de urna de madera personalizada',
                'Placa metálica sublimada',
                'Jarro con imagen sublimada',
                'Carta de despedida',
                'Certificado de cremación, con autorización del Ministerio del Medio Ambiente',
                'Emergencia disponible los 365 días del año (con ciertas restricciones y condiciones)',
                'Este plan es transferible y aplica para todo tipo de mascotas'
            ],
            isHighlight: false,
        },
        {
            name: 'Premium',
            value: 18.30,
            months: 12,
            image: 'plan2-preventivo.png',
            points: [
                'Retiro de mascota en su domicilio',
                'Video prueba de cremación',
                'Entrega de cenizas a domicilio',
                'Entrega de urna de cerámica personalizada',
                'Portarretrato con la imagen de tu mascota',
                'Jarro mágico con imagen sublimada',
                'Recuerdo en yeso de la huella de tu mascota',
                'Carta de despedida',
                'Certificado de cremación, con autorización del Ministerio del Medio Ambiente',
                'Emergencia disponible los 365 días del año (con ciertas restricciones y condiciones)',
                'Este plan es transferible y aplica para todo tipo de mascotas'
            ],
            isHighlight: true,
        },
        {
            name: 'Presencial',
            value: 24.15,
            months: 12,
            image: 'plan3-inmediato.png',
            points: [
                'Acompañamiento presencial del propietario y un acompañante (No incluye movilización)',
                'Entrega de cenizas el mismo día (horas de la tarde)',
                'Entrega de urna de cerámica personalizada',
                'Portarretrato personalizado',
                'Jarro mágico con imagen sublimada',
                'Recuerdo en yeso de la huella de tu mascota',
                'Carta de despedida',
                'Certificado de cremación, con autorización del Ministerio del Medio Ambiente',
                'Emergencia disponible los 365 días del año (con ciertas restricciones y condiciones)',
                'Este plan es transferible y aplica para todo tipo de mascotas'
            ],
            isHighlight: false,
        }
    ]
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
                component="section"
                sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: '1fr 1fr',
                    alignItems: "center",
                    px: { xs: 2, md: 3 },
                    py: { xs: 4, md: 6 },
                    background: "linear-gradient(to right, #d9efe4, #dac8b8)",
                }}
            >
                <Box>
                    <Typography variant="h4" fontWeight="bold" color="var(--darkgreen-color)" mb={2}>
                        Planifica un adiós con <br />
                        <span style={{ color: 'var(--hoverdarkgreen-color)' }}>Invet</span>
                    </Typography>
                    <Typography color="black" fontSize="1rem" mb={4}>
                        En INVET, ofrecemos cremación personalizada con el máximo cuidado y respeto, asegurando un adiós digno y único para tu mascota.
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 4,
                    }}
                >
                    <Box
                        component="img"
                        src="/images/services/pet1-services.jpg"
                        alt="Perro"
                        sx={{
                            width: { xs: 200, md: 300 },
                            height: { xs: 380, md: 480 },
                            borderRadius: "50% / 30%",
                            objectFit: "cover",
                            boxShadow: 3,
                        }}
                    />
                    {!isMobile &&
                        <Box
                            component="img"
                            src="/images/services/cat1-services.jpg"
                            alt="Gato"
                            sx={{
                                width: { xs: 200, md: 250 },
                                height: { xs: 280, md: 380 },
                                borderRadius: "50% / 30%",
                                objectFit: "cover",
                                boxShadow: 3,
                            }}
                        />}

                </Box>
            </Box>
            <Box
                component="section"
                sx={{
                    position: "relative",
                    background: 'var(--primary-color)',
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingX: 3,
                    paddingY: '3rem',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <FaPaw size={isMobile ? 28 : 32} style={{ color: 'var(--hoverdarkgreen-color)' }} />
                    <Typography variant={isMobile ? 'h6' : 'h6'} sx={{ fontWeight: 600, color: 'var(--hoverdarkgreen-color)' }}>Planes inmediatos</Typography>
                </Box>
                <Typography sx={{ color: 'var(--hoverdarkgreen-color)' }}>
                    Solicítalos cuando tu mascota ya ha fallecido. Atención rápida y personalizada los 365 días del año.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        paddingY: '1rem',
                        justifyContent: isMobile ? 'flex-start' : 'space-between',
                        flexWrap: 'wrap',
                        width: '100%',
                        gap: 2,
                        alignItems: 'stretch',
                    }}
                >

                    {inmediatePlans.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <PlanCardServices
                                name={item.name}
                                points={item.points}
                                value={item.value}
                                isHighlight={item.isHighlight}
                                action={() => window.open('https://wa.me/593999495379', '_blank')}
                                img={`services/${item.image}`}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box
                component="section"
                sx={{
                    position: "relative",
                    background: '#F5F5F5',
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingX: 3,
                    paddingY: '3rem',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <FaPaw size={isMobile ? 28 : 32} style={{ color: 'var(--darkgreen-color)' }} />
                    <Typography variant={isMobile ? 'h6' : 'h6'} sx={{ fontWeight: 600, color: 'var(--darkgreen-color)' }}>Planes preventivos</Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        paddingY: '1rem',
                        justifyContent: isMobile ? 'flex-start' : 'space-between',
                        flexWrap: 'wrap',
                        width: '100%',
                        gap: 2,
                        alignItems: 'stretch',
                    }}
                >
                    <Typography sx={{ color: 'var(--hoverdarkgreen-color)' }}>Asegura la despedida digna de tu mascota con pagos mensuales accesibles. Estos planes están disponibles para todas las mascotas, sin importar su estado de salud, edad, peso o tamaño. Si la mascota fallece antes de cumplir 60 días de afiliación, se deberá cubrir la diferencia del plan inmediato correspondiente. Después de ese período, el servicio se brinda sin costos adicionales.</Typography>
                    {preventivePlans.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <PlanCardServices
                                name={item.name}
                                points={item.points}
                                value={item.value}
                                isHighlight={item.isHighlight}
                                img={`services/${item.image}`}
                                buttonText="Suscribirse"
                                action={() => navigate('/login', { state: { from: 'checkout' } })}
                            />
                        </Box>

                    ))}

                </Box>
            </Box>
            <Box
                component="section"
                sx={{
                    position: "relative",
                    background: '#ABDACA',
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingX: 3,
                    paddingY: '3rem',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <FaPaw size={32} style={{ color: 'var(--hoverdarkgreen-color)' }} />
                    <Typography variant="h5" sx={{ fontWeight: 600, color: 'var(--hoverdarkgreen-color)' }}>Nuestros productos</Typography>
                </Box>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography sx={{ fontWeight: 600 }}>Cada producto puedes encontrarlo en nuestros distintos planes</Typography>
                    <Box sx={{ width: '100%' }}>
                        <ProductCarousel />
                    </Box>
                </Box>
            </Box>
            <Box
                component="section"
                sx={{
                    position: "relative",
                    background: 'var(--primary-color)',
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        width: '100%',
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            minHeight: { xs: 200, md: 400 },
                            backgroundImage: "url('/images/services/doc-servicio.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: 2,
                        }}
                    />

                    <Box
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            p: { xs: 2, md: 4 },
                            color: 'white',
                        }}
                    >
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: 'black' }}>
                            +20 Años de <br /> <span style={{ color: 'var(--hoverdarkgreen-color)' }}>experiencia</span>
                        </Typography>
                        <Typography sx={{ mb: 3, color: 'black' }}>
                            Diplomado en anestesiología y cirugía de pequeñas especies
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                background: 'var(--secondary-color)',
                                fontWeight: 'bold',
                                width: '50%',
                                borderRadius: 5,
                                paddingY: 1.5,
                                '&:hover': {
                                    background: 'var(--darkgreen-color)'
                                }
                            }}
                            onClick={() => { navigate('/contact') }}
                        >
                            Contáctanos
                            <IoIosArrowForward size={20} />
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}