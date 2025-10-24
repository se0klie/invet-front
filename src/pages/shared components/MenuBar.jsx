import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { IoMdSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function MenuBar() {
    const { user } = useAuth()
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
        <AppBar position="static" sx={{ width: '100%' }}>
            <Toolbar sx={{ background: 'var(--secondary-color)', minHeight: isMobile ? 56 : 64 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', px: 2 }}>

                    {/* Logo */}
                    <Box component="img"
                        src={`${import.meta.env.VITE_BASE_URL}/images/logo-invet.png`}
                        sx={{ height: '2.5rem', cursor: 'pointer' }}
                        onClick={() => navigate('/')}
                    />

                    {/* Right Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1 : 2 }}>

                        {/* Avatar */}
                        <Box
                            sx={{
                                borderRadius: '50%',
                                backgroundColor: 'var(--darkgreen-color)',
                                width: 40,
                                height: 40,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer'
                            }}
                            onClick={() => navigate('/settings')}
                        >
                            <img
                                src={`${import.meta.env.VITE_BASE_URL}/images/user-avatar.png`}
                                alt="User Avatar"
                                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                            />
                        </Box>

                        {/* Welcome Text */}
                        {!isMobile && (
                            <Typography sx={{ mr: 1, color: 'white', fontWeight: 500 }}>
                                Bienvenido/a, {user?.nombre || localStorage.getItem('nombre') || localStorage.getItem('email') || "Invitado"}
                            </Typography>
                        )}

                        {/* Planes Button */}
                        <Button
                            sx={{
                                background: 'var(--darkgreen-color)',
                                color: 'white',
                                gap: 0.5,
                                fontWeight: 600,
                                '&:hover': { background: 'var(--hoverdarkgreen-color)' }
                            }}
                            onClick={() => navigate('/servicios')}
                        >
                            {isMobile ? 'Planes' : 'Nuestros planes'}
                        </Button>

                        {/* Settings & Logout */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IoMdSettings size={24} color="white" style={{ cursor: 'pointer' }} onClick={() => navigate('/settings')} />
                            <MdLogout size={24} color="white" style={{ cursor: 'pointer' }} onClick={() => navigate('/logout')} />
                        </Box>

                    </Box>
                </Box>
            </Toolbar>
        </AppBar>

    );
}
