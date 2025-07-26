import { Button, Typography } from "@mui/material";
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

export function AddPet({ action }) {
    return (
        <Button sx={{
            borderColor: 'var(--secondary-color)', borderWidth: '2px', borderRadius: '2rem', borderStyle: 'solid', padding: '10px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
            color: 'var(--secondary-color)',
            fontWeight: 600,
            '&:hover': {
                borderColor: 'transparent',
                backgroundColor: 'var(--secondary-color)',
                color: 'white',
                fontWeight: 600
            },
        }}
            onClick={action}>
            Agregar mascota
        </Button >
    )
}

export function CancelButton({ action, disabled = false, fill = false }) {
    return (
        <Button
            sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                opacity: disabled ? 0.4 : 1,
                color: 'var(--error-color)',
                borderRadius: '8px',
                fontWeight: 600,
                paddingX: '0.5rem',
                backgroundColor: 'transparent',
                border: '0.15rem solid var(--error-color)',
                width: '80%',
                transition: 'all 0.2s ease-in-out',
                fontSize: '0.675rem',
                '&:hover': {
                    backgroundColor: 'var(--error-color)',
                    color: 'white',
                    borderColor: 'var(--error-color)',
                },
                '&:disabled': {
                    cursor: 'not-allowed',
                }
            }}
            disabled={disabled}
            onClick={action}
        >
            Cancelar plan
        </Button>
    );
}
