import { Fab } from '@mui/material';
import { FaWhatsapp } from 'react-icons/fa';

export function WhatsAppButton({ phone = '593999495379' }) {
  const url = `https://wa.me/${phone}`;

  return (
    <Fab
      color="success"
      aria-label="WhatsApp"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 9999,
        width: 56,
        height: 56,
      }}
    >
      <FaWhatsapp size={24} />
    </Fab>
  );
}
