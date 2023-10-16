import { useState } from "react"
import StyledButton from "./styled/styledbutton"
import StyledDiv from "./styled/styleddiv"
import StyledLink from "./styled/styledlink"
import Discord from '../assets/discord.svg'
import { useNavigate } from "react-router"

const Register = () => {
    const [ email, setEmail] = useState('')
    const [ password, setPassword ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ error, setError] = useState([])
    const navigate = useNavigate()

    const handleForm = async (e) => {
        e.preventDefault()
        const formData = { email: email, username: username, password: password, avatar: Discord }
        try {
            setError([])
           /*
            const response = await fetch ('http://localhost:3000/register', {
                method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(formData)
            })
            */

            const response = await fetch ('http://localhost:3000/users', {
                method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(formData)
            })
            if (!response.ok) {
                if (response.status === 400) {
                    throw await response.json()
                }
            }
            await response.json()
            if (response.status === 200) {
                setError([])
                alert('Account creation successful! Redirecting to login page...')
                setTimeout(() => {
                    navigate('/')
                }, 1000)
            }
        } catch (err) {
            setError(err.errors)
        }
    }

    return (
        <div style={{ textAlign: 'center', margin: '5%'}}>
        <h2>Create an account</h2>
            <form  onSubmit={handleForm}
            style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1em', padding: '1em'}}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
                <label htmlFor="password">Password</label>
                <input type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                <StyledButton type="submit">Continue</StyledButton>
            </form>
            <div style={{ fontWeight: 'bold', color: 'red'}}>
                {error.length !== 0 ? error.map(err => {
                    return (
                        <p key={err.msg}>* {err.msg}</p>
                    )
                }) : null}
            </div>
            <StyledDiv style={{ padding: '1em'}}>
                <StyledLink to="/" style={{color: '#7289DA'}}>Already have an account?</StyledLink>
            </StyledDiv>
        </div>
    )
}

export default Register