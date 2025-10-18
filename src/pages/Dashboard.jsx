import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"
import { Box, Typography, Button, Fab } from "@mui/material";
import MisMascotas from "./Dashboard pages/MisMascotas";
import MisPagos from "./Dashboard pages/MisPagos";
import { FaWhatsapp } from "react-icons/fa";
import axios_api from "./axios";
import { endpoints } from "./endpoints";
import Cookies from 'js-cookie'

export default function Dashboard() {
    const [subscriptionsClient, setSubscriptionsClient] = useState([]);
    const [subscriptions, setSubscriptions] = useState({})
    const { user, login } = useAuth();
    const [divisionSelected, setDivisionSelected] = useState('Mis mascotas');
    const url = `https://wa.me/593999495379`;
    const [pets, setPets] = useState([])
    const [subs, setSubs] = useState([])
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    async function fetchSubs() {
        try {
            const response = await axios_api.get(endpoints.get_subs);
            if (response.status) {
                setSubscriptionsClient(response.data.results)
            }
        } catch (err) {
            console.error('GET subs', err)
            return err
        }
    }

    useEffect(() => {
        if (subscriptionsClient && pets) {
            const subscriptionsById = {};
            subscriptionsClient.forEach(sub => {
                subscriptionsById[sub.id] = sub;
            });

            const petsWithSubsObj = {};
            pets.forEach(pet => {
                const sub = pet.subscripcion_id ? subscriptionsById[pet.subscripcion_id] : undefined;
                if (sub) {
                    petsWithSubsObj[pet.id] = {
                        pet,
                        subscripcion: sub
                    };
                }
            });
            setSubscriptions(petsWithSubsObj)
        }
    }, [subscriptionsClient, pets]);

    async function getPets() {
        try {
            const response = await axios_api.get(endpoints.get_pets);
            if (response.status === 200) {
                const data = response.data.results;
                setPets(data)
            }
        } catch (err) {
            console.error('Error in GET /pets', err)
        }
    }

    useEffect(() => {
        fetchSubs()
        if (pets.length === 0) {
            getPets()
        }
    }, [])

    return (
        <Box sx={{ backgroundColor: 'var(--primary-color)', minHeight: '100vh', padding: isMobile ? '1rem' : '2rem', boxSizing: 'border-box' }}>
            <Typography variant="h4" sx={{ marginBottom: '20px', color: 'var(--blackinput-color)', fontWeight: 'bold' }}>
                Hola, {user ? (user.nombre || localStorage.getItem('nombre')) : "Invitado"}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', backgroundColor: divisionSelected === 'Mis mascotas' ? 'var(--extra-light-gray-color)' : 'var(--disabled-color)', paddingX: '1rem', cursor: 'pointer' }}
                            onClick={() => setDivisionSelected('Mis mascotas')}>
                            <Typography variant="h5" sx={{ color: 'var(--blackinput-color)', margin: '10px', fontWeight: 'bold' }}>
                                Mis mascotas
                            </Typography>
                        </Box>
                        <Box sx={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem', backgroundColor: divisionSelected === 'Mis pagos' ? 'var(--extra-light-gray-color)' : 'var(--disabled-color)', paddingX: '1rem', cursor: 'pointer' }}
                            onClick={() => setDivisionSelected('Mis pagos')}>
                            <Typography variant="h5" sx={{ color: 'var(--blackinput-color)', margin: '10px', fontWeight: 'bold' }}>
                                Mis pagos
                            </Typography>
                        </Box>
                    </Box>
                    {!isMobile &&
                        (<Box>
                            <Button
                                sx={{
                                    display: 'flex',
                                    backgroundColor: 'var(--secondary-color)',
                                    borderRadius: '5rem',
                                    border: '2px solid var(--darkgreen-color)',
                                    color: 'white',
                                    fontWeight: 600,
                                    padding: '8px 20px',
                                    gap: '0.5rem',
                                    '&:hover': {
                                        borderColor: 'var(--hoverdarkgreen-color)',
                                        color: 'white',
                                    },
                                }}
                                onClick={() => window.open(url, '_blank')}>
                                ¡Estamos dispuestos a ayudarte!
                                <FaWhatsapp style={{ color: 'white', fontSize: '1.5rem' }} />
                            </Button>
                        </Box>)
                    }
                </Box>

                {divisionSelected === 'Mis mascotas' &&
                    <Box
                        sx={{
                            backgroundColor: 'var(--extra-light-gray-color)',
                        }}>
                        <MisMascotas pets={pets} subs={subscriptions} handleRefresh={() => {
                            getPets()
                            fetchSubs()
                        }} />
                    </Box>
                }


                {divisionSelected === 'Mis pagos' &&
                    <Box
                        sx={{
                            backgroundColor: 'var(--extra-light-gray-color)',
                        }}>
                        <MisPagos pets={pets} subscriptions={subscriptionsClient} petSubMatch={subscriptions}
                            handleRefresh={() => {
                                getPets()
                                fetchSubs()
                            }} />

                    </Box>
                }

            </Box>
        </Box >
    );
}