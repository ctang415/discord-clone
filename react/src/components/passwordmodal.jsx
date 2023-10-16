import { useState, useContext } from "react"
import styled from "styled-components";
import { LoginContext } from "./logincontext"
import StyledButton from "./styled/styledbutton";
import StyledInput from "./styled/styledinput";

export const StyledCancel = styled.p`
    color: white;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`

const PasswordModal = ( {setPasswordModal, passwordModal} ) => {
    const { fetchUser, setUserData, userData} = useContext(LoginContext);
    const [ password, setPassword] = useState('')
    const [ newPassword, setNewPassword] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ error, setError] = useState([])

    const handleForm = async (e) => {
        e.preventDefault()
        const update = { id: userData[0]._id, password: password, newPassword: newPassword, confirmPassword: confirmPassword }
        setError([])
        try {
            
            const response = await fetch (`http://localhost:3000/users/${userData[0].id}/update-password`, {
                method: 'POST', credentials: 'include', headers: {'Content-Type': 'application/json', 
                'Accept': 'application/json'}, body: JSON.stringify(update) 
            })
            /*
            const response = await fetch (`http://localhost:3000/users/${userData[0].id}`, {
                method: 'POST', credentials: 'include', headers: {'Content-Type': 'application/json', 
                'Accept': 'application/json'}, body: JSON.stringify(update) 
            })
            */
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                alert('Password successfully updated!')
                setPasswordModal(false)
                setPassword('')
                setNewPassword('')
                setConfirmPassword('')
                fetchUser()
            }
        } catch (err) {
            setError(err.errors)
        }
    }

    const closeModal = () => {
        setPasswordModal(false)
        setError([])
        setPassword('')
        setNewPassword('')
        setConfirmPassword('')
    }

    if (passwordModal) {
        return (
        <div id="myModal" className="modal">
            <div className="modal-user-content">
            <div className="close" style={{ float: 'right'}} onClick={closeModal}>&times;</div>
                <h3 style={{textAlign: 'center', color: 'white'}}>Update your password</h3>
                <p style={{ textAlign: 'center'}}>Enter your current password and a new password.</p>
                <form onSubmit={handleForm} style={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
                    <label htmlFor="password" style={{ fontWeight: 'bold', fontSize: '1.75vh'}}>CURRENT PASSWORD</label>
                    <StyledInput type="password" name="password" style={{ color: 'white'}}
                    onChange={(e) => setPassword(e.target.value)} value={password} required></StyledInput>
                    <label htmlFor="newPassword" style={{ fontWeight: 'bold', fontSize: '1.75vh'}}>NEW PASSWORD</label>
                    <StyledInput type="password" name="newPassword" value={newPassword} style={{ color: 'white'}}
                    onChange={(e) => setNewPassword(e.target.value)} required></StyledInput>
                    <label htmlFor="confirmPassword" style={{ fontWeight: 'bold', fontSize: '1.75vh'}}>CONFIRM NEW PASSWORD</label>
                    <StyledInput type="password" name="confirmPassword" value={confirmPassword} style={{ color: 'white'}}
                    onChange={(e) => setConfirmPassword(e.target.value)} required></StyledInput>
                    <div style={{display:'flex', justifyContent:'flex-end', gap: '1em'}}>
                    <StyledCancel onClick={closeModal}>Cancel</StyledCancel>
                    <StyledButton type="submit">Done</StyledButton>
                    </div>
                </form>
                <div style={{textAlign: 'center'}}>
                    {error.length > 0 ? error.map(item => {
                        return (
                            <p key={item.msg}>{item.msg}</p>
                        )
                    }) : null}
                </div>
            </div>
            </div>
        )
    }
}

export default PasswordModal