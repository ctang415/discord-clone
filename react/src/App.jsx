import { useState, useEffect } from 'react'
import './App.css'
import { Outlet } from 'react-router'
import { LoginContext } from './components/logincontext'

function App() {
  const [ userSettings, setUserSettings] = useState(false)
  const [login, setLogin] = useState(false)
  const [ friends, setFriends ] = useState([])
  const [ userData, setUserData ] = useState([])

  const logOut = async (email) => {
    const username = {  username: email }
    try {
      let response = await fetch ('http://localhost:3000/logout', {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(username)
    })
        await response.json()
        if (response.status === 200) {
          setLogin(false)  
          alert('Successfully logged out!')
        }
      } catch (err) {
        console.log(err)
      }
  }

  useEffect(() => {
    console.log(userData) 
  }, [userData])

  return (
    <>
      <LoginContext.Provider value={{ login, setLogin, logOut, friends, setFriends, userData, setUserData, userSettings, setUserSettings}}>
        <Outlet/>
      </LoginContext.Provider>
    </>
  )
}

export default App
