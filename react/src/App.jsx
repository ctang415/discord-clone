import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router'
import { LoginContext } from './components/logincontext'

function App() {
  const [login, setLogin] = useState(true)
  
  const logOut = async () => {
    try {
      let response = await fetch ('http://localhost:3000/logout', {
        method: 'POST' })
        await response.json()
        if (response.status === 200) {
          setLogin(false)  
          alert('Successfully logged out!')
        }
      } catch (err) {
        console.log(err)
      }
  }

  return (
    <>
      <LoginContext.Provider value={{ login, setLogin, logOut}}>
        <Outlet/>
      </LoginContext.Provider>
    </>
  )
}

export default App
