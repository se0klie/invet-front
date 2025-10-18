import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, IconButton, Typography, Box, Pagination
} from '@mui/material';

const plans = { 1: 'Basico', 2: 'Premium', 3: 'Presencial' }

function processDescription(description, isMobile, pets, subs) {
    const match = description.match(/ID\s*#(\d+)/i);
    const subscription_id = match ? parseInt(match[1], 10) : null;
    if (!subscription_id) return;

    const data = Object.values(subs).find(item => item.subscripcion.id === subscription_id);
    if (!data || !data.subscripcion) return;

    const matched = pets.find(item => item.subscripcion_id === subscription_id);
    const planID = data.subscripcion.plan_id
    if (isMobile) {
        return `Plan: ${plans[planID]} - Mascota: ${matched ? matched.nombre : null}`;
    } else {
        return { plan: plans[planID], pet: matched ? matched.nombre : null }
    }
}

export const FacturasTable = ({ rows, pets, subs }) => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const startIndex = (page - 1) * rowsPerPage;
    const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);


    const handlePageChange = (event, value) => {
        setPage(value);
    };


    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: "12px",
                boxShadow: "none",
                width: "100%",
                height: "100%",
            }}
        >
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
                    {currentRows.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.fecha_emision}</TableCell>
                            <TableCell>
                                <strong>{processDescription(row.descripcion, false, pets, subs)?.plan || "-"}</strong>
                            </TableCell>
                            <TableCell>
                                {processDescription(row.descripcion, false, pets, subs)?.pet || "-"}
                            </TableCell>
                            <TableCell>
                                <Typography fontWeight="bold">${row.total}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination below table */}
            {rows.length > rowsPerPage && (
                <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                    <Pagination
                        count={Math.ceil(rows.length / rowsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        sx={{
                            "& .MuiPaginationItem-root": {
                                color: "var(--darkgreen-color)",
                            },
                            "& .MuiPaginationItem-root.Mui-selected": {
                                backgroundColor: "var(--darkgreen-color)",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "var(--darkgreen-color)",
                                },
                            },
                        }}
                    />
                </Box>
            )}
        </TableContainer>
    );
};


export const FacturasList = ({ rows, pets, subs }) => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const startIndex = (page - 1) * rowsPerPage;
    const currentRows = rows.slice(startIndex, startIndex + rowsPerPage);


    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box sx={{ width: "100%" }}>
            {currentRows.map((row, i) => (
                <Box
                    key={i}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "1rem",
                        backgroundColor: "white",
                        marginY: "1rem",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <Typography variant="body1" sx={{ fontWeight: "bold", color: "var(--darkgreen-color)" }}>
                            {row.fecha_emision}
                        </Typography>
                        <Typography variant="body1" sx={{ color: "black", fontWeight: 600 }}>
                            ${row.total}
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", marginTop: "0.5rem", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="body2" sx={{ color: "gray" }}>
                            {processDescription(row.descripcion, true, pets, subs)}
                        </Typography>
                    </Box>
                </Box>
            ))}

            {rows.length > rowsPerPage && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Pagination
                        count={Math.ceil(rows.length / rowsPerPage)}
                        page={page}
                        onChange={handlePageChange}
                        sx={{
                            "& .MuiPaginationItem-root": {
                                color: "var(--darkgreen-color)", // text color
                            },
                            "& .MuiPaginationItem-root.Mui-selected": {
                                backgroundColor: "var(--darkgreen-color)",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: "var(--darkgreen-color)",
                                },
                            },
                        }}
                    />
                </Box>
            )}

        </Box>
    )
}