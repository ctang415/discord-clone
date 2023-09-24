import { createContext } from 'react'

export const LoginContext = createContext( 
    {
        login: null,
        setLogin: () => {},
        logOut: () => {}
    }
)