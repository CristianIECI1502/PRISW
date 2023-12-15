import { Heading, Image, Text } from '@chakra-ui/react';
import { useRouteError } from 'react-router-dom';

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

  return (
    <div>
      <Heading>Oops!</Heading>
      <Text>Sorry, un error inesperado a ocurrido.</Text>
        <Image src='https://64.media.tumblr.com/63958cc214ae5a42aa4899c91d6d3a52/485e069769d4c71f-28/s1280x1920/4bcca21dde5eaa35d539dc2376faeecc07ee4647.jpg' alt='Dan Abramov' />
    </div>
  );
};

export default ErrorPage;
