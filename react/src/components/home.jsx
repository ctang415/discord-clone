import { useContext } from "react"
import { LoginContext } from "./logincontext"
import StyledLink from "./styled/styledlink"
import StyledDiv from "./styled/styleddiv"

const Home = () => {
    const { login } = useContext(LoginContext)
    
    if (login) {
        return (
            <>
            </>
        )
    } else {
        return (
            <div style={{ display: 'flex', flexDirection: 'column'}}>
            <h2>Welcome back!</h2>
            <h3>We're so excited to see you again!</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1em', alignSelf: 'center'}}>
                <label htmlFor="email">Email</label>
                <input type='email' name="email" required></input>
                <label htmlFor="password">Password</label>
                <input type='password' name="password" required></input>
                <button>Login</button>
            </form>
            <StyledDiv>
                <p>Need an account?</p> 
                <StyledLink to="/register">Register</StyledLink>
            </StyledDiv>
            </div>
        )
    }
}

export default Home