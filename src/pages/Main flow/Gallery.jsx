import { Box, Typography } from "@mui/material"
import { ImageCarouselWithArrowsIn, ProductCarousel } from "../shared components/Carousel";
import { useEffect, useState } from "react";
export default function GalleryPage() {
    const gallery = Array.from({ length: 8 }, (_, i) => `gallery/gallery${i + 1}.png`);
    const vetPics = Array.from({ length: 4 }, (_, i) => `gallery/vetPic${i + 1}.png`);
    const planPics = Array.from({ length: 3 }, (_, i) => `gallery/plan${i + 1}.png`);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box
                component="section"
                sx={{
                    position: 'relative',
                    paddingY: 5,
                    background: 'var(--primary-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant={isMobile ? 'h5' : 'h4'}
                    sx={{ fontWeight: 600, color: 'var(--darkgreen-color)' }}
                >
                    Nuestra galería
                </Typography>

                <Box
                    sx={{
                        background: 'var(--secondary-color)',
                        paddingX: '2rem',
                        paddingY: '1rem',
                        borderRadius: 10,
                        zIndex: 10,
                        marginTop: '1rem'
                    }}
                >
                    <Typography
                        sx={{ color: 'white', fontWeight: 600, fontSize: '1.1rem', textWrap: 'nowrap' }}
                    >
                        Lugar de cremación
                    </Typography>
                </Box>

                {!isMobile ? (
                    <Box
                        sx={{
                            mt: 3,
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(3, 1fr)',
                                lg: 'repeat(4, 1fr)',
                            },
                            gap: 2,
                            width: '90%',
                            alignItems: 'center',
                            justifyContent: 'center',

                        }}
                    >
                        {Array.from({ length: 8 }, (_, i) => (
                            <Box
                                key={i}
                                sx={{
                                    width: '100%',
                                    aspectRatio: '4 / 3',
                                    borderRadius: 1,
                                    backgroundImage: `url(${import.meta.env.BASE_URL}/images/gallery/gallery${i + 1}.png)`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                        ))}
                    </Box>

                ) : (
                    <Box sx={{ paddingTop: 3, width: '90%' }}>
                        <ImageCarouselWithArrowsIn images={gallery} />
                    </Box>
                )}
            </Box>
            <Box
                component="section"
                sx={{
                    position: 'relative',
                    paddingY: 5,
                    background: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >

                <Box
                    sx={{
                        background: 'var(--secondary-color)',
                        paddingX: '2rem',
                        paddingY: '1rem',
                        borderRadius: 10,
                        zIndex: 10,
                    }}
                >
                    <Typography
                        sx={{ color: 'white', fontWeight: 600, fontSize: '1.1rem', textWrap: 'nowrap' }}
                    >
                        Nuestra veterinaria
                    </Typography>
                </Box>
                <Box sx={{ paddingTop: 5, width: '90%' }}>
                    <ImageCarouselWithArrowsIn images={vetPics} elementsToShow={2} />
                </Box>
            </Box>
            <Box
                component="section"
                sx={{
                    position: 'relative',
                    paddingY: 5,
                    px: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--primary-color)',
                }}
            >

                <Box
                    sx={{
                        background: 'var(--secondary-color)',
                        paddingX: '2rem',
                        paddingY: '1rem',
                        borderRadius: 10,
                    }}
                >
                    <Typography
                        sx={{ color: 'white', fontWeight: 600, fontSize: '1.1rem', textWrap: 'nowrap' }}
                    >
                        Nuestros planes
                    </Typography>

                </Box>
                <Typography sx={{ fontWeight: 600, marginTop: 2, marginX: 5 }}>
                    Cada foto representa un homenaje respetuoso y digno para quienes despidieron a sus seres queridos de cuatro patas. Conoce nuestras instalaciones, urnas personalizadas y detalles que hacen de este proceso un recuerdo lleno de amor y tranquilidad.
                </Typography>

                {isMobile ? (
                    <Box sx={{ paddingTop: 5, width: '90%' }}>
                        <ImageCarouselWithArrowsIn images={planPics} />
                    </Box>
                ) : (
                    <Box sx={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 2, width: '90%', paddingY: '1rem' }}>
                        {Array.from({ length: 3 }, (_, i) => (
                            <Box
                                key={i}
                                sx={{
                                    width: '100%',
                                    aspectRatio: '4 / 3',
                                    borderRadius: 1,
                                    backgroundImage: `url(${import.meta.env.BASE_URL}/images/gallery/plan${i + 1}.png)`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            />
                        ))}
                    </Box>)}

            </Box>
            <Box
                component="section"
                sx={{
                    position: 'relative',
                    paddingY: 5,
                    px: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--primary-color)',
                }}
            >

                <Box
                    sx={{
                        background: 'var(--secondary-color)',
                        paddingX: '2rem',
                        paddingY: '1rem',
                        borderRadius: 10,
                    }}
                >
                    <Typography
                        sx={{ color: 'white', fontWeight: 600, fontSize: '1.1rem', textWrap: 'nowrap' }}
                    >
                        Nuestros productos
                    </Typography>
                </Box>
                <Box sx={{ width: '90%' }}>
                    <ProductCarousel />
                </Box>
            </Box>
        </Box >
    );
}
