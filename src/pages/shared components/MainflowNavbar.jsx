import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";

export default function MainflowNavbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 1024);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const navigate = useNavigate()
  const menuItems = [
    {
      label: 'Inicio',
      route: '/'
    },
    {
      label: 'Galería',
      route: '/galeria'
    },
    {
      label: 'Nosotros',
      route: '/nosotros'
    },
    {
      label: 'Contacto',
      route: '/contacto'
    },
  ];

  useEffect(() => {
    const path = location.pathname;
    if (path == '/') {
      setClicked('Inicio')
    } else if (path == '/galeria') {
      setClicked('Galería')
    } else if (path === '/nosotros') {
      setClicked('Nosotros')
    } else if (path == '/contacto') {
      setClicked('Contacto')
    } else {
      setClicked('')
    }
  }, [location.pathname])

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#8CB5AA",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", cursor: 'pointer' }} onClick={() => {
          navigate('/')
          setClicked('Inicio')
        }}>
          <img
            src={`${import.meta.env.VITE_BASE_URL}/images/logo-invet.png`}
            alt="Logo"
            style={{ height: 40, marginRight: 8 }}
          />
        </Box>

        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            {menuItems.map((item, index) => (
              <Typography
                key={item.label}
                variant="button"
                sx={{
                  color: "#fff",
                  fontWeight: "bold",
                  position: "relative",
                  cursor: "pointer",
                  "&::after": {
                    content: clicked === item.label ? '""' : "none",
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    width: "100%",
                    height: "3px",
                    backgroundColor: "#fff",
                    borderRadius: "2px",
                  },
                }}
                onClick={() => {
                  setClicked(item.label)
                  navigate(item.route)
                }}
              >
                {item.label}
              </Typography>
            ))}
          </Box>
        )}

        {!isMobile && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#2C7A7B",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#256d6d" },
              }}
              onClick={() => { navigate('/servicios') }}
            >
              Nuestros servicios
            </Button>
            {localStorage.getItem('email') ? (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2C7A7B",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#256d6d" },
                  gap: 1
                }}
                onClick={() => { navigate('/dashboard') }}
              >
                <Box sx={{ borderRadius: '100%', backgroundColor: 'var(--darkgreen-color)', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={`${import.meta.env.VITE_BASE_URL}/images/user-avatar.png`} alt="User Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>Mi perfil</Typography>
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2C7A7B",
                  borderRadius: "10px",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#256d6d" },
                }}
                onClick={() => { navigate('/login') }}
              >
                Ingresar
              </Button>
            )}
          </Box>
        )}

        {isMobile && (
          <IconButton onClick={() => setOpen(true)} sx={{ color: "#fff" }}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>

      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250, p: 2 }}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.label} disablePadding
                onClick={() => {
                  navigate(item.route)
                  setOpen(false)
                }}
              >
                <ListItemButton>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: "#2C7A7B" }} onClick={() => { navigate('/servicios') }}>
              Nuestros servicios
            </Button>
            {localStorage.getItem('email') ? (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2C7A7B",
                  borderRadius: "3px",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#256d6d" },
                  gap: 1
                }}
                onClick={() => { navigate('/dashboard') }}
              >
                <Box sx={{ borderRadius: '100%', backgroundColor: 'var(--darkgreen-color)', width: '30px', height: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <img src={`${import.meta.env.VITE_BASE_URL}/images/user-avatar.png`} alt="User Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                </Box>
                <Typography sx={{ fontSize: '0.9rem', textTransform: 'uppercase' }}>Mi perfil</Typography>
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2C7A7B",
                  borderRadius: "3px",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#256d6d" },
                }}
                onClick={() => { navigate('/login') }}
              >
                Ingresar
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
    </AppBar>
  );
}
