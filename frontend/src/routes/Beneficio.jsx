import { useState, useEffect } from "react";
import { getBeneficios, deleteBeneficio } from "../services/beneficio.service";
import { Badge, Box, Button, Heading, Input, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Swal from "sweetalert2";

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

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredBeneficios = beneficios.filter((beneficio) => {
    const lowerSearch = search.toLowerCase();

    const condition =
      (beneficio.beneficioname &&
        beneficio.beneficioname.toLowerCase().includes(lowerSearch)) ||
      (beneficio.empresaAsociada &&
        beneficio.empresaAsociada.toLowerCase().includes(lowerSearch)) ||
      (beneficio.dateSubmitted &&
        new Date(beneficio.dateSubmitted)
          .toLocaleDateString()
          .includes(lowerSearch));

    console.log("Beneficio:", beneficio, "Passes condition:", condition);

    return condition;
  });

  const handleDeleteBeneficio = async (_id) => {
    if (_id) {
      Swal.fire({
        title: "¿Estás seguro?",
        text: "No podrás revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, bórralo!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const result = await deleteBeneficio(_id);
          if (result.state === "Success") {
            // Actualizar la lista de beneficios después de la eliminación
            const updatedBeneficios = beneficios.filter(
              (beneficio) => beneficio._id !== _id
            );
            setBeneficios(updatedBeneficios);
            navigate(`/beneficios`);
            Swal.fire("Borrado!", "El beneficio ha sido borrado.", "success");
          } else {
            console.error("Error al eliminar el beneficio");
          }
        }
      });
    } else {
      console.error("ID del beneficio no definido");
    }
  };

  return (
    <div>
      <VStack bg={"#f8fa8d"}>
        <Heading
          h1
          margin={["auto", "auto", "0", "0"]}
          style={{ color: "white", backgroundColor: "#676926", padding: "7px", borderRadius: "10px", margin: "27px" }}
        >
          Gestión de Beneficios
        </Heading>
  
        <Box
          bg={"#676926"}
          p={5}
          rounded={"md"}
          margin={0}
          style={{ color: "white", width: "500px" }}
        >
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.5,
            }}
          >
            Aquí encontrará la lista de todos los beneficios de la Tarjeta Vecina,
            si desea buscar uno en especial, puede hacerlo en el buscador de
            abajo.
          </p>
        </Box>
  
        <Input
          width={500}
          placeholder=" Buscar por nombre del beneficio o su empresa asociada"
          value={search}
          onChange={handleSearchChange}
          bgColor={"white"}
        />
        <Button
          sx={{ mr: 2, backgroundColor: "#00A6ED", color: "white" }}
          onClick={() => navigate("/postB")}
        >
          Crear nuevo beneficio
        </Button>
        <Box>
          {filteredBeneficios.map((beneficio, index) => (
            <Box
              key={index}
              bg={"#676926"}
              p={5}
              rounded={"md"}
              margin={5}
              style={{ color: "white", width: "500px" }}
            >
              <Heading as="h2" size="xl">
                {beneficio.beneficioname}
              </Heading>
              <Heading as="h6" size="md">
                {beneficio.empresaAsociada}
              </Heading>
              <p>{beneficio.descripcion}</p>
              <Badge colorScheme="blue">
                Descuento: {beneficio.descuento}%
              </Badge>
              <p>
                Fecha de inicio:{" "}
                {moment(beneficio.fechaInicio).format("DD/MM/YYYY")}
              </p>
              <p>
                Fecha de fin:{" "}
                {moment(beneficio.fechaFin).format("DD/MM/YYYY")}
              </p>
              <Box sx={{ display: "flex" }}>
                <Button
                  sx={{ mr: 2, backgroundColor: "#E74C3C", color: "white" }}
                  onClick={() => handleDeleteBeneficio(beneficio._id)}
                >
                  Borrar
                </Button>
  
                <Button
                  sx={{ mr: 2, backgroundColor: "#007A5E", color: "white" }}
                  onClick={() =>
                    navigate(`/beneficios/EdBeneficio/${beneficio._id}`)
                  }
                >
                  Editar
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
        <Button
          sx={{
            mr: 5,
            backgroundColor: "#7841B9",
            color: "white",
            marginBottom: 5,
          }}
          onClick={() => navigate("/")}
        >
          Inicio
        </Button>
      </VStack>
    </div>
  );
};

export default Beneficios;
