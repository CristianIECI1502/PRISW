import ReactDOM from 'react-dom/client';
import App from './routes/App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import Forms from './routes/Forms.jsx';
import ForID from './routes/ForID.jsx';
import Figma from './routes/figma.jsx';
import Beneficios from './routes/Beneficio.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <App />,
      },
    ],
  },
  {
    path: '/auth',
    element: <Login />,
  },
  {
    path: '/forms',
    element: <Root/>,
    children: [{
      path:'/forms',
      element: <Forms />,
    },
    ],
  },
  {
    path: '/forms/:_id',
    element: <ForID/>,
  },
  {
    path: '/figma',
    element: <Figma/>,
  },
  {
    path: '/beneficios',
    element: <Beneficios />,
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);