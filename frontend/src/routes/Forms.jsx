import { useState, useEffect } from 'react';
import { getForms, getFormById, deleteForm } from "../services/form.service";
import { Badge, Box, Button, ButtonGroup, Container, Heading, Input, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Forms = () => {
    const [forms, setForms] = useState([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [roleName, setRoleName] = useState('');
    const [sortType, setSortType] = useState('date'); // Nuevo estado para el tipo de ordenamiento

    useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // Parsea el valor almacenado en 'user'
    const roles = user.roles; // Accede al campo 'roles'
    setRoleName(roles[0].name); // Accede al campo 'name' del primer rol y lo guarda en el estado
    }, []);

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

    useEffect(() => {
        const fetchData = async () => {
            const response = await getForms();
            if (response.state === 'Success' && Array.isArray(response.data)) {
                let sortedData;
                const statusOrder = { 'Pendiente': 1, 'Rechazado': 2, 'Aprobado': 3 };
                switch (sortType) {
                    case 'date':
                        sortedData = response.data.sort((a, b) => new Date(b.dateSubmitted) - new Date(a.dateSubmitted));
                        break;
                    case 'status':
                        sortedData = response.data.sort((a, b) => statusOrder[a.status.name] - statusOrder[b.status.name]);
                        break;
                    case 'name':
                        sortedData = response.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
                        break;
                    case 'modifiedDate':
                        sortedData = response.data.sort((a, b) => moment(a.modifiedDate).diff(moment(b.modifiedDate)));
                        break;
                    default:
                        sortedData = response.data;
                }
                setForms(sortedData);
            } else {
                console.error('getForms did not return an array');
            }
        };

        fetchData();
    },[sortType]); // Agrega sortType como dependencia
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

    const handleDeleteForm = async (_id) => {
        if (_id) {
            if (window.confirm('¿Estás seguro de que quieres eliminar este formulario?')) {
                const result = await deleteForm(_id);
                if (result.state === 'Success') {
                    // Actualizar la lista de formularios después de la eliminación
                    const updatedForms = forms.filter(form => form._id !== _id);
                    setForms(updatedForms);
                } else {
                    console.error('Error al eliminar el formulario');
                }
            }
        } else {
            console.error('ID del formulario no definido');
        }
    };

    function getBadgeColor(status) {
        switch (status.toLowerCase()) {
            case 'aprobado':
                return 'green';
            case 'pendiente':
                return 'yellow';
            case 'rechazado':
                return 'red';
            default:
                return 'blue';
        }
    }

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
            <VStack bg={"#8DBFF9"}>
                <Heading h1>Postulaciones:</Heading>
                <Text>Lista de postulantes</Text>
                <Input placeholder="Buscar por nombre, rut o estado" value={search} onChange={handleSearchChange} bg={"white"} />
                <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Ordenar por
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => setSortType('name')}>Nombre</MenuItem>
                    <MenuItem onClick={() => setSortType('status')}>Estado</MenuItem>
                    <MenuItem onClick={() => setSortType('date')}>Fecha de creación</MenuItem>
                    <MenuItem onClick={() => setSortType('modifiedDate')}>Fecha de actualización</MenuItem>
                </MenuList>
            </Menu>
                <Container background={"cyan.500"}borderRadius={"20px"}>
                    {filteredForms.map((form, index) => (
                    <div key={index}>
                        <Box>
                            <Heading>{form.rut}</Heading>
                            <p>{form.nombre}</p>
                            <Badge colorScheme={getBadgeColor(form.status.name)}>Estado: {form.status.name}</Badge>
                            <p>Fecha de creación: {moment(form.dateSubmitted).format('DD/MM/YYYY')}</p>
                            <p>Fecha de actualización: {moment(form.dateModified).format('DD/MM/YYYY')}</p>
                            <ButtonGroup spacing={"100px"}>
                            <Button onClick={() => handleViewForm(form._id)}>Ver Peticion</Button>
                            {form.status.name.toLowerCase() === 'rechazado' && roleName !== 'user' && (
                                <Button onClick={() => handleDeleteForm(form._id)}colorScheme='red'>Eliminar Formulario</Button>
                                )}
                            </ButtonGroup>
                        </Box>
                    </div>
                ))}
                </Container>
                <Button onClick={(()=> navigate('/'))}>volver al inicio</Button>
            </VStack>
        </div>
    );
};

export default Forms;