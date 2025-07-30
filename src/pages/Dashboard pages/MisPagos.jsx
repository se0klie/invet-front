import { Box, Divider, Typography } from "@mui/material"
import { useState } from "react";
import SubsBox from "../shared components/SubsBox";
import {FacturasTable, FacturasList} from "../shared components/BillTable";

export default function MisPagos() {
    const isMobile = window.innerWidth <= 600;
    const [suscriptions, setSubscriptions] = useState([
        {
            name: 'Otto Rocket',
            plan: 'Básico',
            siguientePago: '2023-10-15',
            estado: 'Activo'
        },

        {
            name: 'Otto Rocket',
            plan: 'Básico',
            siguientePago: '2023-10-15',
            estado: 'Activo'
        },
        {
            name: 'Otto Rocket',
            plan: 'Básico',
            siguientePago: '2023-10-15',
            estado: 'Activo'
        }
    ]);

    const [invoices, setInvoices] = useState([
        { id: '#12345', fecha: '11 Jun, 2025', plan: 'Básico', mascota: 'Mojito', monto: 11 },
        { id: '#12345', fecha: '12 Jun, 2025', plan: 'Básico', mascota: 'Otto', monto: 11 },
        { id: '#12345', fecha: '13 Jun, 2025', plan: 'Básico', mascota: 'Mojito', monto: 11 },
    ]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', height: '100%', padding: '1.5em' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: 'min-content', width: '100%' }}>
                <Typography variant="h5" sx={{ color: 'var(--blackinput-color)', fontWeight: 'bold' }}>
                    Suscripciones activas
                </Typography>
                {suscriptions.length === 0 ? (
                    <Box>
                        <Typography variant="body1" sx={{ color: 'var(--soft-black-color)', fontWeight: 'bold' }}>
                            No tienes suscripciones activas.
                        </Typography>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            width: '100%',
                            gap: 2,
                            scrollSnapType: 'x mandatory', // ✅ Smooth snap effect
                        }}
                    >
                        {suscriptions.map((sub, index) => (
                            <Box key={index} sx={{ scrollSnapAlign: 'start', flex: '0 0 auto' }}>
                                <SubsBox
                                    petName={sub.name}
                                    plan={sub.plan}
                                    date={sub.siguientePago}
                                    estado={sub.estado}
                                />
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
            <Divider
                sx={{
                    borderBottom: '2px solid var(--gray-color)',
                    width: '100%',
                    my: 2
                }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', height: '50%', width: '100%' }}>
                <Typography variant="h5" sx={{ color: 'var(--blackinput-color)', fontWeight: 'bold' }}>
                    Historial de facturas
                </Typography>
                {invoices.length === 0 ? (
                    <Typography variant="body1" sx={{ color: 'var(--soft-black-color)', fontWeight: 'bold' }}>
                        No tienes facturas.
                    </Typography>
                ) : (
                    <Box sx={{ marginTop: '20px' }}>
                        {!isMobile &&
                            <FacturasTable rows={invoices} />}
                        {isMobile &&
                            <FacturasList rows={invoices} />}
                    </Box>
                )}
            </Box>
        </Box>
    )
}
