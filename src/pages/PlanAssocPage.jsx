import { Box, Typography, Button, Select, MenuItem, Snackbar, Alert } from "@mui/material"
import { useState, useEffect } from "react"
import { DataInput, DataSelect } from "./shared components/Inputs";
import { YellowAlert } from "./shared components/Alerts";
import { LightGreenButton } from "./shared components/Buttons";
import { LuCirclePlus } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { LoadingModal } from "./shared components/Modals";
import { getPets, addPet,compressImage } from "../helpers/pets-helper";
import axios_api from "./axios";
import { endpoints } from "./endpoints";
import Cookies from "js-cookie";

export default function PetPlanAssociation() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0)
    const [open, setOpen] = useState(false);
    const location = useLocation()
    const plan_quantities = location?.state?.plans;
    const [plans, setPlans] = useState({
        basic: {
            plan: 'basic',
            label: 'Básico',
            quantity: 0,
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
    const [pets, setPets] = useState([])
    const totalQuantity = Object.values(plans)
        .reduce((sum, plan) => sum + plan.quantity, 0);
    const [allowContinue, setAllowContinue] = useState(false)
    const [updatedData, setUpdatedData] = useState({})

    const getAvailablePets = () => {
        return pets.filter(
            (pet) =>
                pet.subscripcion_id === null
        );
    };

    useEffect(() => {
        const newData = {};
        let counter = 1;
        Object.entries(plans).forEach(([planType, plan]) => {
            for (let i = 0; i < plan.quantity; i++) {
                newData[`${planType}-${i + 1}`] = "";
                counter++;
            }
        });
        setUpdatedData(newData);
    }, []);

    async function fetchPets() {
        try {
            const response = await getPets()
            if (response.length > 0) {
                setPets(response)
            }
        } catch (err) {
            console.error('Error in GET /pets', err)
            return err
        }
    }

    async function handleRefresh() {
        await fetchPets()
    }

    useEffect(() => {
        fetchPets()
        const newPlans = { ...plans };
        for (const key in plan_quantities) {
            newPlans[key] = {
                ...newPlans[key],
                quantity: plan_quantities[key]
            };
        }
        setPlans(newPlans);
    }, [plan_quantities]);

    useEffect(() => {
        const allFilled = Object.values(updatedData).every(value => value !== "") && Object.keys(updatedData).length === totalQuantity;
        setAllowContinue(allFilled && Object.keys(updatedData).length > 0);
    }, [updatedData]);

    useEffect(() => {
        const availablePets = getAvailablePets()
        if (step === 0 && availablePets.length < totalQuantity || availablePets.length === 0) {
            setOpen(true)
            setTimeout(() => {
                setOpen(false)
            }, 5000);
        }
    }, [])

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
                    <AsignPlanToPet pets={pets} plans={plans} setStep={setStep} setUpdatedData={setUpdatedData} updatedData={updatedData} />
                </Box>
            }
            {step === 1 &&
                <Box sx={{ gap: 2, width: '100%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography variant="h5" sx={{ color: 'var(--darkgreen-color)', fontWeight: 600 }}>Registrar mascota</Typography>
                    <AddPet pets={pets} plans={plans} setStep={setStep} refresh={async () => await handleRefresh()} />
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
                            navigate('/payment', { state: { plan: plans, from: 'plan-assoc' } })
                        } else {
                            setStep(step - 1)
                        }
                    }}
                >
                    Regresar
                </Button>

                {step !== 1 &&
                    <Button
                        onMouseEnter={() => {
                            if (pets.length < totalQuantity) {
                                setOpen(true)
                            }
                        }}
                        onClick={() => {
                            if (pets.length >= totalQuantity && allowContinue) {
                                navigate('/terms-conds', { state: { pets_plans: updatedData, back_info: plan_quantities } })
                            } else {
                                setOpen(true)
                            }
                        }}
                        sx={{ color: 'white', minWidth: 120, background: allowContinue ? 'var(--darkgreen-color)' : 'var(--disabled-color)', fontWeight: 600, boxShadow: 0, cursor: allowContinue ? 'pointer' : 'not-allowed' }}
                    >
                        Continuar
                    </Button>
                }
            </Box>
            <Snackbar open={open} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert
                    onClose={() => setOpen(false)}
                    severity="info"
                    sx={{ width: '100%' }}
                >
                    Selecciona mascotas o agrega nuevas mascotas.
                </Alert>
            </Snackbar>

        </Box>
    )
}

