import { useContext } from "react"
import { LoginContext } from "./logincontext"
import StyledLink from "./styled/styledlink"
import StyledDiv from "./styled/styleddiv"
import StyledButton from "./styled/styledbutton"
import SideBar from "./sidebar"
import Friends from "./friends"
import { useState, useEffect } from "react"

const Home = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const { login } = useContext(LoginContext)


    if (login) {
        return (
            <> 
                <div style={{ display: 'flex', flexDirection: 'row', gap: '1em'}}>
                    <SideBar/>
                    <Friends/>
                </div>
            </>
        )
    } else {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', margin: '5%'}}>
            <h2 style={{color: 'white'}}>Welcome back!</h2>
            <h3>We're so excited to see you again!</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1em', alignSelf: 'center'}}>
                <label htmlFor="email">Email</label>
                <input type='email' name="email" required></input>
                <label htmlFor="password">Password</label>
                <input type='password' name="password" required></input>
                <StyledButton>Login</StyledButton>
            </form>
            <StyledDiv>
                <p>Need an account?</p> 
                <StyledLink to="/register" style={{ color: '#7289DA'}}>Register</StyledLink>
            </StyledDiv>
            </div>
        )
    }
}

export default Home