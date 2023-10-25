import { useState, useEffect } from 'react'
import './App.css'
import { Outlet, useNavigate } from 'react-router'
import { LoginContext } from './components/logincontext'

function App() {
  const [ userSettings, setUserSettings] = useState(false)
  const [login, setLogin] = useState(false)
  const [ friends, setFriends ] = useState([])
  const [ userData, setUserData ] = useState([])
  const [ messages, setMessages] = useState([])
  const [ profileEdit, setProfileEdit] = useState(false)
  const navigate = useNavigate()

  const logOut = async (email) => {
    const username = {  username: email }
    try {
      let response = await fetch ('http://localhost:3000/logout', {
        method: 'POST', headers: {'Content-Type': 'application/json'}, credentials: 'include' , body: JSON.stringify(username)
    })
        await response.json()
        if (response.status === 200) {
          setLogin(false)  
          setUserSettings(false)
          alert('Successfully logged out!')
          navigate('/')
        }
      } catch (err) {
        console.log(err)
      }
  }

  const fetchUser = async () => {
    try {
        const response = await fetch (`http://localhost:3000/users/${userData[0].id}`, {
            credentials: 'include'
        })
        if (!response.ok) {
            throw await response.json()
        }
        const data = await response.json()
        if (response.status === 200) {
            console.log(data)
            setUserData([data.user_detail])
            setMessages(data.user_detail.chatsList.map(user => user.users))
            setFriends(data.user_detail.friendsList)
        }
    } catch (err) {
        console.log(err)
    }
}

useEffect( () => {
  if (!login) {
  const checkLogin = async () => {
  try {
    const response = await fetch ('http://localhost:3000/', {
      credentials: 'include'
    })
    if (!response.ok) {
      throw await response.json()
    }
    let data = await response.json()
    if (response.status === 200) {
      const fetchUserTwo = async () => {
        try {
            const response = await fetch (`http://localhost:3000/users/${data.user._id}`, {
                credentials: 'include'
            })
            if (!response.ok) {
                throw await response.json()
            }
            const datatwo = await response.json()
            if (response.ok) {
                console.log(datatwo)
                setUserData([datatwo.user_detail])
                setMessages(datatwo.user_detail.chatsList.map(user => user.users))
                setFriends(datatwo.user_detail.friendsList)
              setLogin(true)
              }
        } catch (err) {
            console.log(err)
        }
    }
    fetchUserTwo()
    }
  } catch (err) {
    setLogin(false)
  }
  }
  checkLogin() 
  }
}, [])

  return (
    <>
      <LoginContext.Provider value={{ setProfileEdit, profileEdit, messages, setMessages,
        fetchUser, login, setLogin, logOut, friends, setFriends, userData, setUserData, userSettings, setUserSettings}}>
        <Outlet/>
      </LoginContext.Provider>
    </>
  )
}

export default App
