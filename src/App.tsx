import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './routes/HomePage';
import { GlobalStyle } from './GlobalStyle';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/Home',
        element: <HomePage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />;
    </>
  );
}

export default App;
