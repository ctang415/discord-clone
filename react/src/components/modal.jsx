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

const Modal = ( {modal, setModal} ) => {
    const { setUserData, userData} = useContext(LoginContext);
    const [ username, setUsername ] = useState(userData[0].username)
    const [ password, setPassword] = useState('')
    const [ error, setError] = useState([])

    const fetchUser = async () => {
        try {
            const response = await fetch ('http://localhost:3000/user-detail')
            if (!response.ok) {
                throw await response.json()
            }
            const data = await response.json()
            if (response.status === 200) {
                setUserData([data.data])
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    const handleForm = async (e) => {
        e.preventDefault()
        const update = { id: userData[0]._id, username: username, password: password }
        setError([])
        try {
            const response = await fetch ('http://localhost:3000/users/update', {
                method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(update) 
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                alert('Username successfully updated!')
                setModal(false)
                setPassword('')
                fetchUser()
            }
        } catch (err) {
            setError(err.errors)
        }
    }

    const closeModal = () => {
        setModal(false)
        setError([])
        setPassword('')
        setUsername(userData[0].username)
    }

    if (modal) {
        return (
        <div id="myModal" className="modal">
            <div className="modal-user-content">
            <div className="close" style={{ float: 'right'}} onClick={closeModal}>&times;</div>
                <h3 style={{textAlign: 'center', color: 'white'}}>Change your username</h3>
                <p style={{ textAlign: 'center'}}>Enter a new username and your existing password.</p>
                <form onSubmit={handleForm} style={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
                    <label htmlFor="username" style={{ fontWeight: 'bold', fontSize: '1.75vh'}}>USERNAME</label>
                    <StyledInput type="string" name="username" defaultValue={userData[0].username} style={{ color: 'white'}}
                    onChange={(e) => setUsername(e.target.value)} value={username} required></StyledInput>
                    <label htmlFor="password" style={{ fontWeight: 'bold', fontSize: '1.75vh'}}>CURRENT PASSWORD</label>
                    <StyledInput type="password" name="password" value={password} style={{ color: 'white'}}
                    onChange={(e) => setPassword(e.target.value)} required></StyledInput>
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

export default Modal