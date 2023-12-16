import { useState, useEffect } from "react";
import { getBeneficios, getBeneficioById } from "../services/beneficio.service";
import { Badge, Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import moment from 'moment';

const Beneficios = () => {
  const [beneficios, setBeneficios] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBeneficios();
      if (response.state === "Success" && Array.isArray(response.data)) {
        setBeneficios(response.data);
      } else {
        console.error("getBeneficios did not return an array");
      }
    };

    fetchData();
  }, []);

  const handleViewBeneficio = async (_id) => {
    if (_id) {
      const result = await getBeneficioById(_id);
      if (result.state === "Success") {
        navigate(`/beneficios/${_id}`);
      } else {
        console.error("Error al obtener el beneficio");
      }
    } else {
      console.error("ID del beneficio no definido");
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };



  const filteredBeneficios = beneficios.filter((beneficio) => {
    const lowerSearch = search.toLowerCase();
  
    const condition =
      (beneficio.beneficioname && beneficio.beneficioname.toLowerCase().includes(lowerSearch)) ||
      (beneficio.empresaAsociada&& beneficio.empresaAsociada.toLowerCase().includes(lowerSearch)) ||
      (beneficio.dateSubmitted && new Date(beneficio.dateSubmitted).toLocaleDateString().includes(lowerSearch));
  
    console.log('Beneficio:', beneficio, 'Passes condition:', condition);
  
    return condition;
  });

  
  return (
    <div>
      <VStack>
        <h1>Beneficios de la Tarjeta Vecina</h1>
        <p>
          Aquí encontrará la lista de todos los beneficios, si desea buscar uno
          en especial, puede hacerlo en el buscador de abajo.
        </p>
        <Input
          placeholder=" Ingrese dato del Beneficio a buscar"
          value={search}
          onChange={handleSearchChange}
        />
<Button sx={{ mr: 2, backgroundColor: '#148F77', color: 'white' }}
onClick={() => navigate("/")}>Inicio</Button>

<Button sx={{ mr: 2, backgroundColor: '#F1C40F', color: 'white' }} onClick={() => handleViewBeneficio(beneficio._id)}>
  Añadir un nuevo beneficio
</Button>
        <Box>
          {filteredBeneficios.map((beneficio, index) => (
            <div key={index}>
              <Box>
                <Heading>{beneficio.beneficioname}</Heading>
                <p>{beneficio.empresaAsociada}</p>
                <p>{beneficio.descripcion}</p>
                <Badge colorScheme="blue">
                  Descuento: {beneficio.descuento}%
                </Badge>
                <p>Fecha de inicio: {moment(beneficio.fechaInicio).format('DD/MM/YYYY')}</p>
                <p>Fecha de fin: {moment(beneficio.fechaFin).format('DD/MM/YYYY')}</p>
            <Box sx={{display:'flex'}}>
            <Button sx={{ mr: 2, backgroundColor: '#E74C3C', color: 'white' }} onClick={() => handleViewBeneficio(beneficio._id)}>
  Borrar
</Button>

<Button sx={{ mr: 2, backgroundColor: '#2ECC71', color: 'white' }} onClick={() => handleViewBeneficio(beneficio._id)}>
  Editar
</Button>

            </Box>
              </Box>
            </div>
          ))}
        </Box>
      </VStack>
    </div>
  );
};

export default Beneficios;
