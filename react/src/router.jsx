import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Error from './components/error'
import Home from './components/home'
import Login from './components/login'
import Register from './components/register'
import User from './components/profile'
import Chat from './components/chat'
import App from './App'

const Router = () => {
    const router = createBrowserRouter (
        [
            {
                element: <App/>,
                errorElement: <Error/>,
                children: [
                    {
                        path: '/',
                        element: <Home/>
                    },
                    {
                        path: '/',
                        element: <Login/>
                    },
                    {
                        path: '/register',
                        element: <Register/>
                    },
                    {
                        path: '/users/:userid',
                        element: <User/>
                    },
                    {
                        path: '/users/:userid/chats/:chatid',
                        element: <Chat/>
                    }
                ]
            }
        ]
    )
    return <RouterProvider router={router}/>
}

export default Router