import { Box, Button, Center, useColorMode } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Center h="100vh">
      <Box>
        <h1>Pagina principal</h1>
        <h2>Bienvenido a la pagina principal</h2>
        <Button borderRadius="md" onClick={(()=> navigate ("/forms"))}>Ver Postulaciones</Button>
        <Button borderRadius="md" colorScheme='twitter' size={"md"} onClick={(()=> navigate("/postF"))}>Crear Postulacion</Button>
        <Button onClick={toggleColorMode}>
          Cambiar a {colorMode === "light" ? "Dark" : "Light"} Theme
        </Button>
      </Box>
    </Center>
  );
}

export default App;