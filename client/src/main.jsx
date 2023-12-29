import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Auth from './utils/auth.js';

import App from './App.jsx'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import Chat from './pages/Chat';
import VideoChat from './pages/VideoChat';
import Settings from './pages/Settings';
import SupportUs from './pages/SupportUs';

// Initialize router and set basic routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: Auth.loggedIn() ? <Dashboard /> : <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/chat',
        element: <Chat />
      }, {
        path: '/videochat',
        element: <VideoChat />
      }, {
        path: '/settings',
        element: <Settings />
      }, {
        path: '/supportus',
        element: <SupportUs />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
