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
import CrForm from './routes/CrForm.jsx';
import Beneficios from './routes/Beneficio.jsx';
import CrBeneficio from './routes/CrBeneficio.jsx';
import EdBeneficio from './routes/EdBeneficio.jsx';

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
    path: '/',
    element: <Root/>,
    children: [{
      path:'/forms/:_id',
      element: <ForID />,
    },
    ],
  },
  {
    path: '/',
    element: <Root/>,
    children: [{
      path:'/postF',
      element: <CrForm />,
    },
    ],
  },
  {
    path:'/',
    element: <Root />,
    children: [{
      path: '/beneficios',
      element: <Beneficios />,
    }]
  },
  {
    path: '/',
    element: <Root/>,
    children: [{
      path:'/postB',
      element: <CrBeneficio />,
    },
    ],
  },
  {
    path: '/',
    element: <Root/>,
    children: [{
      path:'/beneficios/Edbeneficio/:_id',
      element: <EdBeneficio />,
    },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <RouterProvider router={router} />
  </ChakraProvider>
);