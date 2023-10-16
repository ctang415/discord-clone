import { useState, useEffect } from "react"
import { useContext } from "react"
import { LoginContext } from "./logincontext"
import Discord from "./styled/avatar"
import StyledButton from "./styled/styledbutton"
import StyledInput from "./styled/styledinput"
import { StyledP, StyledUserButton, StyledUserUi } from "./usersettings"
import {styled} from 'styled-components'
import { decode } from 'html-entities'

const StyledTextArea = styled.textarea`
    border: none; 
    background-color: #1e2124;
    &:focus {
        outline: none;
}
`

const MyAccount = ({setModal, displayName, setDisplayName, about, setAbout,
    changes, setChanges, setPasswordModal, passwordModal, setEmailModal, emailModal}) => {
    const {fetchUser, setProfileEdit, profileEdit, setUserSettings, setUserData, userData, logOut, setLogin } = useContext(LoginContext)
    const  [ error, setError] = useState([])

    const handleReset = () => {
        setDisplayName(userData[0].display_name)
        setAbout(userData[0].about_me)
        setChanges(false)
        setError([])
    }

    const closeModal = () => {
        setError([])
        setUserSettings(false)
        setProfileEdit(false)
        setPasswordModal(false)
        setDisplayName(userData[0].display_name)
        setAbout(userData[0].about_me)
    }

    const handleDelete = async () => {
        const deleteAccount = {id: userData[0]._id}
        try {
            /*
            const response = await fetch ('http://localhost:3000/users/delete', {
                method: 'POST', credentials: 'include',
                headers: {'Content-type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify(deleteAccount)
            })
            */
            const response = await fetch (`http://localhost:3000/users/${userData[0].id}/delete`, {
                method: 'POST', credentials: 'include',
                headers: {'Content-type': 'application/json', 'Accept': 'application/json'}, body: JSON.stringify(deleteAccount)
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                alert('Account deleted!')
                setLogin(false)
                setUserSettings(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleChanges = async (e) => {
        e.preventDefault()
        const newChanges = { display_name: displayName, about_me: about, id: userData[0]._id}
        console.log(newChanges)
        setError([])
        try {
            const response = await fetch (`http://localhost:3000/users/${userData[0].id}/update-more`, {
                method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, 
                credentials: 'include', body: JSON.stringify(newChanges)
            })
/*
            const response = await fetch (`http://localhost:3000/users/${userData[0].id}`, {
                method: 'POST', headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, 
                credentials: 'include', body: JSON.stringify(newChanges)
            })
            */
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                alert('Update successful!')
                fetchUser()
                setChanges(false)
            }
        } catch (err) {
            console.log(err)
            setError(err.errors)
        }
    }


    useEffect( ()=> {
        if (displayName !== userData[0].display_name || about !== userData[0].about_me) {
            setChanges(true)
        } else {
            setChanges(false)
        }
    }, [displayName, about])
    
    if (!profileEdit) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: '75vw', maxWidth:'75vw', maxHeight: '85vh', 
        overflow: 'scroll'}}>
        <StyledUserUi>
            <div><h2 style={{color: 'white'}}>My Account</h2></div>
            <div className="close" onClick={() => setUserSettings(false)}>&times;</div>
        </StyledUserUi>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '1.5em', backgroundColor: '#282b30'}}>
            <StyledUserUi>
                <div style={{display: 'flex', flexDirection: 'row', gap: '1em'}}>
                    <Discord src={userData[0].avatar_url}/>
                    <h5>{userData[0].display_name}</h5>
                </div>
                <div>
                    <StyledButton onClick={() => setProfileEdit(true)}>Edit User Profile</StyledButton>
                </div>
            </StyledUserUi>
            <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#36393e', padding: '1em'}}>
                <h6>DISPLAY NAME</h6>
                <StyledUserUi><p style={{color: 'white'}}>{userData[0].display_name}</p>
                    <div><StyledUserButton onClick={()=> setProfileEdit(true)}>Edit</StyledUserButton></div>
                </StyledUserUi>
                <h6>USERNAME</h6>
                <StyledUserUi>
                    <p style={{ color: 'white'}}>{userData[0].username}</p>
                    <div><StyledUserButton onClick={()=> setModal(true)}>Edit</StyledUserButton></div>
                </StyledUserUi>
                <h6>EMAIL</h6>
                <StyledUserUi>
                    <p style={{color: 'white'}}>{userData[0].email}</p>
                    <div><StyledUserButton onClick={()=> setEmailModal(true)}>Edit</StyledUserButton></div>
                </StyledUserUi>
            </div>
        </div>
        <div>
            <h3>Password and Authentication</h3>
            <div>
                <StyledButton onClick={() => setPasswordModal(true)}>Change Password</StyledButton>
            </div>
                <h5>ACCOUNT REMOVAL</h5>
                <button onClick={()=> handleDelete()} style={{ cursor: 'pointer', color: 'white', border: '1px solid red', padding: '0.5em', backgroundColor: '#424549'}}>Delete Account</button>
            </div>
        </div>
    )} else {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', width: '80%', height: '80vh', overflow: 'scroll'}}>
            <StyledUserUi>
                <div><h2 style={{color: 'white'}}>Profiles</h2></div>
                <div className="close" onClick={() => closeModal()}>&times;</div>
            </StyledUserUi>
            <form onSubmit={handleChanges}>
                <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#36393e', padding: '1em'}}>
                <h5>DISPLAY NAME</h5>
                <StyledUserUi>
                    <StyledInput type="text" defaultValue={userData[0].display_name} name="display_name" onChange={(e) => setDisplayName(e.target.value)} 
                    style={{color: 'white'}} value={displayName} required>
                    </StyledInput>
                </StyledUserUi>
                <h5>AVATAR</h5>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '1em'}}>
                    <StyledButton>Change Avatar</StyledButton>
                    <StyledP>Remove Avatar</StyledP>
                </div>
                <h5>ABOUT ME</h5>
                <StyledTextArea style={{ color: 'white'}} defaultValue={userData[0].about_me} name="about_me"
                value={decode(about)} onChange={(e) => setAbout(e.target.value)}></StyledTextArea>
            </div>
            <div style={ changes ? { display: 'flex' } : {display: 'none'} }>
                <StyledP onClick={() => handleReset()}>Reset</StyledP> 
                <StyledButton type='submit'>Save Changes</StyledButton>
            </div>
            </form>
            {error.map(error => {
                return (
                    <div style={{ color: 'red', padding: '0.5em'}}>
                    {error.msg}
                    </div>
                )
            })}
            </div>    
        )
    }
}

export default MyAccount