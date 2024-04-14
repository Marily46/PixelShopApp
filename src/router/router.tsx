import { createBrowserRouter } from 'react-router-dom';
import { ProductsByCategory, NotFound  } from '../components/';
import Layout from '../app/layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'category/:category',
        element: <ProductsByCategory />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
