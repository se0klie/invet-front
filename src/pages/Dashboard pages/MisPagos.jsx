import { Box, Divider, Typography, Button, Link, Modal, Tooltip, TextField, Stack, IconButton } from "@mui/material"
import { useState, useEffect } from "react";
import SubsBox from "../shared components/SubsBox";
import { FacturasTable, FacturasList } from "../shared components/BillTable";
import { MdOutlinePets } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios_api from "../axios";
import { endpoints } from "../endpoints";
import { IoIosRemove } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { LoadingModal } from "../shared components/Modals";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import React from "react";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ClearIcon from '@mui/icons-material/Clear';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParseFormat);

export default function MisPagos({ pets, subscriptions, handleRefresh, petSubMatch}) {
    const [invoices, setInvoices] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [loadingInfo, setLoadingInfo] = useState({
        pets: false,
        subs: false,
        invoices: false
    })
    const navigate = useNavigate()
    const [validSubs, setValidSubs] = useState(petSubMatch)
    const [showCards, setShowCards] = useState(false)
    const [cards, setCards] = useState([])
    const [deletePaymentMethod, setDeletePaymentMethod] = useState(false)
    const [selectedCard, setSelectedCard] = useState('')
    const [showLoadingModal, setShowLoadingModal] = useState(false)
    const [loadingStep, setLoadingStep] = useState(0)
    const [filteredInvoices, setFilteredInvoices] = useState(invoices || [])
    
    async function fetchBills() {
        try {
            const response = await axios_api.get(endpoints.get_bills)
            setInvoices(response?.data?.results || [])
            setFilteredInvoices(response?.data?.results || [])
            setLoadingInfo((prev) => ({
                ...prev,
                invoices: true
            }))
        } catch (err) {
            console.error(err)
            return err
        }
    }

    useEffect(() => {
        fetchBills()
    }, [])

    useEffect(() => {
        if (pets) {
            setLoadingInfo((prev) => ({
                ...prev,
                pets: true
            }))
        }
        if (petSubMatch) {
            const validData = Object.fromEntries(
                Object.entries(petSubMatch).filter(([_, subObj]) => subObj.subscripcion?.estado === 0)
            );
            setValidSubs(validData)
            setLoadingInfo((prev) => ({
                ...prev,
                subs: true
            }))
        }

    }, [pets, petSubMatch])

    function handleFilterInvoices() {
        if (!startDate || !endDate) {
            setFilteredInvoices(invoices);
            return;
        }

        const filtered = invoices.filter((invoice) => {
            const invoiceDate = dayjs(invoice.fecha_emision, 'DD/MM/YYYY');
            const start = dayjs(startDate);
            const end = dayjs(endDate);

            return invoiceDate.isSameOrAfter(start, 'day') && invoiceDate.isSameOrBefore(end, 'day');
        });

        setFilteredInvoices(filtered);
    }
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        getCards()
    }, [])

    async function getCards() {
        try {
            const cardsInfo = await axios_api.get(endpoints.registered_cards);
            const cards = cardsInfo?.data?.results?.map(card => {
                const matchedSubs = Object.values(petSubMatch || {}).filter(
                    s => s.subscripcion.tarjeta_id === card.id
                );

                const enrichedSubs = matchedSubs.map(s => ({
                    ...s.subscripcion,
                    pet: pets.find(p => p.subscripcion_id === s.subscripcion.id) || null,
                }));
                return {
                    ...card,
                    subscriptions: enrichedSubs,
                };
            });
            setCards(cards)
        } catch (err) {
            console.error('Error getting registered cards', err)
            return err
        }
    }

    async function handleRemovePaymentMehod() {
        setShowLoadingModal(true)
        setDeletePaymentMethod(false)
        try {
            const response = await axios_api.delete(endpoints.remove_card, {
                data: {
                    email: localStorage.getItem('email'),
                    tarjeta_id: selectedCard.id
                }
            });

            if (response.status === 200) {
                getCards()
                setTimeout(() => {
                    setLoadingStep(1)
                    setTimeout(() => {
                        setShowLoadingModal(false)
                        setLoadingStep(0)
                    }, 1000);
                }, 2000);
            }
        } catch (err) {
            console.error(err)
            setTimeout(() => {
                setLoadingStep(-1)
                setTimeout(() => {
                    setShowLoadingModal(false)
                    setLoadingStep(0)
                }, 1000);
            }, 2000);
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', height: '100%', padding: '1.5em' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: 'min-content', width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h5" sx={{ color: 'var(--blackinput-color)', fontWeight: 'bold' }}>
                        Suscripciones activas
                    </Typography>
                    <Button sx={{
                        background: 'var(--secondary-color)', color: 'white', px: 2, fontWeight: 600,
                        '&:hover': {
                            background: 'var(--darkgreen-color)'
                        }
                    }}
                        onClick={() => {
                            handleRefresh()
                            getCards()
                            setShowCards(true)
                        }}>Mis métodos de pago</Button>
                </Box>
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
                                    onClick={() => { navigate('/servicios') }}
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
                                .map(([key, subObj]) => (
                                    <Box key={key} sx={{ scrollSnapAlign: 'start', flex: '0 0 auto' }}>
                                        <SubsBox pet={subObj.pet} subData={subObj.subscripcion} handleRefresh={async () => {
                                            await handleRefresh()
                                            await getCards()
                                        }} />
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
                    my: 1
                }}
            />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '50%',
                    width: '100%',
                    py: 1,
                    gap: 1,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            color: 'var(--blackinput-color)',
                            fontWeight: 'bold',
                            mb: 1,
                            textWrap: 'nowrap',
                            flexShrink: 1,
                            minWidth: 0,
                        }}
                    >
                        Historial de facturas
                    </Typography>


                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
                                <DatePicker
                                    label="Desde"
                                    value={startDate}
                                    onChange={(newValue) => setStartDate(newValue)}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            sx: {
                                                width: { xs: '100px', sm: '120px', md: '150px' },
                                                '& .MuiInputBase-root': { height: 30, fontSize: '0.8rem' },
                                                '& .MuiInputLabel-root': { fontSize: '0.75rem' },
                                            },
                                        },
                                    }}
                                />
                                <DatePicker
                                    label="Hasta"
                                    value={endDate}
                                    onChange={(newValue) => setEndDate(newValue)}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                            sx: {
                                                width: { xs: '100px', sm: '120px', md: '150px' },
                                                '& .MuiInputBase-root': { height: 30, fontSize: '0.8rem' },
                                                '& .MuiInputLabel-root': { fontSize: '0.75rem' },
                                            },
                                        },
                                    }}
                                />

                                {startDate && endDate && (
                                    <IconButton
                                        size="small"
                                        onClick={() => {
                                            setStartDate(null);
                                            setEndDate(null);
                                            setFilteredInvoices(invoices); // mostrar todas
                                        }}
                                    >
                                        <ClearIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </Box>
                        </LocalizationProvider>

                        <Button
                            variant="contained"
                            size="small"
                            sx={{
                                background: 'var(--secondary-color)',
                                color: 'white',
                                fontWeight: 600,
                                boxShadow: 0,
                                minWidth: { xs: 60, sm: 80 },
                                '&:hover': { background: 'var(--darkgreen-color)' },
                            }}
                            onClick={() => {
                                if (startDate && endDate) {
                                    if (startDate.isAfter(endDate)) {
                                        alert('La fecha "Desde" no puede ser posterior a la fecha "Hasta".');
                                        return;
                                    }
                                    handleFilterInvoices();
                                } else {
                                    setFilteredInvoices(invoices);
                                }
                            }}
                        >
                            Filtrar
                        </Button>
                    </Box>
                </Box>

                <Typography variant="body2" sx={{ color: 'gray' }}>
                    Para encontrar el PDF de alguna factura en específico, por favor revisa la bandeja de entrada de tu correo electrónico.
                </Typography>
                <Box
                    sx={{
                        flex: 1,
                        display: 'flex',
                        justifyContent: filteredInvoices.length === 0 ? 'center' : 'flex-start',
                        alignItems: filteredInvoices.length === 0 ? 'center' : 'flex-start',
                        width: '100%',
                    }}
                >
                    {filteredInvoices.length === 0 ? (
                        <Box
                            sx={{
                                width: { xs: '50%', sm: '30%', md: '20%' },
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1.5,
                                alignItems: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <img
                                src={`${import.meta.env.VITE_BASE_URL}/images/common/no_data.svg`}
                                alt="No data"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    objectFit: 'contain',
                                }}
                            />
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    color: 'var(--darkgreen-color)',
                                    fontSize: { xs: '0.9rem', sm: '1rem' },
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                No hay facturas por mostrar
                            </Typography>
                        </Box>
                    ) : (
                        <Box sx={{ width: '100%' }}>
                            {!isMobile ?
                                <FacturasTable rows={filteredInvoices} pets={pets} subs={subscriptions} />
                                :
                                <FacturasList rows={filteredInvoices} pets={pets} subs={subscriptions} />}
                        </Box>
                    )}
                </Box>
            </Box>
            <Modal
                open={showCards}
                onClose={() => setShowCards(false)}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        width: { xs: '70%', md: 650, lg: 700 },
                    }}
                >
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem' }}>
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'var(--darkgreen-color)' }}>
                                    Tus métodos de pago
                                </Typography>
                                <RxCross1
                                    style={{ color: 'black', cursor: 'pointer' }}
                                    onClick={() => setShowCards(false)}
                                />
                            </Box>

                            <Typography variant="body1" sx={{ color: "black" }}>
                                Aquí podrás gestionar los métodos de pago utilizados para las suscripciones de tus mascotas.
                            </Typography>
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                            {cards.length > 0 ? (
                                cards.map((card, index) => (
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        spacing={2}
                                        sx={{ width: "100%", my: 1 }}
                                    >
                                        <TextField
                                            key={index}
                                            value={`${card.holder.toUpperCase()} ****${card.number.slice(-4)} ${card.provider.toUpperCase()}`}
                                            disabled
                                            fullWidth
                                        />

                                        <Stack direction="row" spacing={1}>
                                            {card.subscriptions.length > 0 && card.subscriptions.some(sub => sub.estado === 0)  ? (
                                                <Tooltip
                                                    title={
                                                        <Box className="tooltip-content">
                                                            Para eliminar esta tarjeta debe cambiar su método de pago para las suscripciones de la(s) siguiente(s) mascota(s):
                                                            <ul>
                                                                {card?.subscriptions.map((sub, index) => (
                                                                    <li key={index}>
                                                                        {sub.pet?.nombre}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </Box>
                                                    }
                                                    arrow
                                                    placement="right"
                                                >
                                                    <span>
                                                        <IconButton
                                                            sx={{
                                                                bgcolor: 'gray',
                                                                color: 'white',
                                                                cursor: 'not-allowed',
                                                                '&:hover': {
                                                                    bgcolor: 'gray',
                                                                }
                                                            }}

                                                        >
                                                            <IoIosRemove />
                                                        </IconButton>
                                                    </span>
                                                </Tooltip>
                                            ) : (
                                                <IconButton
                                                    sx={{
                                                        bgcolor: "error.main",
                                                        color: "white",
                                                        cursor: 'pointer',
                                                        "&:hover": { bgcolor: "error.dark" }
                                                    }}
                                                    onClick={() => {
                                                        setSelectedCard(card)
                                                        setShowCards(false)
                                                        setDeletePaymentMethod(true)
                                                    }}
                                                >
                                                    <IoIosRemove />
                                                </IconButton>
                                            )}
                                        </Stack>
                                    </Stack>
                                ))
                            ) : (
                                <Box sx={{
                                    borderWidth: 1,
                                    borderColor: 'var(--gray-color)',
                                    borderStyle: 'solid',
                                    borderRadius: 2,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    py: 1,
                                    width: 'fit-content'
                                }}>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            px: 3,
                                            color: 'var(--gray-color)',
                                        }}>
                                        No existen métodos de pago registrados.
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                    </Box>
                </Box>
            </Modal>
            <Modal
                open={deletePaymentMethod}
                onClose={() => setDeletePaymentMethod(false)}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        width: { xs: '70%', md: 650, lg: 700 },
                    }}
                >
                    <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', gap: '1rem', textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'var(--error-color)' }}>
                                Eliminar método de pago
                            </Typography>
                            <RxCross1
                                style={{ color: 'black', cursor: 'pointer' }}
                                onClick={() => setDeletePaymentMethod(false)}
                            />
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mt: 2,
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: 500, color: "text.secondary" }}
                            >
                                Eliminar método de pago
                            </Typography>

                            <Box
                                sx={{
                                    width: 'auto',
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    fontFamily: '"Roboto Mono", monospace',
                                    fontSize: "1rem",
                                    letterSpacing: "0.1em",
                                    color: "var(--blackinput-color)",
                                }}
                            >
                                {selectedCard?.id ? `${selectedCard.holder.toUpperCase() || ''} ****${selectedCard.number.slice(-4) || ''} ${selectedCard.provider.toUpperCase()}` || '' : ''}
                            </Box>
                        </Box>


                        <Typography variant="body2" sx={{ color: 'gray', textAlign: 'left' }}>
                            Se eliminará de manera segura el método de pago seleccionado, {' '}
                            <strong>esta acción no es reversible, ¿desea continuar?</strong>
                        </Typography>
                        <Box sx={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', flexDirection: isMobile ? 'column' : "row" }}>
                            <Button
                                sx={{
                                    color: 'white', minWidth: 120, background: 'var(--error-fill-color)', fontWeight: 600, boxShadow: 0, cursor: 'pointer', px: '1rem',
                                    '&:hover': {
                                        background: 'var(--error-fill-hover-color)'
                                    }
                                }}
                                onClick={() => handleRemovePaymentMehod()}
                            >
                                Eliminar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>

            <LoadingModal text="Generando cambios..." open={showLoadingModal} modalStep={loadingStep} setOpen={setShowLoadingModal} />
        </Box>
    )
}
