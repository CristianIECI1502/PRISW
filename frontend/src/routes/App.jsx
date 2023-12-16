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
        <Button borderRadius="md" colorScheme='blue' onClick={(()=> navigate ("/forms"))}>Ver Postulaciones</Button>
        <Button borderRadius="md" colorScheme='blue' onClick={(()=> navigate ("/beneficios"))}>Ver Beneficios</Button>
        <Button borderRadius="md" colorScheme='blue' size={"md"}>Button</Button>
        <Button onClick={toggleColorMode}>
          Cambiar a Modo {colorMode === "light" ? "Dark" : "Light"} 
        </Button>
      </Box>
    </Center>
  );
}

export default App;