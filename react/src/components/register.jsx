import { useState } from "react"
import StyledButton from "./styled/styledbutton"
import StyledDiv from "./styled/styleddiv"
import StyledLink from "./styled/styledlink"
import Discord from '../assets/discord.svg'

const Register = () => {
    const [ email, setEmail] = useState('')
    const [ password, setPassword ] = useState('')
    const [ username, setUsername ] = useState('')

    const handleForm = async (e) => {
        e.preventDefault()
        const formData = { email: email, username: username, password: password, avatar: Discord }
        try {
            const response = await fetch ('http://localhost:3000/register', {
                method: 'POST', headers: {"Content-Type": "application/json"}, body: JSON.stringify(formData)
            })
            if (!response.ok) {
                console.log('not ok')
                if (response.status === 404) {
                    throw await response.json()
                }
            }
            await response.json()
            if (response.status === 200) {
                console.log('success')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div style={{ textAlign: 'center', margin: '5%'}}>
        <h2>Create an account</h2>
            <form onSubmit={handleForm}
            style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1em'}}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                <StyledButton type="submit">Continue</StyledButton>
            </form>
            <StyledDiv style={{ padding: '1em'}}>
                <StyledLink to="/" style={{color: '#7289DA'}}>Already have an account?</StyledLink>
            </StyledDiv>
        </div>
    )
}

export default Register