import { TextField, Typography, Box, Select, MenuItem, Tooltip, InputAdornment, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export function DataInput({ label, placeholder, setData, formLabel, type, value, errorMessage, disabled, isMandatory = true }) {
    return (
        <Box>
            <Typography
                sx={{
                    color: 'var(--blackinput-color)',
                    fontWeight: 600,
                    fontSize: '1rem',
                }}
            >
                {isMandatory && <span style={{color: 'red', paddingRight: 5}}>*</span>}
                {label}
            </Typography>
            <Box sx={{ position: 'relative', width: '100%' }}>
                {errorMessage && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '-1.5rem',
                            right: 0,
                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                            color: '#d32f2f',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            border: '1px solid rgba(211, 47, 47, 0.4)',
                            zIndex: 10,
                        }}
                    >
                        {errorMessage}
                    </Box>

                )}

                <TextField
                    value={value}
                    fullWidth
                    placeholder={placeholder}
                    size="small"
                    type={type}
                    onChange={(e) => {
                        const value = e.target.value;
                        setData((prev) => ({
                            ...prev,
                            [formLabel]: value
                        }));
                    }}
                    sx={{
                        '& .MuiInputBase-root': {
                            padding: '4px 8px',
                            fontSize: '0.875rem',
                        },
                        '& input': {
                            padding: '6px 8px',
                        },
                    }}
                    disabled={disabled}
                />

            </Box>


        </Box>
    )
}


export function DataSelect({ label, value, setData, formLabel, errorMessage, isDisabled = false }) {
    return (
        <Box>
            <Typography
                sx={{
                    color: 'var(--blackinput-color)',
                    fontWeight: 600,
                    fontSize: '1rem',
                }}
            >
                {label}
            </Typography>
            <Box sx={{ position: 'relative', width: '100%' }}>
                {errorMessage && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '-1.5rem',
                            right: 0,
                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                            color: '#d32f2f',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            border: '1px solid rgba(211, 47, 47, 0.4)',
                            zIndex: 10,
                        }}
                    >
                        {errorMessage}
                    </Box>

                )}
                <Select
                    fullWidth
                    value={value || ''}
                    size="small"
                    onChange={(e) => {
                        setData((prev) => ({
                            ...prev,
                            [formLabel]: e.target.value
                        }));
                    }}
                    displayEmpty
                    disabled={isDisabled}
                    sx={{
                        '& .MuiInputBase-root': {
                            padding: '4px 8px',
                            fontSize: '0.875rem',
                        },
                    }}
                >
                    <MenuItem value="" disabled>Selecciona una opción</MenuItem>
                    <MenuItem value="Guayaquil">Guayaquil</MenuItem>
                    <MenuItem value="Samborondón">Samborondón</MenuItem>
                    <MenuItem value="Durán">Durán</MenuItem>
                    <MenuItem value="Chongón">Chongón</MenuItem>
                </Select>
            </Box>
        </Box>
    );
}


export function PasswordLabelWithTooltip({ setData, label, placeholder, formLabel, errorMessage, value, showTooltip = false }) {
    const [showPassword, setShowPassword] = useState()
    const handleTogglePassword = () => setShowPassword((prev) => !prev);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}
        >

            <Box
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: 'var(--blackinput-color)',
                    }}
                >
                    {label}
                </Typography>

                <Tooltip
                    title={
                        <Box
                            sx={{
                                fontSize: '0.875rem',
                                lineHeight: 1.4,
                                color: '#fff',
                                opacity: showTooltip ? '100' : '0'
                            }}
                        >
                            La contraseña debe tener al menos:
                            <ul style={{ margin: '0.25rem 0 0', paddingLeft: '1rem' }}>
                                <li>8 caracteres</li>
                                <li>1 mayúscula</li>
                                <li>1 minúscula</li>
                                <li>1 número</li>
                            </ul>
                        </Box>
                    }
                    arrow
                    placement="right"
                >
                    <IconButton
                        size="small"
                        sx={{
                            padding: '0.15rem',
                            color: 'var(--darkgreen-color)',
                            opacity: showTooltip ? '100' : '0'
                        }}
                    >
                        <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>

            <Box sx={{ position: 'relative', width: '100%' }}>
                {errorMessage && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '-1.5rem',
                            right: 0,
                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                            color: '#d32f2f',
                            padding: '0.3rem 0.6rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            border: '1px solid rgba(211, 47, 47, 0.4)',
                            zIndex: 10,
                        }}
                    >
                        {errorMessage}
                    </Box>

                )}

                <TextField
                    value={value}
                    fullWidth
                    placeholder={placeholder}
                    type={showPassword ? 'text' : 'password'}
                    size="small"
                    onChange={(e) => {
                        setData((prev) => ({
                            ...prev,
                            [formLabel]: e.target.value
                        }));
                    }}
                    sx={{
                        '& .MuiInputBase-root': {
                            padding: '4px 8px',
                            fontSize: '0.875rem',
                        },
                        '& input': {
                            padding: '6px 8px',
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

        </Box>
    );
}