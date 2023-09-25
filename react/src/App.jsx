import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router'
import { LoginContext } from './components/logincontext'

function App() {
  const [login, setLogin] = useState(false)
  const [ data, setData ] = useState( [ 
      {name: 'Makarich', online: false, message: ['Hey', '?', 'ok'], id: "756733"}, 
      {name: 'BV', online: true, message: ['yo'], id: '6231213'}, 
      { name: 'Toki', online: true, message: [':o'], id: '3123213' }, 
      { name: 'saru', online: false, message: ['val?'], id: '4354354'}
    ])
    const [ userData, setUserData ] = useState( {name: 'cb' } )
  
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
      <LoginContext.Provider value={{ login, setLogin, logOut, data, userData}}>
        <Outlet/>
      </LoginContext.Provider>
    </>
  )
}

export default App
