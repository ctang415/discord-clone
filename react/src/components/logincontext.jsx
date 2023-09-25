import { createContext } from 'react'

export const LoginContext = createContext( 
    {
        userData: null,
        login: null,
        data: [],
        setLogin: () => {},
        logOut: () => {}
    }
)