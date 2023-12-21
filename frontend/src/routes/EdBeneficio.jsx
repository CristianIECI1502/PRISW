import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getBeneficioById, editBeneficio } from '../services/beneficio.service';
import { FormControl, FormLabel, Input, Button, Box } from "@chakra-ui/react";
const EdBeneficio = () => {
  const navigate = useNavigate();
  const { _id } = useParams();
  const [beneficio, setBeneficio] = React.useState(null);
  const [editedBeneficio, setEditedBeneficio] = React.useState({
    beneficioname: '',
    descripcion: '',
    empresaAsociada: '',
    descuento: 0,
    fechaInicio: '',
    fechaFin: '',
  });

  useEffect(() => {
    document.body.style.backgroundColor = "#f8fa8d";
    const fetchBeneficio = async () => {
      const result = await getBeneficioById(_id);
      if (result.state === 'Success') {
        setBeneficio(result.data);
        setEditedBeneficio(result.data);
      } else {
        console.error('Error al obtener el beneficio');
      }
    };

    fetchBeneficio();
  }, [_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBeneficio((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditBeneficio = async () => {
    // Crea un nuevo objeto con solo las propiedades permitidas
    const cleanedBeneficio = {
      beneficioname: editedBeneficio.beneficioname,
      descripcion: editedBeneficio.descripcion,
      empresaAsociada: editedBeneficio.empresaAsociada,
      descuento: editedBeneficio.descuento,
      fechaInicio: editedBeneficio.fechaInicio,
      fechaFin: editedBeneficio.fechaFin,
    };

    const response = await editBeneficio(_id, cleanedBeneficio);
    if (response.state === 'Success') {
      console.log('Beneficio editado exitosamente:', response.data);
      // Puedes realizar alguna acción adicional después de editar
    } else {
      console.error('Error al editar el beneficio');
    }
  };

  return (
    <Box bg="#f8fa8d" maxW="800px" mx="auto">
      <Box m={5} p={15} borderRadius="20px" bg="#676926" color="white">
        <h1 style={{textAlign: "center", fontSize: "2em", fontWeight: "bold"}}>Detalles del Beneficio</h1>
        {beneficio && (
          <div>
            <p>Nombre del beneficio: {beneficio.beneficioname}</p>
            <p>Descripción: {beneficio.descripcion}</p>
            <p>Empresa Asociada: {beneficio.empresaAsociada}</p>
            <p>Descuento: {beneficio.descuento}%</p>
            <p>Fecha de Inicio: {moment(beneficio.fechaInicio).format("DD/MM/YYYY")}</p>
            <p>Fecha de Fin: {moment(beneficio.fechaFin).format("DD/MM/YYYY")}</p>
          </div>
        )}
      </Box>
      <Box m={5} p={15} borderRadius="20px" bg="#676926" color="white">
        <h1 style={{textAlign: "center", fontSize: "2em", fontWeight: "bold"}}>Editar Beneficio</h1>
        <FormControl id="beneficioname">
          <FormLabel>Nombre del beneficio:</FormLabel>
          <Input type="text" name="beneficioname" value={editedBeneficio.beneficioname} onChange={handleInputChange} />
        </FormControl>
        <FormControl id="descripcion">
          <FormLabel>Descripción:</FormLabel>
          <Input type="text" name="descripcion" value={editedBeneficio.descripcion} onChange={handleInputChange} />
        </FormControl>
        <FormControl id="empresaAsociada">
          <FormLabel>Empresa Asociada:</FormLabel>
          <Input type="text" name="empresaAsociada" value={editedBeneficio.empresaAsociada} onChange={handleInputChange} />
        </FormControl>
        <FormControl id="descuento">
          <FormLabel>Descuento:</FormLabel>
          <Input type="number" name="descuento" value={editedBeneficio.descuento} onChange={handleInputChange} />
        </FormControl>
        <FormControl id="fechaInicio">
          <FormLabel>Fecha de Inicio:</FormLabel>
          <Input type="date" name="fechaInicio" value={editedBeneficio.fechaInicio} onChange={handleInputChange} />
        </FormControl>
        <FormControl id="fechaFin">
          <FormLabel>Fecha de Fin:</FormLabel>
          <Input type="date" name="fechaFin" value={editedBeneficio.fechaFin} onChange={handleInputChange} />
        </FormControl>
  
        <Box display="flex" justifyContent="center" mt={2}>
          <Button bg="#007A5E" color="white" onClick={handleEditBeneficio}>
            Guardar Cambios
          </Button>
          <Button ml={2} colorScheme='red' onClick={() => navigate('/beneficios')}>
            Atras
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EdBeneficio;
