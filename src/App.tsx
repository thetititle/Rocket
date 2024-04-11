import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './routes/HomePage';
import { GlobalStyle } from './GlobalStyle';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import LoginPage from './routes/LoginPage';
import CreateAccount from './routes/CreateAccount';
import Loading from './components/Loading';
import ProtectRoute from './components/ProtectRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectRoute>
        <Layout />
      </ProtectRoute>
    ),
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/createaccount',
    element: <CreateAccount />,
  },
]);

function App() {
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setLoading(false);
  };

  window.onpagehide = (e) => {
    e.preventDefault();
    if (!isLoading) {
      auth.signOut();
      if ((e.returnValue = true)) {
      }
    }
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <GlobalStyle />
      {isLoading ? (
        <Loading />
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;
