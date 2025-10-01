import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { IoMdSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function MenuBar() {
    const { user, login } = useAuth()
    const navigate = useNavigate()
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <AppBar position="static" sx={{ width: '100%', }}>
            <Toolbar sx={{ background: 'var(--secondary-color)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingX: '16px', paddingY: '8px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                        <Box component="img" src={`${import.meta.env.BASE_URL}/images/logo-invet.png`} sx={{ height: '2.5rem', '&:hover': { cursor: 'pointer' } }} onClick={() => navigate('/dashboard')} />

                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                        {!isMobile && <Box sx={{ borderRadius: '100%', backgroundColor: 'var(--darkgreen-color)', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={`${import.meta.env.BASE_URL}/images/user-avatar.png`} alt="User Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                        </Box>
                        }
                        <Typography variant="span" sx={{ flexGrow: 1, color: 'white', display: 'flex' }}>
                            {!isMobile && <Typography sx={{ mr: 1 }}>Bienvenido/a,</Typography>}
                            <Typography component="span" sx={{ fontWeight: 'bold', color: 'white' }}>
                                {user?.nombre || localStorage.getItem('nombre') || localStorage.getItem('email') || "Invitado"}
                            </Typography>
                        </Typography>
                        <Button
                            sx={{
                                background: 'var(--darkgreen-color)',
                                color: 'white',
                                gap: 0.5,
                                fontWeight: 600,
                                '&:hover': {
                                    background: 'var(--hoverdarkgreen-color)'
                                }
                            }}
                            onClick={()=> navigate('/ourService')}>
                            {isMobile ? 'Planes' : 'Nuestros planes'}
                        </Button>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <IoMdSettings size={24} color="white" style={{ cursor: 'pointer' }} onClick={() => navigate('/settings')} />
                            <MdLogout size={24} color="white" style={{ cursor: 'pointer' }} onClick={() => navigate('/logout')} />
                        </Box>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
