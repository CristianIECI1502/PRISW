import { Box, Flex, Heading, Image, Spacer, Text } from '@chakra-ui/react';
import { useRouteError } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ErrorPage = () => {
  const error = useRouteError();

  /**
   * Este mensaje de error, está pensado para los desarrolladores.
   * En un entorno de producción, no se debería mostrar este mensaje o almenos
   * no de esta forma.
   */
  console.error({
    status: error.status,
    statusText: error.statusText,
    message: error.message ? error.message : 'No message',
  });

  // Array de URLs de imágenes
  const imageUrls = [
    'https://64.media.tumblr.com/8791f7c344ed91eb1d35ff67a77f071d/49b1eb1e886c4ec5-45/s640x960/9fa93d702b2c37abe61b3ab2084973827f72d822.jpg',
    'https://img.freepik.com/free-vector/404-error-with-cute-animal-concept-illustration_114360-1900.jpg?w=740&t=st=1702660456~exp=1702661056~hmac=cc021d4ed8db41d2a5b6ae8fbccce808461f9164693eb03643a30084d4a4f5cf',
    'https://64.media.tumblr.com/dfa44f240d43bf5ca7234bede01cd805/b689ea05205e44ca-b3/s1280x1920/06250b07a203f1948b65cff01dc4827e2e88c2cf.jpg',
    'https://64.media.tumblr.com/3de8a08a27851ae7fbf82259b1aa1faf/9b9487a6dcfefd1d-91/s640x960/8d92ee47b91bec6ceae7d1457a8d5e63f160b67a.jpg',
    'https://jaidefinichon.com/wp-content/uploads/2023/12/410757223_300719936291565_5918204781321282485_n.jpg',
    'https://jaidefinichon.com/wp-content/uploads/2023/12/411239433_1880759862338591_1208604169848106569_n.jpg',
    'https://jaidefinichon.com/wp-content/uploads/2023/12/409029406_1092503561755235_5186301715919202_n.jpg',
    // Añade más URLs de imágenes aquí
  ];

  // Selecciona una URL de imagen de forma aleatoria
  const [randomImage, setRandomImage] = useState('');

  useEffect(() => {
    setRandomImage(imageUrls[Math.floor(Math.random() * imageUrls.length)]);
  }, []);

  return (
    <Flex direction="column" minHeight="100vh" alignItems="center" justifyContent="center">
      <Box mb={4}>
        <Heading>Oops!</Heading>
        <Text>Sorry, un error inesperado a ocurrido.</Text>
      </Box>
      <Spacer />
      <Image src={randomImage} alt='Imagen aleatoria' width="100%" maxHeight="calc(100vh - 200px)" objectFit="contain" />
    </Flex>
  );
};
export default ErrorPage;
