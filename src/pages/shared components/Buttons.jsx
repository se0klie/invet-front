import { Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export function NextButton({ action, isSend = false, disabled = false }) {
    return (
        <Button
            disabled={disabled}
            sx={{
                backgroundColor: disabled ? 'var(--gray-color)' : 'var(--darkgreen-color)',
                color: 'white',
                borderRadius: '8px',
                fontWeight: 600,
                paddingX: '1rem',
                paddingY: '0.5rem',
                '&:hover': {
                    backgroundColor: 'var(--hoverdarkgreen-color)',
                    color: '#eee',
                },
                width: '100%'
            }}
            onClick={action}
        >
            {isSend ? 'Enviar' : 'Siguiente'}
            <ArrowForwardIosIcon sx={{ fontSize: '1rem', paddingLeft: '1rem' }} />
        </Button>
    )
}

export function DarkGreenButton({ text, action, disabled = false }) {
    return (
        <Button
            disabled={disabled}
            sx={{
                backgroundColor: 'var(--darkgreen-color)',
                color: 'white',
                fontWeight: 600,
                paddingX: '1rem',
                paddingY: '0.5rem',
                width: '100%',
                '&:hover': {
                    backgroundColor: 'var(--hoverdarkgreen-color)',
                    color: '#eee',
                },
            }}
            onClick={action}
        >
            {text}
        </Button>
    )
}


export function GrayButton({ action, text, disabled = false }) {
    return (
        <Button
            disabled={disabled}
            sx={{
                color: 'var(--gray-color)',
                borderRadius: '8px',
                fontWeight: 600,
                paddingX: '1rem',
                background: 'transparent',
                border: ' 0.2rem solid var(--gray-color)',
                '&:hover': {
                    border: ' 0.2rem solid var(--dark-gray-color)',
                    color: 'var(--dark-gray-color)'
                },
                width: '100%'
            }}
            onClick={action}
        >
            {text}
        </Button>
    )
}


export function LightGreenButton({ action, text, disabled = false }) {
    return (
        <Button
            disabled={disabled}
            sx={{
                background: 'var(--secondary-color)',
                color: 'white',
                borderRadius: '8px',
                fontWeight: 600,
                paddingX: '1rem',
                width: '100%',
                whiteSpace: 'nowrap',
                '&:hover': {
                    background: 'var(--darkgreen-color)',
                },
                '@media (max-width:600px)': {
                    minWidth: 'auto',
                    whiteSpace: 'wrap',
                },

            }}
            onClick={action}

        >
            {text}
        </Button>
    )
}
export function PreviousButton({ action, isBrighter = false, disabled = false }) {
    return (
        <Button
            disabled={disabled}
            sx={{
                opacity: disabled ? '40%' : '100%',
                color: isBrighter ? 'var( --dark-gray-color)' : 'var(--gray-color)',
                borderRadius: '8px',
                fontWeight: 600,
                paddingX: '1rem',
                background: 'transparent',
                border: ` 0.15rem solid ${isBrighter ? 'var( --dark-gray-color)' : 'var(--gray-color)'}`,
                width: '100%',
                '&:hover': {
                    border: ` 0.15rem solid ${isBrighter ? 'var(--dark-gray-hover-color)' : 'var(--dark-gray-color)'}`,
                    color: isBrighter ? 'var(--dark-gray-hover-color)' : 'var(--gray-color)',
                },

            }}

            onClick={action}
        >
            <ArrowBackIosIcon sx={{ fontSize: '1rem', paddingRight: '1rem', }} />
            Anterior
        </Button>
    )
}