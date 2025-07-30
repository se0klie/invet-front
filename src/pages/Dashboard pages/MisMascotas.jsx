import { Box, Button, Typography, Modal } from "@mui/material"
import { useState, useEffect } from "react";
import EmptyPet from "./EmptyPet";
import { AddPet, LightGreenButton } from '../../pages/shared components/Buttons'
import PetBox from "../../pages/shared components/PetBox"
import { DataInput } from "../../pages/shared components/Inputs";
import { RxCross1 } from "react-icons/rx";
import { useMediaQuery, useTheme } from '@mui/material'
export default function MisMascotas() {
    const [pets, setPets] = useState([
        {
            name: 'Firulais',
            status: 'Activo',
            plan: 'Básico',
        },
        {
            name: 'Tuco',
            status: 'Activo',
            plan: 'Básico',
        },
        {
            name: 'Otto',
        }
    ]);
    const [addPetModal, setAddPetModal] = useState(false);
    const [newPetData, setNewPetData] = useState({ image: undefined });
    const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Solo se permiten imágenes.');
            return;
        }

        if (file.size > 2 * 1024 * 1024) { // 2MB
            alert('La imagen no debe superar 2MB.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => setNewPetData((prev) => ({
            ...prev,
            image: reader.result
        }));
        reader.readAsDataURL(file);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '72vh', margin: '1.5rem', overflowY: 'hidden' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography
                        variant="h5"
                        sx={{
                            color: 'var(--blackinput-color)',
                            fontWeight: 'bold',
                        }}
                    >
                        Mascotas registradas
                    </Typography>
                </Box>
                <AddPet action={() => { setAddPetModal(true) }} />
            </Box>


            <Box sx={{ flex: 1, mt: '1rem', overflow: 'hidden' }}>
                {pets.length === 0 ? (
                    <Box sx={{ justifyContent: 'center', alignItems: 'center' }}>
                        <EmptyPet />
                    </Box>

                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            justifyContent: 'flex-start',
                            overflowY: 'auto',
                            height: '100%',
                            '&::-webkit-scrollbar': {
                                width: '6px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#c1c1c1',
                                borderRadius: '3px',
                            },
                        }}
                    >
                        {pets.map((pet, index) => (
                            <PetBox
                                key={index}
                                petName={pet.name}
                                status={pet.status}
                                plan={pet.plan}
                                pets={pets}
                            />
                        ))}
                    </Box>
                )}
            </Box>
            <Modal
                open={addPetModal}
                onClose={() => setAddPetModal(false)}
                disableEnforceFocus={true}
                disableBackdropClick={false}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        width: { xs: '70%', md: 500, lg: 600 },
                    }}
                >
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'var(--darkgreen-color)' }}>
                                Añadir mascota
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'gray' }}>
                                Ingresa los datos necesarios para registrar a tu mascota
                            </Typography>
                        </Box>

                        <RxCross1
                            style={{ color: 'black', cursor: 'pointer' }}
                            onClick={() => setAddPetModal(false)}
                        />
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            gap: '1rem',
                            marginTop: '1rem',
                            maxHeight: '60vh',
                            overflowY: 'auto',
                            flexDirection: isMobile ? 'column' : 'row',
                        }}
                    >
                        <Box
                            sx={{
                                flexBasis: '60%',
                                flexGrow: 0,
                                flexShrink: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem',
                                paddingY: '1rem',
                            }}
                        >
                            <DataInput
                                label={'Nombre'}
                                placeholder={'Ej. Pelusita'}
                                setData={setNewPetData}
                                value={newPetData.name}
                                type={'text'}
                                formLabel={'name'}
                            />
                            <DataInput
                                label={'Raza'}
                                placeholder={'Ej. Pooddle'}
                                setData={setNewPetData}
                                value={newPetData.breed}
                                type={'text'}
                                formLabel={'breed'}
                            />

                            <DataInput
                                label={'Fecha de nacimiento'}
                                setData={setNewPetData}
                                value={newPetData.birthDate}
                                formLabel={'birthdate'}
                                type={'date'}
                            />
                        </Box>

                        <Box
                            sx={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '1rem',
                            }}
                        >
                            <Typography variant="p" sx={{ fontWeight: 'bold', color: 'var(--blackinput-color)' }}>
                                Subir foto (opcional)
                            </Typography>
                            <Box
                                sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' }}>
                                <Box>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                        id="pet-image-upload"
                                    />
                                    <label htmlFor="pet-image-upload">
                                        <Box
                                            component="div"
                                            sx={{
                                                width: isMobile ? '70px' : '120px',
                                                height: isMobile ? '70px' : '120px',
                                                borderRadius: '50%',
                                                backgroundColor: 'var(--disabled-color)',
                                                overflow: 'hidden',
                                                cursor: 'pointer',
                                                border: '2px dashed #ccc',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                '&:hover': {
                                                    borderColor: 'var(--secondary-color)',
                                                },
                                            }}
                                        >
                                            {newPetData.image ? (
                                                <img
                                                    src={newPetData.image}
                                                    alt="Vista previa"
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <span style={{ color: '#777', fontSize: '0.8rem', textAlign: 'center' }}>
                                                    Subir Foto
                                                </span>
                                            )}
                                        </Box>
                                    </label>
                                </Box>
                                <LightGreenButton text='Añadir' />
                            </Box>
                        </Box>
                    </Box>

                    
                </Box>
            </Modal>
        </Box >

    )
}
