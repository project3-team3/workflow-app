import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
// TODO: Add imports for all other pages

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }
      // TODO: Add routes for all other pages
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
