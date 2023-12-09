import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFormById } from "../services/form.service";
import { Button, Center, Stack } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowLeftIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const ForID = () => {
    const [form, setForm] = useState(null);
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
                        <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline'>
                            Call us
                        </Button>
                    </Stack>
                </div>
            )}
            </Center>
        </div>
    );
};

export default ForID;