function AddPet({ pets, plans, setStep, refresh }) {
    const totalQuantity = Object.values(plans)
        .reduce((sum, plan) => sum + plan.quantity, 0);
    const [open, setOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [numMascotasNecesarias, setNumMascotasNecesarias] = useState(totalQuantity - pets.length)
    const [petData, setPetData] = useState({
        nombre: '',
        raza: '',
        fecha_nacimiento: '',
        ciudad: '',
        url: undefined
    })
    const [showModal, setShowModal] = useState(false)
    const [loadingModalStep, setLoadingModalStep] = useState(0)
    const [errors, setErrors] = useState({})

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

    function checkErrors() {
        let hasErrors = false;
        const newErrors = {};

        Object.entries(petData).forEach(([key, value]) => {
            if (!value && key !== 'url') {
                newErrors[key] = 'Este campo es necesario.';
                hasErrors = true;
            }
        })
        setErrors(newErrors);
        return hasErrors;
    }

    async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const compressed = await compressImage(file);
    setPetData((prev) => ({ ...prev, image: compressed }));
}


    return (
        <Box sx={{ background: 'white', width: isMobile ? '60%' : '50%', borderRadius: 5, px: 3, py: 4 }}>
            {numMascotasNecesarias > 0 &&
                <YellowAlert message={`Necesitas agregar ${numMascotasNecesarias} mascota(s) antes de continuar`} />
            }
            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', mt: 2, alignItems: 'center', gap: 5 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '80%' }}>
                    <DataInput label="Nombre" placeholder='Ej. Pelusa' setData={setPetData} formLabel={'nombre'} value={petData.nombre} errorMessage={errors['nombre']} />
                    <DataInput label="Raza" placeholder='Ej. Mestiza' setData={setPetData} formLabel={'raza'} value={petData.raza} errorMessage={errors['raza']} />
                    <DataInput label="Fecha estimada de nacimiento" type="date" setData={setPetData} formLabel={'fecha_nacimiento'} value={petData.fecha_nacimiento || ''} errorMessage={errors['fecha_nacimiento']} />
                    <DataSelect label="Ciudad" value={petData.ciudad} setData={setPetData} errorMessage={errors['ciudad']} formLabel={'ciudad'} />
                </Box>
                <Box sx={{ mx: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                        <LightGreenButton text='Guardar mascota' action={
                            async () => {
                                const hasErrors = checkErrors()
                                if (!hasErrors) {
                                    if (numMascotasNecesarias <= 1) {
                                        setShowModal(true)
                                        await addPet(petData.nombre, petData.raza, petData.fecha_nacimiento, petData.ciudad, petData.image)
                                        await refresh()
                                        setTimeout(() => {
                                            setStep(0)
                                        }, 3000);
                                    } else {
                                        await addPet(petData.nombre, petData.raza, petData.fecha_nacimiento, petData.ciudad, petData.image)
                                        setShowModal(true)
                                        setPetData({
                                            nombre: '',
                                            raza: '',
                                            fecha_nacimiento: '',
                                            ciudad: '',
                                            image: null,
                                        })
                                        setTimeout(() => {
                                            setShowModal(false)
                                        }, 2000);
                                        setNumMascotasNecesarias(numMascotasNecesarias - 1)
                                        setOpen(true)
                                    }
                                }
                            }
                        } />
                    </Box>
                </Box>
            </Box>
            <Snackbar open={open} onClose={() => setOpen(false)} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert
                    onClose={() => setOpen(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Mascota añadida correctamente.
                </Alert>
            </Snackbar>
            <LoadingModal text={numMascotasNecesarias === 1 ? 'Guardando registro(s)...' : 'Cargando...'} open={showModal} setOpen={setShowModal} modalStep={loadingModalStep} />
        </Box>
    )
}
function AsignPlanToPet({ pets, plans, setStep, setUpdatedData, updatedData }) {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
    const [subscriptionsClient, setSubscriptionsClient] = useState([])
    const [data, setData] = useState(updatedData ||
        Object.values(plans)
            .filter(plan => plan.quantity > 0)
            .reduce((acc, plan) => {
                for (let i = 1; i < plan.quantity; i++) {
                    acc[`${plan.plan}-${i}`] = '';
                }
                return acc;
            }, {})
    );
    const [subscriptions, setSubscriptions] = useState([])

    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 1024);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSelectPet = (planKey, id) => {
        setData((prev) => {
            const newData = { ...prev };

            Object.keys(newData).forEach((key) => {
                if (key !== planKey && newData[key] === id) {
                    newData[key] = "";
                }
            });

            newData[planKey] = id;
            setUpdatedData((prevUpdated) => ({
                ...prevUpdated,
                [planKey]: id
            }));
            return newData;
        });
    };

    useEffect(() => {
        if (subscriptionsClient && pets) {
            const subscriptionsById = {};
            subscriptionsClient.forEach(sub => {
                subscriptionsById[sub.id] = sub;
            });

            const petsWithSubsObj = {};
            pets.forEach(pet => {
                const sub = pet.subscripcion_id ? subscriptionsById[pet.subscripcion_id] : undefined;
                if (sub) {
                    petsWithSubsObj[pet.id] = {
                        pet,
                        subscripcion: sub
                    };
                }
            });
            setSubscriptions(petsWithSubsObj)
        }
    }, [subscriptionsClient, pets]);


    async function fetchSubs() {
        try {
            const response = await axios_api.get(endpoints.get_subs);
            if (response.status === 200) {

                setSubscriptionsClient(response.data.results)
            }
        } catch (err) {
            console.error('GET subs', err)
            return err
        }
    }

    useEffect(() => {
        fetchSubs()
    }, [])

    const getAvailablePets = (currentKey) => {
        const chosenPetIds = Object.values(data).filter(
            (id) => id !== null || id !== ""
        );

        return pets.filter(
            (pet) =>
                (pet.subscripcion_id === null) &&
                (!chosenPetIds.includes(pet.id) || data[currentKey] === pet.id)
        );
    };

    return (
        <Box
            sx={{
                background: "white",
                width: isMobile ? "60%" : "50%",
                borderRadius: 5,
                padding: 5,
            }}
        >
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
                <Box sx={{ width: "100%" }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 3,
                            gap: 1
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "var(--extra-light-gray-color)",
                                color: "black",
                                fontWeight: 600,
                                padding: "0.75rem 1rem",
                                borderRadius: "8px",
                                gap: "0.5rem",
                                border: "0.5px solid gray",
                            }}
                        >
                            <Typography sx={{ fontWeight: 500 }}>
                                Asigna el/los plan(es) a la(s) mascota(s) de tu preferencia
                            </Typography>
                        </Box>
                        <Box sx={{ my: "auto" }}>
                            {isMobile ? (
                                <LuCirclePlus
                                    size={32}
                                    onClick={() => setStep(1)}
                                    style={{ cursor: "pointer" }}
                                />
                            ) : (
                                <Button
                                    sx={{
                                        background: "var(--secondary-color)",
                                        color: "white",
                                        fontWeight: 600,
                                        "&:hover": { backgroundColor: "var(--darkgreen-color)" },
                                        gap: 2,
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setStep(1)}
                                >
                                    <FiPlus /> Añadir mascota
                                </Button>
                            )}
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: "grid",
                            gap: 2,
                            width: "100%",
                            justifyContent: "space-between",
                            gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                        }}
                    >
                        {Object.entries(plans)
                            .filter(([planKey, planData]) => planData.quantity > 0)
                            .map(([planKey, planData]) =>
                                Array.from({ length: planData.quantity }).map((_, i) => (
                                    <Box key={`${planKey}-${i + 1}`} sx={{ width: "100%" }}>
                                        <Typography
                                            sx={{
                                                color: "var(--blackinput-color)",
                                                fontWeight: 600,
                                                fontSize: "1rem",
                                            }}
                                        >
                                            Plan # {i + 1}: {planData.label}
                                        </Typography>
                                        <Select
                                            fullWidth
                                            value={data[`${planKey}-${i + 1}`] || ""} // now data stores the ID
                                            size="small"
                                            onChange={(e) => {
                                                handleSelectPet(`${planKey}-${i + 1}`, e.target.value);
                                            }}
                                            displayEmpty
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    padding: "4px 8px",
                                                    fontSize: "0.875rem",
                                                },
                                                mt: 1,
                                            }}
                                        >
                                            <MenuItem value="">Seleccionar mascota</MenuItem>
                                            {getAvailablePets(`${planKey}-${i + 1}`)
                                                .filter((pet) => pet.fallecida === false)
                                                .map((pet) => (
                                                    <MenuItem key={pet.id} value={pet.id}>
                                                        {pet.nombre}
                                                    </MenuItem>
                                                ))}
                                        </Select>

                                    </Box>
                                ))
                            )}
                    </Box>

                </Box>
            </Box>
        </Box>
    );
}
