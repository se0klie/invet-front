import { Fab } from '@mui/material';
import { FaWhatsapp } from 'react-icons/fa';

export function WhatsAppButton({ phone = '593999495379' }) {
  const url = `https://wa.me/${phone}`;

  return (
    <Fab
      aria-label="WhatsApp"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        background: 'var(--primary-color)',
        position: 'fixed',
        bottom: 16,
        left: 16,
        zIndex: 9999,
        width: 56,
        height: 56,
        border: '2px solid var(--darkgreen-color)'
      }}
    >
      <FaWhatsapp size={24}  style={{color: 'var(--darkgreen-color)'}}/>
    </Fab>
  );
}
