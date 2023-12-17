import { Box, Button, Center, HStack, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <body style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box bg={"#CCE696"} flex={1}>
        <Heading h2>Bienvenido a la pagina principal de la tarjeta vecina</Heading>
      </Box>
      <Box bg={"#8DBFF9"} flex={1}>
        <Heading mb={20}>Postulaciones</Heading>
        <Center>
          <HStack spacing={100}>
            <Button borderRadius="md" onClick={(()=> navigate ("/forms"))}>Ver Postulaciones</Button>
            <Button borderRadius="md" size={"md"} onClick={(()=> navigate("/postF"))}>Crear Postulacion</Button>
          </HStack>
        </Center>
      </Box>
      <Box bg={"#F8FA8D"} flex={1}>
        <Heading>Beneficios</Heading>
      </Box>
      <Box bg={"#B48CD4"} >
        <Text onClick={(()=> navigate("/success"))}>saber mas</Text>
        <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
          <Image src="/Group 7.svg" alt="Mi imagen" />
        </Box>
      </Box>
    </body>
  );
}

export default App;