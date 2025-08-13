import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, IconButton, Typography, Box
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { LoadingModal } from './Modals';
export const FacturasTable = ({ rows }) => {
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
                        <TableCell align="center">
                            <Button
                                variant="contained"
                                sx={{
                                    textTransform: 'none',
                                    backgroundColor: '#2B7C85',
                                    borderRadius: '6px',
                                    fontWeight: 'bold',
                                    fontSize: '0.8rem',
                                    paddingX: 2,
                                    '&:hover': { backgroundColor: '#256a71' }
                                }}
                                onClick={() => setShowLoadingModal(true)}
                            >
                                Descargar todo
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.fecha}</TableCell>
                            <TableCell><strong>{row.plan}</strong></TableCell>
                            <TableCell>{row.mascota}</TableCell>
                            <TableCell>
                                <Typography fontWeight="bold">${row.monto}</Typography>
                            </TableCell>
                            <TableCell align="right" sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Typography
                                        component="span"
                                        sx={{ color: 'mediumseagreen', fontWeight: 'bold', fontSize: '0.875rem', cursor: 'pointer' }}
                                    >
                                        Ver
                                    </Typography>
                                </Box>
                                <IconButton size="small">
                                    <DownloadIcon
                                        onClick={() => setShowLoadingModal(true)}
                                    />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <LoadingModal text="Descargando..." open={showLoadingModal} setOpen={setShowLoadingModal} modalStep={loadingModalStep} />
        </TableContainer>
    );
};


export const FacturasList = ({ rows }) => {
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
            <Button
                variant="contained"
                sx={{
                    textTransform: 'none',
                    backgroundColor: '#2B7C85',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                    fontSize: '0.8rem',
                    paddingX: 2,
                    '&:hover': { backgroundColor: '#256a71' }
                }}
                onClick={() => setShowLoadingModal(true)}
            >
                Descargar todo
            </Button>
            {rows.map((row, i) => (
                <Box>
                    <Box key={i} sx={{ display: 'flex', flexDirection: 'column', padding: '1rem', backgroundColor: 'white', marginY: '1rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <   Typography variant="body1" sx={{ fontWeight: 'bold', color: 'var(--darkgreen-color)' }}>
                                {row.fecha}
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'black', fontWeight: 600 }}>
                                ${row.monto}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', marginTop: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                {row.plan} - {row.mascota}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', gap: '1rem' }}>
                                <DownloadIcon style={{ color: 'mediumseagreen' }} onClick={() => setShowLoadingModal(true)}/>
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <Typography
                                        component="span"
                                        sx={{ color: 'mediumseagreen', fontWeight: 'bold', fontSize: '0.875rem', cursor: 'pointer' }}
                                    >
                                        Ver
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                </Box>
            ))}
            <LoadingModal text="Descargando..." open={showLoadingModal} setOpen={setShowLoadingModal} modalStep={loadingModalStep} />
        </Box>
    )
}