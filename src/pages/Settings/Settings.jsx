import React, { useState } from 'react';
import { Box, Divider, Button, Typography } from '@mui/material';
import { DataInput, PasswordLabelWithTooltip, DataSelect } from '../shared components/Inputs';
import { FaPencilAlt, FaRegSave } from "react-icons/fa";
import { CancelButton } from '../shared components/Buttons';

export default function Settings() {
    const isMobile = window.innerWidth <= 600;
    const [formData, setFormData] = useState({})
    const [password, newPassword] = useState({})
    const [errors, setErrors] = useState({})
    const [isEditable, setIsEditable] = useState(false)
    const passwords = [
        {
            label: 'Contraseña actual',
            placeholder: 'Ingrese su contraseña',
            formData: 'old'
        },
        {
            label: 'Contraseña nueva',
            placeholder: 'Ingrese la nueva contraseña',
            formData: 'newpassword'
        },
    ]

    const settingsFields = [
        {
            label: 'Nombres completos',
            placeholder: 'Maria Alejandra',
            formData: 'firstNames',
            type: 'text'
        },
        {
            label: 'Apellidos completos',
            placeholder: 'Lopez Diaz',
            formData: 'firstNames',
            type: 'text'
        },
        {
            label: 'E-mail',
            placeholder: 'maalejandra@gmail.com',
            formData: 'email',
            type: 'text'

        },
        {
            label: 'Celular',
            placeholder: '0975537486',
            formData: 'phone',
            type: 'number'
        },
        {
            label: 'Cédula',
            placeholder: '06394653748',
            formData: 'idnumber',
            type: 'number'
        },
        {
            label: 'Ciudad',
            placeholder: 'Guayaquil',
            formData: 'city'
        },
        {
            label: 'Dirección',
            placeholder: 'Ej. Samanes 5 Mz. 2 villa 3',
            formData: 'address'
        },
    ]

    return (
        <Box sx={{ backgroundColor: 'var(--primary-color)', minHeight: '90vh', display: 'flex', justifyContent: 'center', paddingBottom: '1.5rem' }}>
            <Box
                sx={{
                    width: '85%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box
                    sx={{
                        padding: '1.5rem',
                        marginLeft: isMobile ? 0 : '3rem',
                        color: 'var(--blackinput-color)',
                        fontWeight: 'bold',
                        width: '100%',
                    }}
                >
                    <h1 style={{ margin: 0 }}>Ajustes</h1>
                </Box>

                <Box
                    sx={{
                        padding: '1.5rem',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        width: '90%',
                        height: 'max-content'
                    }}>
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${isMobile ? 1 : 2}, 1fr)`,
                            gap: '1rem',
                            marginBottom: '1.5rem'
                        }}
                    >
                        {settingsFields.map((field, i) => (
                            field.formData === 'city' ? (
                                <DataSelect
                                    key={i}
                                    label="Ciudad"
                                    setData={setFormData}
                                    formLabel="city"
                                    value={formData.city}
                                    errorMessage={errors.city}
                                    isDisabled={!isEditable}
                                />
                            ) : (
                                <DataInput
                                    key={i}
                                    label={field.label}
                                    placeholder={field.placeholder}
                                    setData={setFormData}
                                    formLabel={field.formData}
                                    type={field.type}
                                    errorMessage={errors[field.formData]}
                                    value={formData[field.formData]}
                                    disabled={!isEditable}
                                />
                            )
                        ))}

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 'auto' }}>
                            <Button
                                sx={{
                                    border: '0.1rem solid var(--secondary-color)',
                                    background: isEditable ? 'var(--secondary-color)' : 'transparent',
                                    borderRadius: '0.6rem',
                                    color: isEditable ? 'white' : 'var(--secondary-color)',
                                    fontWeight: 600,
                                    width: isMobile ? '100' : '60%',
                                    minWidth: 'min-content',
                                    gap: '1rem',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    '&:hover': {
                                        backgroundColor: isEditable ? 'var(--darkgreen-color)' : 'var(--secondary-color)',
                                        border: isEditable ? '0.1rem solid var(--darkgreen-color)' : '0.1rem solid var(--secondary-color)',
                                        color: 'white'
                                    }
                                }}
                                onClick={() => setIsEditable(!isEditable)}>
                                {!isEditable ? (
                                    <>
                                        <FaPencilAlt /> Editar información
                                    </>
                                ) : (
                                    <>
                                        <FaRegSave /> Guardar información
                                    </>
                                )}
                            </Button>
                        </Box>
                    </Box>
                    <Divider />
                    <Box sx={{ paddingTop: '1rem' }}>
                        <Typography
                            variant='h5'
                            sx={{
                                color: 'var(--blackinput-color)',
                                fontWeight: 600
                            }}>
                            Editar contraseña
                        </Typography>
                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: isMobile ? '1fr' : '2fr 2fr 1fr',
                                marginY: '1rem',
                                borderRadius: '0.3rem',
                                gap: '1rem',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >

                            <PasswordLabelWithTooltip label={'Contraseña actual'} placeholder={'********'} />
                            <PasswordLabelWithTooltip label={'Nueva contraseña'} placeholder={'********'} showTooltip={false} />
                            <Button
                                sx={{
                                    background: 'var(--error-fill-color)',
                                    color: 'white',
                                    fontWeight: 600,
                                    width: '100%',
                                    '&:hover': {
                                        backgroundColor: 'var(--error-fill-hover-color)'
                                    },
                                    paddingY: '0.5rem',
                                    marginTop: 'auto'
                                }}>
                                Cambiar
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box >

    )
}