import { RouterProvider } from '@tanstack/react-router';
import { router } from '../router/routes';

export default function App() {
  return (
    <RouterProvider router={router} />
  )
};
