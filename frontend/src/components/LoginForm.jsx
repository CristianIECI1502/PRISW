import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';

function LoginForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    login(data).then(() => {
      navigate('/');
    });
  };

  return (
    <VStack w={"100%"} minH={"100%"} align={'center'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register('email', { required: true })} />
          <FormErrorMessage>
            {errors.email && "Este campo es obligatorio"}
          </FormErrorMessage>
        </FormControl>
    
        <FormControl id="password" isRequired>
          <FormLabel>Contraseña</FormLabel>
          <Input type="password" {...register('password', { required: true })} />
          <FormErrorMessage>
            {errors.password && "Este campo es obligatorio"}
          </FormErrorMessage>
        </FormControl>
    
        <Button mt={4} colorScheme="teal" onClick={onSubmit} type="submit">
          Iniciar sesión
        </Button>
      </form>
    </VStack>
  );
}

export default LoginForm;
