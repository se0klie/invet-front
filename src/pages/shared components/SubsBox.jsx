import { useEffect } from "react";
import { CancelButton } from "../../pages/shared components/Buttons";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

export default function SubsBox({ petName, date, plan }) {
    const isMobile = window.innerWidth <= 600;
    const [price, setPrice] = useState('$11.00');
    useEffect(() => {
        if (plan === 'Básico') {
            setPrice('$11.00');
        } else if (plan === 'Premium') {
            setPrice('$18.30');
        } else if (plan === 'Presencial') {
            setPrice('$24.15');
        }
    }, []);

    return (
        <Box
            sx={{ marginY: '1rem', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: isMobile ? '1.5rem' : '1rem' }}>
                <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
                    {petName}
                </Typography>
                <Typography variant="body1" sx={{ color: 'black', fontWeight: 'bold' }}>
                    {price}
                    <Typography component="span" sx={{ color: '#A0A0A0', fontWeight: 'normal', marginLeft: '4px' }}>
                        /mes
                    </Typography>
                </Typography>

            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '1rem' }}>

                <Box sx={{ width: '50%' }}>
                    <CancelButton action={() => console.log('Cancelar suscripción')} text={`${isMobile ? 'Cancelar' : 'Cancelar plan'}`} />
                </Box>
                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#007780' }}>
                        Siguiente cobro:
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                        {date}
                    </Typography>
                </Box>

                {/* Plan */}
                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#007780' }}>
                        Plan:
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                        {plan}
                    </Typography>
                </Box>

            </Box>
        </Box>
    )
}
