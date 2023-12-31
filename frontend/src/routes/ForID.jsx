import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFormById, editForm } from "../services/form.service";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, Center, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, VStack } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { sendEmail } from '../services/email.service';

const ForID = () => {
    const [form, setForm] = useState(null);
    const [roleName, setRoleName] = useState(''); // Agrega un estado para roleName
    const { _id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [alertStatus, setAlertStatus] = useState(null);

    useEffect(() => {
        const fetchForm = async () => {
            const result = await getFormById(_id);
            if (result.state === 'Success') {
                setForm(result.data);
            } else {
                console.error('Error al obtener el formulario');
            }
        };

        const user = JSON.parse(localStorage.getItem('user')); // Parsea el valor almacenado en 'user'
        const roles = user.roles; // Accede al campo 'roles'
        setRoleName(roles[0].name); // Accede al campo 'name' del primer rol y lo guarda en el estado

        fetchForm();
    }, [_id]);

    const handleEvaluationClick = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleStatusChange = async (statusName) => {
        setIsLoading(true);
        const formData = {
            status: statusName,
        };
        const response = await editForm(form._id, formData);
        if (response.state === 'Success') {
            setForm(response.data);

            // Envía un correo de notificación
            const emailResponse = await sendEmail(form.email, statusName);
            if (emailResponse.state === 'Success') {
                console.log('Correo de notificación enviado con éxito');
            } else {
                console.error('Error al enviar el correo de notificación');
            }

            // Refresca la página después de un retraso de 3 segundos
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else {
            console.error(response.message);
        }
        setIsLoading(false);
        setIsOpen(false);
        setAlertStatus(statusName);
    };


    
    return (
        <VStack minH="100vh" w="100%" spacing={0} bg={"#8DBFF9"}  >
            <Center>
            {/* muestra los datos del formulario aquí si existen */}
            <Box>
            {form && (
                <Box>
                    <VStack spacing={5}>
                        <Heading as="h2" size="xl">Nombre: {form.nombre}</Heading>
                        <Text fontSize="xl">RUT: {form.rut}</Text>
                        <Text fontSize="xl" style={{ wordBreak: 'break-all' }}>Email: {form.email}</Text>
                        <Text fontSize="xl">N° TEF: +56{form.phoneNumber}</Text>
                        <Text fontSize="xl">Direccion: {form.address}</Text>
                        <Text fontSize="xl">Solicitud: {form.message}</Text>
                        <Text fontSize="xl">Estado: {form.status.name}</Text>
                        <Stack direction='row' spacing={4}>
                            <Button leftIcon={<ArrowLeftIcon />} colorScheme='teal' variant='solid' onClick={(()=> navigate('/forms'))}>
                                Volver a formularios
                            </Button>
                            <Button 
                                rightIcon={<ArrowForwardIcon />} 
                                colorScheme='teal' 
                                variant='outline' 
                                onClick={handleEvaluationClick}
                                style={{ display: roleName === 'user' ? 'none' : 'inline-block' }}
                            >
                                Evaluar
                            </Button>
                            <Modal isOpen={isOpen} onClose={handleClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Como evaluaria esta postulacion</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Stack direction='row' spacing={4}>
                                            <Button isLoading={isLoading} colorScheme='red' variant='solid' onClick={() => handleStatusChange("Rechazado")}>
                                                Rechazado
                                            </Button>
                                            <Button isLoading={isLoading} colorScheme='green' variant='solid' onClick={() => handleStatusChange("Aprobado")}>
                                                Aprobado
                                            </Button>
                                        </Stack>
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                        </Stack>
                    </VStack>
                    {alertStatus && (
                        <Alert status="success">
                            <AlertIcon />
                            <AlertTitle mr={2}>Estado cambiado a {alertStatus}!</AlertTitle>
                            <AlertDescription>Correo de notificación enviado.</AlertDescription>
                        </Alert>
                    )}
                </Box>
            )}
            </Box>
            </Center>
        </VStack>
    );
};

export default ForID;