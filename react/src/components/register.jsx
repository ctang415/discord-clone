import StyledButton from "./styled/styledbutton"
import StyledDiv from "./styled/styleddiv"
import StyledLink from "./styled/styledlink"

const Register = () => {
    return (
        <>
        <h2>Create an account</h2>
            <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1em'}}>
                <label>Email</label>
                <input type="email"></input>
                <label>Username</label>
                <input type="text"></input>
                <label>Password</label>
                <input type='password'></input>
                <StyledButton>Continue</StyledButton>
            </form>
            <StyledDiv style={{ padding: '1em'}}>
                <StyledLink to="/">Already have an account?</StyledLink>
            </StyledDiv>
        </>
    )
}

export default Register