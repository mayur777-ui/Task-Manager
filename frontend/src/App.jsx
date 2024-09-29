import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Addtask from './components/Addtask';
import EditTask from './components/EditTask';
import Login from './components/Login';
import Register from './components/Register';
import First from './components/First';
import ProtectedRoute from './components/ProtectedRoute';
import Show from './components/Show';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <First />,
  },
  {
    path: '/addTask',
    element: <Addtask />,
  },
  {
    path: '/showtask/:id',
    element: (
      <ProtectedRoute>
        <Show />
      </ProtectedRoute>
    ),
  },
  {
    path: '/editTask/:id',
    element: <EditTask />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;
