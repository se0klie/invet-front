import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, IconButton, Typography, Box
} from '@mui/material';
import { LoadingModal } from './Modals';

const plans = { 1: 'Basico', 2: 'Premium', 3: 'Presencial' }

function processDescription(description, isMobile, pets, subs) {
    const match = description.match(/ID\s*#(\d+)/i);
    const planId = match ? parseInt(match[1], 10) : null;
    const matched = pets.find(item => item.subscripcion_id === planId);
    const planID = subs[matched?.id]?.subscripcion?.plan_id


    if (matched) {
        if (isMobile) {
            return `Plan: ${plans[planID]} - Mascota: ${matched.nombre}`;
        } else {
            return { plan: plans[planID], pet: matched.nombre }
        }
    }
}

export const FacturasTable = ({ rows, pets, subs }) => {
    const [showLoadingModal, setShowLoadingModal] = useState(false)
    const [loadingModalStep, setLoadingModalStep] = useState(0)


    useEffect(() => {
        setTimeout(() => {
            setLoadingModalStep(1)
            setTimeout(() => {
                setShowLoadingModal(false)
                setLoadingModalStep(0)
            }, 2000);
        }, 3000);
    }, [showLoadingModal])

    return (
        <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: 'none', width: '100%', height: '100%' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>ID factura</strong></TableCell>
                        <TableCell><strong>Fecha de pago</strong></TableCell>
                        <TableCell><strong>Plan</strong></TableCell>
                        <TableCell><strong>Mascota</strong></TableCell>
                        <TableCell><strong>Monto</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.fecha_emision}</TableCell>
                            <TableCell><strong>{processDescription(row.descripcion, false, pets, subs)?.plan || '-'}</strong></TableCell>
                            <TableCell>{processDescription(row.descripcion, false, pets, subs)?.pet || '-'}</TableCell>
                            <TableCell>
                                <Typography fontWeight="bold">${row.total}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <LoadingModal text="Descargando..." open={showLoadingModal} setOpen={setShowLoadingModal} modalStep={loadingModalStep} />
        </TableContainer>
    );
};


export const FacturasList = ({ rows, pets, subs }) => {
    const [showLoadingModal, setShowLoadingModal] = useState(false)
    const [loadingModalStep, setLoadingModalStep] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setLoadingModalStep(1)
            setTimeout(() => {
                setShowLoadingModal(false)
                setLoadingModalStep(0)
            }, 2000);
        }, 3000);
    }, [showLoadingModal])


    return (
        <Box sx={{ width: '100%' }}>
            {rows.map((row, i) => (
                <Box key={i}>
                    <Box key={i} sx={{ display: 'flex', flexDirection: 'column', padding: '1rem', backgroundColor: 'white', marginY: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <   Typography variant="body1" sx={{ fontWeight: 'bold', color: 'var(--darkgreen-color)' }}>
                                {row.fecha_emision}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'black', fontWeight: 600 }}>
                                ${row.total}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', marginTop: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                {processDescription(row.descripcion, true, pets, subs)}
                            </Typography>

                        </Box>
                    </Box>

                </Box>
            ))}
            <LoadingModal text="Descargando..." open={showLoadingModal} setOpen={setShowLoadingModal} modalStep={loadingModalStep} />
        </Box>
    )
}