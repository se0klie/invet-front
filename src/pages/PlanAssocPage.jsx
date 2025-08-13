import { Box, Typography, Button, Select, MenuItem, Snackbar, Alert } from "@mui/material"
import { useState, useEffect } from "react"
import { DataInput } from "./shared components/Inputs";
import { YellowAlert } from "./shared components/Alerts";
import { LightGreenButton } from "./shared components/Buttons";
import { LuCirclePlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { LoadingModal } from "./shared components/Modals";
export default function PetPlanAssociation() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0)
    const [open, setOpen] = useState(false);
    const [plans, setPlans] = useState({
        basic: {
            plan: 'basic',
            label: 'Básico',
            quantity: 2,
        },
        premium: {
            plan: 'premium',
            label: 'Premium',
            quantity: 0
        },
        onsite: {
            plan: 'onsite',
            label: 'Presencial',
            quantity: 0
        }
    })

    const [pets, setPets] = useState([
        {
            name: 'Tuco',
            breed: 'Bull Terrier',
            birthdate: '01/10/2010'
        },
        {
            name: 'Tuco',
            breed: 'Bull Terrier',
            birthdate: '01/10/2010'
        }
    ])
    const totalQuantity = Object.values(plans)
        .reduce((sum, plan) => sum + plan.quantity, 0);

    useEffect(() => {
        if (step === 0 && pets.length < totalQuantity) {
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
            }, 5000);
        }
    }, [])

    // TODO: check if user has any pets and the quantity is less or equal to the number of plans to pay
    return (
        <Box
            sx={{
                backgroundColor: "var(--primary-color)",
                color: "var(--secondary-color)",
                height: '90vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                py: 5
            }}
        >
            {step === 0 &&
                <Box sx={{ gap: 2, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography variant="h5" sx={{ color: 'var(--darkgreen-color)', fontWeight: 600 }}>Asignar planes a mascota</Typography>
                    <AsignPlanToPet pets={pets} plans={plans} setStep={setStep} />
                </Box>
            }
            {step === 1 &&
                <Box sx={{ gap: 2, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography variant="h5" sx={{ color: 'var(--darkgreen-color)', fontWeight: 600 }}>Registrar mascota</Typography>
                    <AddPet pets={pets} plans={plans} setStep={setStep} />
                </Box>
            }

            <Box
                sx={{
                    mt: 5,
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: 2,
                }}
            >
                <Button
                    variant="outlined"
                    sx={{ minWidth: 120, borderColor: 'var(--dark-gray-hover-color)', color: 'var(--dark-gray-hover-color)' }}
                    onClick={() => {
                        if (step === 0) {
                            navigate('/ourService')
                        } else {
                            setStep(step - 1)
                        }
                    }}
                >
                    Regresar
                </Button>
                <Button
                    variant="contained"
                    disabled={ pets.length < totalQuantity}
                    sx={{ minWidth: 120, background: 'var(--darkgreen-color)', fontWeight: 600 }}
                >
                    Continuar
                </Button>
            </Box>
            <Snackbar open={open} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert
                    onClose={() => setOpen(false)}
                    severity="error" 
                    sx={{ width: '100%' }}
                >
                    Necesitas registrar nuevas mascotas antes de continuar.
                </Alert>
            </Snackbar>


        </Box>
    )
}

function AddPet({ pets, plans, setStep }) {
    const totalQuantity = Object.values(plans)
        .reduce((sum, plan) => sum + plan.quantity, 0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [numMascotas, setNumMascotas] = useState(totalQuantity - pets.length)
    const [petData, setPetData] = useState({
        name: '',
        breed: '',
        image: undefined
    })
    const [newPets, setNewPets] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [loadingModalStep, setLoadingModalStep] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            setLoadingModalStep(1)
            setTimeout(() => {
                setShowModal(false)
                setLoadingModalStep(0)
            }, 2500);
        }, 3000);
    }, [showModal])

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
        reader.onload = () => setPetData((prev) => ({
            ...prev,
            image: reader.result
        }));
        reader.readAsDataURL(file);
    };

    return (
        <Box sx={{ background: 'white', width: isMobile ? '60%' : '50%', borderRadius: 5, px: 3, py: 4 }}>
            <YellowAlert message={`Necesitas agregar ${numMascotas} mascota(s) antes de continuar`} />
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', mt: 2, alignItems: 'center', gap: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '80%' }}>
                    <DataInput label="Nombre" placeholder='Ej. Pelusa' setData={setPetData} formLabel={'name'} value={petData.name} />
                    <DataInput label="Raza" placeholder='Ej. Mestiza' setData={setPetData} formLabel={'breed'} value={petData.breed} />
                    <DataInput label="Fecha estimada de nacimiento" type="date" setData={setPetData} formLabel={'birthdate'} value={petData.birthdate} />
                </Box>
                <Box sx={{ mx: 1 }}>
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
                                width: isMobile ? '90px' : '150px',
                                height: isMobile ? '90px' : '150px',
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
                            {petData.image ? (
                                <img
                                    src={petData.image}
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
                    <Box sx={{ mt: 3 }}>
                        <LightGreenButton text='Añadir' action={
                            () => {
                                if (numMascotas=== 0) {
                                    setNewPets(prev => [...prev, petData]);
                                    setShowModal(true)

                                } else {
                                    setNewPets(prev => [...prev, petData]);
                                    setPetData({
                                        name: '',
                                        breed: '',
                                        image: undefined
                                    })
                                    setNumMascotas(numMascotas - 1)
                                }
                            }
                        } />
                    </Box>
                </Box>
            </Box>
            <LoadingModal text={numMascotas === 0 ? 'Guardando registro(s)...' : 'Cargando siguiente mascota...'} open={showModal} setOpen={setShowModal} modalStep={loadingModalStep} />
        </Box>
    )
}

function AsignPlanToPet({ pets, plans, setStep }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [data, setData] = useState({})

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Box sx={{ background: 'white', width: isMobile ? '60%' : '50%', borderRadius: 5, padding: 5 }}>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: 'var(--extra-light-gray-color)',
                                color: 'black',
                                fontWeight: 600,
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                gap: '0.5rem',
                                border: '0.5px solid gray',
                            }}
                        >
                            <Typography sx={{ fontWeight: 500 }}>
                                Asigna el/los plan(es) a la(s) mascota(s) de tu preferencia
                            </Typography>
                        </Box>
                        <Box sx={{ my: 'auto' }}>
                            {isMobile ? (
                                <LuCirclePlus size={32} onClick={() => setStep(1)} style={{ cursor: 'pointer' }} />
                            ) : (
                                <Button sx={{ background: 'var(--secondary-color)', color: 'white', fontWeight: 600, '&:hover': { backgroundColor: 'var(--darkgreen-color)' }, gap: 2, cursor: 'pointer' }} onClick={() => setStep(1)}>
                                    <FiPlus /> Añadir mascota
                                </Button>
                            )}
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', flexDirection: isMobile ? 'column' : 'row' }}>
                        {Object.entries(plans).map(([planKey, planData], index) => (
                            <Box sx={{ width: '100%' }}>
                                <Typography
                                    sx={{
                                        color: 'var(--blackinput-color)',
                                        fontWeight: 600,
                                        fontSize: '1rem',
                                    }}
                                >
                                    Plan #{index + 1}: {planData.label}
                                </Typography>
                                <Select
                                    key={planKey}
                                    fullWidth
                                    value={data[planKey] || ''}
                                    size="small"
                                    onChange={(e) => {
                                        setData((prev) => ({
                                            ...prev,
                                            [planData.plan]: e.target.value
                                        }));
                                    }}
                                    displayEmpty
                                    sx={{
                                        '& .MuiInputBase-root': {
                                            padding: '4px 8px',
                                            fontSize: '0.875rem',
                                        },
                                    }}
                                >
                                    <MenuItem value="" disabled>Selecciona una opción</MenuItem>
                                    {pets.map((pet) => (
                                        <MenuItem key={pet.name} value={pet.name}>
                                            {pet.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Box>
                        ))}
                    </Box>

                </Box>
            </Box>
        </Box>
    )
}