import { useEffect } from "react";
import { CancelButton } from "../../pages/shared components/Buttons";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { CancelPlanModal, LoadingModal } from "./Modals";
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
    const [cancelPlan, setCancelPlan] = useState(false)
    const [loadingModal, setLoadingModal] = useState()
    const [loadingModalStep, setLoadingModalStep] = useState(0)

    function onCancelPlan() {
        setCancelPlan(false)
        setLoadingModal(true)
        setTimeout(() => {
            setLoadingModalStep(1)
            setTimeout(() => {
                setLoadingModal(false)
            }, 2000);
        }, 3000);
    }

    return (
        <Box
            sx={{ marginY: '1rem', display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: 'white', padding: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', }}>
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
                    <CancelButton action={() => setCancelPlan(true)} text={`${isMobile ? 'Cancelar' : 'Cancelar plan'}`} />
                </Box>
                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#007780' }}>
                        Siguiente cobro:
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                        {date}
                    </Typography>
                </Box>

                <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', color: '#007780' }}>
                        Plan:
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                        {plan}
                    </Typography>
                </Box>
            </Box>
            <CancelPlanModal
                open={cancelPlan}
                setOpen={setCancelPlan}
                petName={petName}
                onCancel={onCancelPlan}
            />

            <LoadingModal open={loadingModal} setOpen={setLoadingModal} text="Generando cambios..." modalStep={loadingModalStep} />
        </Box>
    )
}
