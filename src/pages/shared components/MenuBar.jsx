// components/MenuBar.jsx
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { IoMdSettings } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function MenuBar() {
    const { user, login } = useAuth()
    const isMobile = window.innerWidth <= 600;
    const navigate = useNavigate()

    return (
        <AppBar position="static" sx={{ width: '100%', }}>
            <Toolbar sx={{ background: 'var(--secondary-color)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingX: '16px', paddingY: '8px' }}>
                    <Box>
                        <Box component="img" src="/images/logo-invet.png" sx={{ height: '2.5rem', cursor: 'pointer' }} onClick={()=> navigate('/')} />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center' }}>
                        {!isMobile && <Box sx={{ borderRadius: '100%', backgroundColor: 'var(--darkgreen-color)', width: '40px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src="/images/user-avatar.png" alt="User Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                        </Box>
                        }
                        <Typography variant="span" sx={{ flexGrow: 1, color: 'white' }}>
                            {!isMobile && ' Bienvenido/a, '}
                            <Typography component="span" sx={{ fontWeight: 'bold', color: 'white' }}>
                                {user ? user.name : "Invitado"}
                            </Typography>
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <IoMdSettings size={24} color="white" style={{cursor: 'pointer'}} onClick={() => navigate('/settings')}/>
                            <MdLogout size={24} color="white" style={{ cursor: 'pointer'}}onClick={()=> navigate('/logout')} />
                        </Box>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
}
