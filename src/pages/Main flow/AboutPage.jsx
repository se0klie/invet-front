import { Box, Typography, Divider } from "@mui/material"
import { useEffect, useState } from "react";
import { MdOutlinePets } from "react-icons/md";
import { LuBone } from "react-icons/lu";

export default function AboutPage() {
    const [count, setCount] = useState(0);
    const pros = ['Servicio', 'Atención', 'Responsabilidad', 'Confiabilidad']
    useEffect(() => {
        const targetValue = 100;
        const interval = setInterval(() => {
            setCount((prev) => (prev < targetValue ? prev + 2 : targetValue));
        }, 50);

        return () => clearInterval(interval);
    }, []);


    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}>
            <Box
                component="section"
                sx={{
                    position: "relative",
                    background: 'var(--primary-color)',
                    paddingRight: 'auto',
                    height: { xs: "300x", md: "500px" },
                    width: '100%',
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    paddingX: 4,
                    paddingY: '3rem',
                    flexDirection: 'column'
                }}
            >
                <Typography variant="h4" mb={2} sx={{ color: 'var(--darkgreen-color)', fontWeight: 600 }}>
                    Nuestro inicio
                </Typography>
                <Box
                    sx={{
                        backgroundColor: 'white',
                        padding: 3,
                        borderRadius: 3,
                        boxShadow: 3,
                        zIndex: 1,
                        position: 'relative',
                    }}
                >
                    <Box sx={{ width: isMobile ? '90%' : '50%' }}>
                        <Typography color="black" sx={{ marginBottom: 2, fontSize: '1.1rem' }}>
                            En <span style={{ color: 'teal', fontWeight: 'bold', }}>Invet</span>, entendemos que las mascotas no son solo animales: son parte de la familia. Por eso, desde nuestra veterinaria laboral hasta el servicio de cremación, trabajamos con amor, respeto y dedicación en cada paso.
                        </Typography>

                        <Typography color="black" sx={{ fontSize: '1.1rem' }}>
                            Somos un equipo profesional con vocación por el cuidado animal, comprometidos a brindar una atención integral que acompañará tanto en la salud como en el último adiós. Nos enfocamos en ofrecer un espacio cálido y humano, donde cada familia se sienta escuchada y comprendida.
                        </Typography>
                    </Box>

                </Box>

                <Box
                    sx={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        height: { xs: 400, md: 600 },
                        aspectRatio: '4 / 3',
                        backgroundImage: `url(${import.meta.env.BASE_URL}/images/about/dog-about.png)`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right bottom",
                        zIndex: 10,
                        opacity: isMobile ? 0 : 100
                    }}
                />

            </Box>
            <Box
                component="section"
                sx={{
                    position: 'relative',
                    paddingY: 5,
                    paddingX: 4,
                    background: 'var(--secondary-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        display: isMobile ? 'grid' : 'flex',
                        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : '',
                        width: '100%',
                        gap: isMobile ? 2 : 0,
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    {Array.from({ length: 4 }, (_, i) => (
                        <Box
                            key={i}
                            sx={{
                                borderRadius: '10px',
                                textAlign: 'center',
                                color: 'white',
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {pros[i]}
                            </Typography>
                            <Box
                                sx={{
                                    fontSize: '2rem',
                                    fontFamily: 'sans-serif',
                                    backgroundColor: 'var(--darkgreen-color)',
                                    paddingX: isMobile ? '2rem' : '4rem',
                                    paddingY: '0.5rem',
                                    textWrap: 'nowrap',
                                    borderRadius: 2,
                                    fontWeight: 600
                                }}
                            >
                                {count} %
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
            <Box
                component="section"
                sx={{
                    paddingY: 5,
                    paddingX: 4,
                    background: 'var(--primary-color)',
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: 'stretch',
                    justifyContent: 'space-between',
                    gap: 3,
                }}
            >
                <Box
                    sx={{
                        background: 'white',
                        borderRadius: 2,
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            height: 60,
                            width: 60,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '100%',
                            border: '0.3rem solid var(--secondary-color)',
                        }}
                    >
                        <LuBone size={40} style={{ color: 'var(--secondary-color)' }} />
                    </Box>
                    <Box
                        sx={{
                            background: 'var(--primary-color)',
                            textWrap: 'nowrap',
                            paddingX: isMobile ? '4rem' : '8rem',
                            paddingY: 1,
                            borderRadius: 3,
                        }}
                    >
                        <Typography sx={{ fontWeight: 600 }}>Nuestra visión</Typography>
                    </Box>
                    <Typography textAlign="center">
                        Ser la empresa líder en servicios de despedida y cremación de mascotas en la región, reconocida por su respeto, empatía y compromiso con el bienestar emocional de las familias que atraviesan la pérdida de sus compañeros de vida.
                    </Typography>
                </Box>

                {!isMobile && (
                    <Box
                        sx={{
                            width: '2px',
                            backgroundColor: 'var(--darkgreen-color)',
                            borderRadius: 1,
                            height: 'auto',
                        }}
                    />
                )}

                <Box
                    sx={{
                        background: 'white',
                        borderRadius: 2,
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >
                    <Box
                        sx={{
                            height: 60,
                            width: 60,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '100%',
                            border: '0.3rem solid var(--secondary-color)',
                        }}
                    >
                        <MdOutlinePets size={40} style={{ color: 'var(--secondary-color)' }} />
                    </Box>
                    <Box
                        sx={{
                            background: 'var(--primary-color)',
                            textWrap: 'nowrap',
                            paddingX: isMobile ? '4rem' : '8rem',
                            paddingY: 1,
                            borderRadius: 3,
                        }}
                    >
                        <Typography sx={{ fontWeight: 600 }}> Nuestra misión</Typography>
                    </Box>
                    <Typography textAlign="center">
                        Brindar un servicio digno, cálido y profesional de cremación de mascotas, acompañando a las familias en el proceso de despedida con respeto, sensibilidad y amor, honrando el vínculo especial entre humanos y animales mediante soluciones personalizadas y éticas.
                    </Typography>
                </Box>
            </Box>

            <Box
                component="section"
                sx={{
                    paddingY: 5,
                    paddingX: 4,
                    background: 'var(--darkgreen-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Typography sx={{ fontWeight: 600, color: 'white', textAlign: 'center' }}>
                    En Invet, la cremación de tu mascota será un proceso seguro, respetuoso y lleno de amor, porque entendemos lo importante que fue para ti.
                </Typography>

                <Box sx={{ width: '100%', maxWidth: 700 }}>
                    <img
                        src={`${import.meta.env.BASE_URL}/images/about/doc-about.jpg`}
                        alt="About Invet"
                        style={{
                            width: '100%',
                            height: 'auto',
                            display: 'block',
                            borderRadius: 3,
                        }}
                    />
                </Box>
            </Box>

        </Box>
    )
}