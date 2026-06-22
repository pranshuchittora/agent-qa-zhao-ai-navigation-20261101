import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import RootLayout from '@/routes/root-layout';

const Home = lazy(() => import('@/routes/home'));
const Category = lazy(() => import('@/routes/category'));
const ToolDetail = lazy(() => import('@/routes/tool-detail'));
const Search = lazy(() => import('@/routes/search'));
const Favorites = lazy(() => import('@/routes/favorites'));
const NotFound = lazy(() => import('@/routes/not-found'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'category', element: <Category /> },
      { path: 'category/:categoryId', element: <Category /> },
      { path: 'tool/:toolId', element: <ToolDetail /> },
      { path: 'search', element: <Search /> },
      { path: 'favorites', element: <Favorites /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
