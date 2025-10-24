import React, { useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
export function PlanCard({ name, value, text, img, alt }) {
    const navigate = useNavigate()
    return (
        <Box sx={{ paddingTop: '4rem', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: { xs: '-40px', sm: '-50px', md: '-60px' },
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: { xs: 140, sm: 140, md: 180 },
                        height: { xs: 140, sm: 140, md: 180 },
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        boxShadow: 3,
                        backgroundColor: 'white',
                        zIndex: 2,
                    }}
                >

                    <Box
                        component="img"
                        src={`${import.meta.env.VITE_BASE_URL}/images/plan-${img}`}
                        alt={alt}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectPosition: 'top center',
                        }}
                    />
                </Box>
                <Card
                    sx={{
                        borderRadius: 4,
                        backgroundColor: "#f0f5ee",
                        mt: { xs: "2rem", sm: "3rem" },
                        pt: { xs: "3rem", sm: "4rem" },
                        height: { xs: "auto", sm: 360, md: 380 },
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                        <Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: { xs: 1.5, sm: 2 },
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        width: "50%",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Typography variant="h5" color="text.secondary" sx={{ mr: 1, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                                            Plan
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                color: "var(--darkgreen-color)",
                                                fontWeight: "bold",
                                                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
                                            }}
                                        >
                                            {name}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ height: 40, width: 2, backgroundColor: "grey.400" }} />
                                </Box>

                                <Typography
                                    variant="h4"
                                    sx={{
                                        color: "var(--darkgreen-color)",
                                        fontWeight: 600,
                                        fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.6rem" },
                                    }}
                                >
                                    ${value}
                                </Typography>
                            </Box>

                            <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{ mb: { xs: 1.5, sm: 2.5 }, fontSize: { xs: "0.8rem", sm: "0.95rem" }, lineHeight: 1.4 }}
                            >
                                {text}
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", justifyContent: "center", mt: "auto", pb: 1 }}>
                            <Button
                                variant="contained"
                                sx={{
                                    borderRadius: 2,
                                    backgroundColor: "var(--darkgreen-color)",
                                    color: "white",
                                    fontWeight: 600,
                                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                                    px: { xs: 2, sm: 3 },
                                    py: { xs: 0.8, sm: 1.2 },
                                }}
                                onClick={() => navigate("/servicios")}
                            >
                                Ver más
                            </Button>
                        </Box>
                    </CardContent>
                </Card>

            </Box>
        </Box>

    );
};
export function PlanCardServices({
    name,
    value,
    points,
    img,
    alt,
    buttonText = "Pagar ahora",
    isHighlight,
    action,
}) {
    return (
        <Box sx={{ paddingTop: '2rem', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ position: 'relative' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '-40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 150,
                        height: 150,
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        boxShadow: 3,
                        backgroundColor: 'white',
                        zIndex: 2,
                    }}
                >
                    <Box
                        component="img"
                        src={`${import.meta.env.VITE_BASE_URL}/images/${img}`}
                        alt={alt}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectPosition: 'top center',
                        }}
                    />
                </Box>

                <Card
                    sx={{
                        borderRadius: 4,
                        backgroundColor: isHighlight ? '#F0FCF8' : 'white',
                        mt: '3rem',
                        pt: '3.5rem',
                        minHeight: 420,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transform: isHighlight ? 'scale(1.03)' : '',
                        boxShadow: isHighlight ? 2 : 0,
                    }}
                >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 1 }}>
                        <Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 1.5,
                                    justifyContent: 'space-between',
                                }}
                            >
                                 <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        width: "50%",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Typography variant="h5" color="text.secondary" sx={{ mr: 1, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                                            Plan
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                color: "var(--darkgreen-color)",
                                                fontWeight: "bold",
                                                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
                                            }}
                                        >
                                            {name}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ height: 40, width: 2, backgroundColor: "grey.400" }} />
                                </Box>
                                <Typography variant="h5" sx={{ color: 'var(--darkgreen-color)', fontWeight: 600 }}>
                                    ${value}
                                </Typography>
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    borderRadius: 2,
                                    backgroundColor: isHighlight ? 'var(--darkgreen-color)' : 'var(--secondary-color)',
                                    color: 'white',
                                    fontWeight: 600,
                                    fontSize: '0.85rem',
                                    py: 0.8,
                                    mb: 1.5,
                                    '&:hover': {
                                        background: isHighlight ? 'var(--hoverdarkgreen-color)' : 'var(--darkgreen-color)',
                                    },
                                }}
                                onClick={action}
                            >
                                {buttonText}
                            </Button>

                            <List dense sx={{ py: 0 }}>
                                {points.map((item, index) => (
                                    <ListItem key={index} disablePadding sx={{ py: 0.25 }}>
                                        <ListItemText
                                            primary={`🐾 ${item}`}
                                            primaryTypographyProps={{ fontSize: '0.8rem', lineHeight: 1.2 }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}
