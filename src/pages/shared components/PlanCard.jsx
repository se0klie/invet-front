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
                        top: '-50px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 200,
                        height: 200,
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        boxShadow: 3,
                        backgroundColor: 'white',
                        zIndex: 2,
                    }}
                >
                    <Box
                        component="img"
                        src={`images/plan-${img}`}
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
                        backgroundColor: '#f0f5ee',
                        mt: '4rem',
                        pt: '5rem',
                        height: {
                            xs: 460,
                            sm: 440,
                            md: 440,
                            lg: 420,
                        },
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                        }}
                    >
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography variant="h5" color="text.secondary" sx={{ mr: 1 }}>
                                        Plan
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{ color: 'var(--darkgreen-color)', fontWeight: 'bold' }}
                                    >
                                        {name}
                                    </Typography>
                                </Box>

                                <Box sx={{ height: 50, width: 2, backgroundColor: 'grey.400', mx: 2 }} />
                                <Typography variant="h4" color="primary" sx={{ color: 'var(--darkgreen-color)', fontWeight: 600 }} >
                                    ${value}
                                </Typography>
                            </Box>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                                {text}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'auto', pb: 1 }}>
                            <Button
                                variant="contained"
                                sx={{ borderRadius: 2, backgroundColor: 'var(--darkgreen-color)', color: 'white', fontWeight: 600 }}
                                onClick={()=> {navigate('/ourService')}}
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

export function PlanCardServices({ name, value, points, img, alt, buttonText = "Pagar ahora", isHighlight, action }) {
    return (
        <Box sx={{ paddingTop: '4rem', display: 'flex', justifyContent: 'center', }}>
            <Box sx={{ position: 'relative' }}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '-50px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 200,
                        height: 200,
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        boxShadow: 3,
                        backgroundColor: 'white',
                        zIndex: 2,
                    }}
                >
                    <Box
                        component="img"
                        src={`images/${img}`}
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
                        mt: '4rem',
                        pt: '5rem',
                        minHeight: 580,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        transform: isHighlight ? 'scale(1.03)' : '',
                        boxShadow: isHighlight ? 2 : 0,
                    }}
                >


                    <CardContent
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                        }}
                    >
                        <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'space-between' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Typography variant="h5" color="text.secondary" sx={{ mr: 1 }}>
                                        Plan
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{ color: 'var(--darkgreen-color)', fontWeight: 'bold' }}
                                    >
                                        {name}
                                    </Typography>
                                </Box>

                                <Box sx={{ height: 50, width: 2, backgroundColor: 'grey.400', mx: 2 }} />
                                <Typography variant="h4" color="primary" sx={{ color: 'var(--darkgreen-color)', fontWeight: 600 }} >
                                    ${value}
                                </Typography>
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{
                                    borderRadius: 2, backgroundColor: isHighlight ? 'var(--darkgreen-color)' : 'var(--secondary-color)', color: 'white', fontWeight: 600, '&:hover': {
                                        background: isHighlight ? 'var(--hoverdarkgreen-color)' : 'var(--darkgreen-color)'
                                    }
                                }}
                                onClick={action}
                            >
                                {buttonText}
                            </Button>

                            <List>
                                {points.map((item, index) => (
                                    <ListItem key={index} disablePadding>
                                        <ListItemText primary={`🐾 ${item}`} />
                                    </ListItem>
                                ))}
                            </List>

                        </Box>


                    </CardContent>
                </Card>

            </Box>
        </Box>

    );
};
