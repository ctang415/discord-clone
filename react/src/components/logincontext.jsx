import { createContext } from 'react'

export const LoginContext = createContext( 
    {
        userSettings: null,
        setUserSettings: () => {},
        userData: null,
        setUserData: () => {},
        login: null,
        friends: [],
        setFriends: () => {},
        setLogin: () => {},
        logOut: () => {},
        fetchUser: () => {},
        setMessages: ()=> {},
        messages: [],
        setPasswordModal: () => {},
        passwordModal: null,
        isLoading: null,
        setIsLoading: () => {}
    }
)