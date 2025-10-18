import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, IconButton, Typography, Box, Pagination
} from '@mui/material';

const plans = { 1: 'Básico', 2: 'Premium', 3: 'Presencial' }
function processDescription(description, isMobile, pets, subs) {
    if (!description) return;
    const idMatch = description.match(/ID\s*#(\d+)/i);
    const subscription_id = idMatch ? parseInt(idMatch[1], 10) : null;
    if (!subscription_id) return;


    const cuotaMatch = description.match(/cuota\s*(\d+)/i);
    const cuota = cuotaMatch ? parseInt(cuotaMatch[1], 10) : null;

    const data = Object.values(subs).find(item => item.id === subscription_id);

    if (!data) return;

    const matchedPet = pets.find(item => item.subscripcion_id === subscription_id);

    const planID = data.plan_id;


    if (isMobile) {
        return `Plan: ${plans[planID] || "-"} - Mascota: ${matchedPet ? matchedPet.nombre : "-"} - Cuota: ${cuota ?? "-"}`;
    } else {
        return {
            plan: plans[planID] || "-",
            pet: matchedPet ? matchedPet.nombre : "-",
            cuota: cuota ?? "-"
        };
    }
}

export const FacturasTable = ({ rows, pets, subs }) => {
    const [page, setPage] = useState(1);
    const [processedRows, setProcessedRows] = useState([]);
    const rowsPerPage = 5;

    useEffect(() => {
        console.log(subs)
        if (rows?.length === 0 || pets?.length === 0 || subs?.length === 0) return;
        const newData = rows.map(row => {
            const desc = processDescription(row.descripcion, false, pets, subs);
            return {
                ...row,
                plan: desc?.plan || "-",
                pet: desc?.pet || "-",
                cuota: desc?.cuota || '-'
            };
        });

        setProcessedRows(newData);
    }, [rows, pets, subs]);

    const startIndex = (page - 1) * rowsPerPage;
    const currentRows = processedRows.slice(startIndex, startIndex + rowsPerPage);

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
                        <TableCell><strong>Fecha de pago</strong></TableCell>
                        <TableCell><strong>Plan</strong></TableCell>
                        <TableCell><strong>Mascota</strong></TableCell>
                        <TableCell><strong>Cuota</strong></TableCell>
                        <TableCell><strong>Monto</strong></TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {currentRows.map((row, i) => (
                        <TableRow key={i}>
                            <TableCell>{row.fecha_emision}</TableCell>
                            <TableCell><strong>{row.plan}</strong></TableCell>
                            <TableCell>{row.pet}</TableCell>
                            <TableCell>{row.cuota}</TableCell>
                            <TableCell>
                                <Typography fontWeight="bold">${row.total}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {processedRows.length > rowsPerPage && (
                <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                    <Pagination
                        count={Math.ceil(processedRows.length / rowsPerPage)}
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