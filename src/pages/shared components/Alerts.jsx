import { Box, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export function YellowAlert({ message, fromDashboard = false }) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 249, 196, 0.3)',
                color: '#FBC02D',
                padding: '0.75rem 1rem',
                paddingY: fromDashboard ? '0rem' : '',
                borderRadius: '8px',
                gap: '0.5rem',
                border: '1px solid rgba(251, 192, 45, 0.4)',
            }}
        >
            <WarningAmberIcon sx={{ fontSize: '1.5rem' }} />
            <Typography sx={{ fontWeight: 500, fontSize: fromDashboard ? '1rem' : '' }}>
                {message}
            </Typography>
        </Box>

    );
}
