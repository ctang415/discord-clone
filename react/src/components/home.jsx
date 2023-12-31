import { useContext } from "react"
import { LoginContext } from "./logincontext"
import StyledLink from "./styled/styledlink"
import StyledDiv from "./styled/styleddiv"
import StyledButton from "./styled/styledbutton"
import SideBar from "./sidebar"
import Friends from "./friends"
import { useState, useEffect } from "react"
import UserSettings from "./usersettings"

const Home = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const { login, setLogin, userData, setUserData, friends, setFriends, setMessages, isLoading, setIsLoading } = useContext(LoginContext)
    const [ error, setError ] = useState('')

    const handleLogin = async (e) => {
        setError('')
        e.preventDefault()
        const loginData = { email: email, password: password}
        try {
            const response = await fetch ('http://localhost:3000/', {
                method: 'POST', credentials: 'include',
                headers: {"Content-Type": "application/json", "Accept": 'application/json'}, body: JSON.stringify(loginData)
            })
            if (!response.ok) {
                throw await response.json()
            }
            const data = await response.json()
            if (response.status === 200) {
                setLogin(true)
                setUserData([data.data])
                setFriends(data.data.friendsList)
                setMessages(data.data.chatsList.map(user => user.users))
                setEmail('')
                setPassword('')
            }
        } catch (err) {
            console.log(err)
            setError(`${err.error.message}`)
        }
    }

    if (login && !isLoading) {
        return (
            <> 
                <div style={{ display: 'flex', flexDirection: 'row', gap: '1em'}}>
                    <UserSettings/>
                    <SideBar/>
                    <Friends/>
                </div>
            </>
        )
    } else if (!login && isLoading) { 
        return (
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', margin: '5%'}}>
                <h3>LOADING</h3>
            </div>
        )
    } else {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', margin: '5%'}}>
            <h2 style={{color: 'white'}}>Welcome back!</h2>
            <h3>We're so excited to see you again!</h3>
            <form onSubmit={handleLogin} 
            style={{ display: 'flex', flexDirection: 'column', gap: '1em', alignSelf: 'center'}}>
                <label htmlFor="email">Email</label>
                <input type='email' name="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                <label htmlFor="password">Password</label>
                <input type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                <StyledButton type="submit">Login</StyledButton>
            </form>
            <div style={{ padding: '1em', fontWeight: 'bold', color: 'red'}}>
                {error}
            </div>
            <StyledDiv>
                <p>Need an account?</p> 
                <StyledLink to="/register" style={{ color: '#7289DA'}}>Register</StyledLink>
            </StyledDiv>
            </div>
        )
    }
}

export default Home