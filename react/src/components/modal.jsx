import { useState, useContext } from "react"
import styled from "styled-components";
import { LoginContext } from "./logincontext"
import StyledButton from "./styled/styledbutton";
import StyledInput from "./styled/styledinput";

const StyledCancel = styled.p`
    color: white;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`

const Modal = ( {modal, setModal} ) => {
    const {userData} = useContext(LoginContext);
    const [ username, setUsername ] = useState('')
    const [ password, setPassword] = useState('')
    
    const handleForm = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch ('http://localhost:3000/update')
        } catch {

        }
    }

    if (modal) {
        return (
        <div id="myModal" className="modal">
            <div className="modal-user-content">
            <div className="close" style={{ float: 'right'}} onClick={() => setModal(false)}>&times;</div>
                <h3 style={{textAlign: 'center', color: 'white'}}>Change your username</h3>
                <p style={{ textAlign: 'center'}}>Enter a new username and your existing password.</p>
                <form onSubmit={handleForm} style={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
                    <label htmlFor="username" style={{ fontWeight: 'bold', fontSize: '1.75vh'}}>USERNAME</label>
                    <StyledInput type="string" name="username" value={userData[0].username} style={{ color: 'white'}}
                    onChange={(e) => setUsername(e.target.value)} required></StyledInput>
                    <label htmlFor="password" style={{ fontWeight: 'bold', fontSize: '1.75vh'}}>CURRENT PASSWORD</label>
                    <StyledInput type="password" name="password" value={password} style={{ color: 'white'}}
                    onChange={(e) => setPassword(e.target.value)} required></StyledInput>
                    <div style={{display:'flex', justifyContent:'flex-end', gap: '1em'}}>
                    <StyledCancel onClick={() => setModal(false)}>Cancel</StyledCancel>
                    <StyledButton type="submit">Done</StyledButton>
                    </div>
                </form>
            </div>
            </div>
        )
    }
}

export default Modal