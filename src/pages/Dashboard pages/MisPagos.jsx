import { Box, Divider, Typography } from "@mui/material"
import { useState } from "react";
import SubsBox from "../shared components/SubsBox";
import BillTable from "../shared components/BillTable";

export default function MisPagos() {
    const [suscriptions, setSubscriptions] = useState([
        {
            name: 'Otto Rocket',
            plan: 'Básico',
            siguientePago: '2023-10-15',
            estado: 'Activo'
        }
    ]);

    const [invoices, setInvoices] = useState([
        { id: '#12345', fecha: '11 Jun, 2025', plan: 'Básico', mascota: 'Mojito', monto: 11 },
        { id: '#12345', fecha: '11 Jun, 2025', plan: 'Básico', mascota: 'Otto', monto: 11 },
        { id: '#12345', fecha: '11 Jun, 2025', plan: 'Básico', mascota: 'Mojito', monto: 11 },
    ]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', height: '100vh' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px', height: 'min-content', }}>
                <Typography variant="h6" sx={{ color: 'var(--blackinput-color)', fontWeight: 'bold' }}>
                    Suscripciones activas
                </Typography>
                {suscriptions.length === 0 ? (
                    <Box>
                        <Typography variant="body1" sx={{ color: 'var(--soft-black-color)', fontWeight: 'bold' }}>
                            No tienes suscripciones activas.
                        </Typography>
                    </Box>
                ) : (
                    <>
                        {suscriptions.map((sub, index) => (
                            <SubsBox
                                key={index}
                                petName={sub.name}
                                plan={sub.plan}
                                date={sub.siguientePago}
                                estado={sub.estado}
                            />
                        ))}
                    </>
                )}
            </Box>
            <Divider
                sx={{
                    borderBottom: '2px solid var(--gray-color)',
                    width: '100%',
                    my: 2
                }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', padding: '20px', margin: '1rem', height: '50%', width: '95%' }}>
                <Typography variant="h6" sx={{ color: 'var(--blackinput-color)', fontWeight: 'bold' }}>
                    Historial de facturas
                </Typography>
                {invoices.length === 0 ? (
                    <Typography variant="body1" sx={{ color: 'var(--soft-black-color)', fontWeight: 'bold' }}>
                        No tienes facturas.
                    </Typography>
                ) : (
                    <Box sx={{ marginTop: '20px' }}>
                        <BillTable rows={invoices} />
                    </Box>
                )}
            </Box>
        </Box>
    )
}
