import { createContext } from 'react'

export const LoginContext = createContext( 
    {
        userData: null,
        setUserData: () => {},
        login: null,
        friends: [],
        setFriends: () => {},
        setLogin: () => {},
        logOut: () => {}
    }
)