import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { Box, Button, Container, Heading, Text, Flex, Spacer, IconButton } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { useState } from 'react';

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const { user } = useAuth();

  return (
    <nav>
      <Container>
      <Box bgColor={""}>
        <Flex align="center">
          <Heading color={""}>Tarjeta Vecina</Heading>
          <IconButton 
            icon={showDetails ? <ChevronUpIcon /> : <ChevronDownIcon />} 
            onClick={() => setShowDetails(!showDetails)}
          />
        </Flex>
        {showDetails && (
          <Box mt={2}>
            <Flex align="center">
              <Text>Estas logeado como: {user.email}</Text>
              <Spacer />
              <Button onClick={handleLogout}>Cerrar sesion</Button>
            </Flex>
          </Box>
        )}
      </Box>
      </Container>
      <Outlet />
    </nav>
  );
}

export default Root;