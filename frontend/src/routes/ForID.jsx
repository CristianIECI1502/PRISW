import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFormById, editForm } from "../services/form.service";
import { Button, Center, Stack } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const ForID = () => {
    const [form, setForm] = useState(null);
    const [showEvaluationButtons, setShowEvaluationButtons] = useState(false);
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

        fetchForm();
    }, [_id]);

    const handleEvaluationClick = () => {
        setShowEvaluationButtons(true);
    };

    const handleStatusChange = async (newStatus) => {
        const updatedForm = { ...form, status: { name: newStatus } };
        const result = await editForm(_id, updatedForm);
        if (result.state === 'Success') {
            setForm(result.data);
            setShowEvaluationButtons(false);
        } else {
            console.error('Error al actualizar el estado del formulario');
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
                        <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline' onClick={handleEvaluationClick}>
                            Evaluar
                        </Button>
                        {showEvaluationButtons && (
                            <Stack direction='row' spacing={4}>
                                <Button colorScheme='red' variant='solid' onClick={() => handleStatusChange('Rechazado')}>
                                    Rechazado
                                </Button>
                                <Button colorScheme='green' variant='solid' onClick={() => handleStatusChange('Aprobado')}>
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