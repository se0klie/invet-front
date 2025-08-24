import { Modal, Box, Typography, Button, Dialog, DialogTitle, DialogContentText, DialogContent, DialogActions } from "@mui/material";
import { RxCross1 } from "react-icons/rx";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";
import { ErrorOutline } from "@mui/icons-material";

export function CancelPlanModal({ open, setOpen, petName, onCancel }) {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
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
                    width: { xs: '70%', md: 650, lg: 700 },
                }}
            >
                <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'var(--error-color)' }}>
                            Cancelar plan
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'black' }}>
                            Se eliminará el plan asociado a <strong>{petName}</strong>, ¿deseas continuar?
                        </Typography>
                    </Box>

                    <RxCross1
                        style={{ color: 'black', cursor: 'pointer' }}
                        onClick={() => setOpen(false)}
                    />
                </Box>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '1rem',
                    marginTop: '1rem'
                }}>
                    <Button
                        sx={{
                            border: '0.15rem solid var(--dark-gray-color)',
                            color: 'var(--dark-gray-color)',
                            fontWeight: 600,
                            borderRadius: '0.5rem'
                        }}
                        onClick={() => {
                            setOpen(false)
                        }}

                    >
                        Cancelar
                    </Button>
                    <Button
                        sx={{
                            backgroundColor: 'var(--error-fill-color)',
                            color: 'white',
                            fontWeight: 600,
                            paddingX: '2rem',
                            paddingY: '0.5rem',
                            borderRadius: '0.5rem'
                        }}
                        onClick={() => {
                            onCancel()
                            console.log('CancelPlanModal onCancel prop:', onCancel);
                        }}>
                        Aceptar
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export function LoadingModal({ text, open, setOpen, modalStep }) {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
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
                    width: { xs: '70%', md: 650, lg: 700 },
                }}
            >
                {modalStep === 0 &&
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
                                {text}
                            </Typography>
                        </Box>
                        <DotLottieReact
                            src="https://lottie.host/93f00827-07f6-4b9d-baa2-798cc4138b2c/v252HHvfL0.lottie"
                            loop
                            autoplay
                            style={{ width: 200 }}
                        />
                    </Box>
                }

                {modalStep === 1 &&
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
                        <FaRegCircleCheck color="green" size={45} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
                            Proceso terminado con éxito
                        </Typography>
                    </Box>
                }

                {modalStep === -1 &&
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <MdErrorOutline color="var(--error-color)" size={45} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginY: '1rem' }}>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'black' }}>
                                Hubo un error en el proceso
                            </Typography>
                            <Typography variant="p" sx={{ color: 'var(--dark-gray-color)' }}>
                                Inténtalo de nuevo
                            </Typography>
                        </Box>
                    </Box>
                }
            </Box>
        </Modal>
    )
}


export function ErrorModal({ open, onClose, message }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { borderRadius: 3, p: 1.5, width: '30%'}
            }}
        >
            <DialogTitle
                sx={{
                    fontWeight: 600,
                    color: "error.main",
                    display: "flex",
                    alignItems: "center",
                    gap: 1
                }}
            >
                <ErrorOutline color="error" /> Hubo un error
            </DialogTitle>

            <DialogContent>
                <DialogContentText sx={{ color: "text.primary" }}>
                    {message || "Algo salió mal. Por favor, inténtalo de nuevo."}
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={onClose}
                    variant="contained"
                    color="error"
                    sx={{ borderRadius: 2, px: 3 }}
                >
                    Entendido
                </Button>
            </DialogActions>
        </Dialog>
    );
}