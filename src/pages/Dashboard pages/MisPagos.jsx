import { Box, Divider, Typography } from "@mui/material"
import { useState, useEffect } from "react";
import SubsBox from "../shared components/SubsBox";
import { FacturasTable, FacturasList } from "../shared components/BillTable";
import { MdOutlinePets } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function MisPagos({ pets, subscriptions, handleRefresh }) {
    const [invoices, setInvoices] = useState([
        { id: '#12345', fecha: '11 Jun, 2025', plan: 'Básico', mascota: 'Mojito', monto: 11 },
        { id: '#12345', fecha: '12 Jun, 2025', plan: 'Básico', mascota: 'Otto', monto: 11 },
        { id: '#12345', fecha: '13 Jun, 2025', plan: 'Básico', mascota: 'Mojito', monto: 11 },
    ]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [loadingInfo, setLoadingInfo] = useState({
        pets: false,
        subs: false,
        invoices: true
    })
    const navigate = useNavigate()
    const [validSubs, setValidSubs] = useState(subscriptions)

    useEffect(() => {
        if (pets) {
            setLoadingInfo((prev) => ({
                ...prev,
                pets: true
            }))
        }
        if (subscriptions) {
            const validData = Object.fromEntries(
                Object.entries(subscriptions).filter(([_, subObj]) => subObj.subscripcion?.estado < 2)
            );
            setValidSubs(validData)
            setLoadingInfo((prev) => ({
                ...prev,
                subs: true
            }))
        }

    }, [pets, subscriptions])

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', height: '100%', padding: '1.5em' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: 'min-content', width: '100%' }}>
                <Typography variant="h5" sx={{ color: 'var(--blackinput-color)', fontWeight: 'bold' }}>
                    Suscripciones activas
                </Typography>
                <Box>
                    {!loadingInfo.subs || !loadingInfo.pets ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, flexDirection: 'column', gap: '0.5rem' }}>
                            <MdOutlinePets size={40} />
                            <Typography sx={{ fontWeight: 600 }}>
                                Cargando...
                            </Typography>
                        </Box>
                    ) : Object.keys(validSubs).length === 0 ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, flexDirection: 'column', gap: '0.5rem' }}>
                            <MdOutlinePets size={40} style={{ color: 'var(--gray-color)' }} />
                            <Typography sx={{ fontWeight: 600, color: 'var(--gray-color)' }}>
                                No cuentas con suscripciones activas.{' '}
                                <span
                                    style={{
                                        textDecoration: 'underline',
                                        cursor: 'pointer',
                                    }}
                                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--darkgreen-color)')}
                                    onMouseOut={(e) => (e.currentTarget.style.color = 'inherit')}
                                    onClick={() => { navigate('/ourService') }}
                                >
                                    ¡Activa una!
                                </span>
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
                                scrollSnapType: 'x mandatory',
                                '&::-webkit-scrollbar': {
                                    display: 'none',
                                },
                                msOverflowStyle: 'none',
                                scrollbarWidth: 'none',
                            }}
                        >
                            {Object.entries(validSubs)
                                .filter(([_, subObj]) => subObj.pet.subscripcion !== null && subObj.subscripcion.estado === 0)
                                .map(([key, subObj]) => (
                                    <Box key={key} sx={{ scrollSnapAlign: 'start', flex: '0 0 auto' }}>
                                        <SubsBox pet={subObj.pet} subData={subObj.subscripcion} handleRefresh={handleRefresh} />
                                    </Box>
                                ))}
                        </Box>
                    )}

                </Box>
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
