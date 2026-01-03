import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/Layout/AppLayout'
import ErrorPage from './pages/ErrorPage'

import Home from "./pages/Home"
import About from './pages/About'
import Country from './pages/Country'
import Contact from './pages/Contact'

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'Country',
        element: <Country />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
]);


const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
