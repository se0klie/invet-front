import React from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, IconButton, Typography, Box
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const FacturasTable = ({ rows }) => {
    return (
        <TableContainer component={Paper} sx={{ borderRadius: '12px', boxShadow: 'none', width: '100%' }}>
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
                                    <DownloadIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default FacturasTable;
