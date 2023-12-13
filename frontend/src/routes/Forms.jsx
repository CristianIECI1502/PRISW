import { useState, useEffect } from 'react';
import { getForms, getFormById } from "../services/form.service";
import { Badge, Box, Button, Heading, Input, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Forms = () => {
    const [forms, setForms] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getForms();
            if (response.state === 'Success' && Array.isArray(response.data)) {
                setForms(response.data);
            } else {
                console.error('getForms did not return an array');
            }
        };

        fetchData();
    }, []);

    const handleViewForm = async (_id) => {
        if (_id) { // Asegúrate de que _id existe y no es undefined
            const result = await getFormById(_id);
            if (result.state === 'Success') {
                navigate(`/forms/${_id}`);
            } else {
                console.error('Error al obtener el formulario');
            }
        } else {
            console.error('ID del formulario no definido');
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredForms = forms.filter(form => 
        form.nombre.toLowerCase().includes(search.toLowerCase()) ||
        form.rut.toLowerCase().includes(search.toLowerCase()) ||
        form.status.name.toLowerCase().includes(search.toLowerCase()) ||
        new Date(form.dateSubmitted).toLocaleDateString().includes(search)
    );

    return (
        <div>
            <VStack>
            <h1>Simple Page</h1>
            <p>This is a simple page.</p>
            <Input placeholder="Buscar por nombre" value={search} onChange={handleSearchChange} />
            <Box>
                {filteredForms.map((form, index) => (
                <div key={index}>
                    <Box>
                    <Heading>{form.rut}</Heading>
                    <p>{form.nombre}</p>
                    <Badge colorScheme="blue">Estado: {form.status.name}</Badge>
                    <p>Fecha de creación: {moment(form.dateSubmitted).format('DD/MM/YYYY')}</p>
                    <p>Fecha de actualización: {moment(form.dateModified).format('DD/MM/YYYY')}</p>
                    <Button onClick={() => handleViewForm(form._id)}>Ver Peticion</Button>
                    </Box>
                </div>
            ))}
            </Box>
            <Button onClick={(()=> navigate('/'))}>volver al inicio</Button>
            </VStack>
        </div>
    );
};

export default Forms;