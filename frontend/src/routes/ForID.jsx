import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFormById, editForm } from "../services/form.service";
import { Button, Center, Stack } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const ForID = () => {
    const [form, setForm] = useState(null);
    const [showEvaluationButtons, setShowEvaluationButtons] = useState(false);
    const [roleName, setRoleName] = useState(''); // Agrega un estado para roleName
    const { _id } = useParams();
    const navigate = useNavigate();

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
        setShowEvaluationButtons(true);
    };

    const handleStatusChange = async (statusName) => {
        const formData = {
            status: statusName,
        };
        const response = await editForm(form._id, formData);
        if (response.state === 'Success') {
            setForm(response.data);
            window.location.reload(); // Refresca la página
            window.alert(`Estado cambiado a ${statusName}`); // Muestra una alerta
        } else {
            console.error(response.message);
        }
    };
    
    return (
        <div>
            <Center>
            {/* muestra los datos del formulario aquí si existen */}
            {form && (
                <div>
                    <h2>Nombre: {form.nombre}</h2>
                    <p>RUT: {form.rut}</p>
                    <p>Email: {form.email}</p>
                    <p>N° TEF: +56{form.phoneNumber}</p>
                    <p>Direccion: {form.address}</p>
                    <p>Solicitud: {form.message}</p>
                    <p>Estado: {form.status.name}</p>
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
                        {showEvaluationButtons && (
                            <Stack direction='row' spacing={4}>
                                <Button colorScheme='red' variant='solid' onClick={() => handleStatusChange("Rechazado")}>
                                    Rechazado
                                </Button>
                                <Button colorScheme='green' variant='solid' onClick={() => handleStatusChange("Aprobado")}>
                                    Aprobado
                                </Button>
                            </Stack>
                        )}
                    </Stack>
                </div>
            )}
            </Center>
        </div>
    );
};

export default ForID;