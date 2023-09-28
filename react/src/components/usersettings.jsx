import { useState, useContext, useEffect } from "react"
import { LoginContext } from "./logincontext"
import {styled} from 'styled-components'
import Discord from "./styled/avatar"
import StyledButton from "./styled/styledbutton"
import StyledUi from "./styled/styledui"
import Modal from "./modal"

const StyledP = styled.p`
    cursor: pointer;
    padding: 0.5em;

    &:hover {
        background-color: #4a4c51;
    }
`

export const StyledUserUi = styled(StyledUi)`
    align-items: center;
    justify-content: space-between;
`

const StyledUserButton = styled.button`
    color: white;
    background-color: grey;
    border: none;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    padding-left: 1em;
    padding-right: 1em;
    border-radius: 0.2em;
`

const UserSettings = () => {
    const { userSettings, setUserSettings, logOut, userData} = useContext(LoginContext)
    const [ modal, setModal ] = useState(false)

    useEffect(() => {
        console.log(userSettings) 
    }, [])
    
    if (userSettings) {
        return (
            <div className="modal-content">
                <Modal modal={modal} setModal={setModal} />
                <div style= {{display: 'flex', flexDirection: 'row', margin: '1%', gap: '3em'}}>
                    <div style={{ display: 'flex', flexDirection: 'column', padding: '0.5em'}}>
                        <h5>USER SETTINGS</h5>
                        <StyledP>My Account</StyledP>
                        <StyledP>Profiles</StyledP>
                        <StyledP onClick={() => logOut(userData[0].email)}>Log Out</StyledP>   
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', width: '80%', height: '80vh', overflow: 'scroll'}}>
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
                                    <StyledButton>Edit User Profile</StyledButton>
                                </div>
                            </StyledUserUi>
                            <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#36393e', padding: '1em'}}>
                                <h6>DISPLAY NAME</h6>
                                <StyledUserUi><p style={{color: 'white'}}>{userData[0].display_name}</p>
                                    <div><StyledUserButton>Edit</StyledUserButton></div>
                                </StyledUserUi>
                                <h6>USERNAME</h6>
                                <StyledUserUi>
                                    <p style={{ color: 'white'}}>{userData[0].username}</p>
                                    <div><StyledUserButton onClick={()=> setModal(true)}>Edit</StyledUserButton></div>
                                </StyledUserUi>
                                <h6>EMAIL</h6>
                                <StyledUserUi>
                                    <p style={{color: 'white'}}>{userData[0].email}</p>
                                    <div><StyledUserButton>Edit</StyledUserButton></div>
                                </StyledUserUi>
                            </div>
                        </div>
                        <div>
                            <h3>Password and Authentication</h3>
                            <div>
                                <StyledButton>Change Password</StyledButton>
                            </div>
                                <h5>ACCOUNT REMOVAL</h5>
                                <button style={{ color: 'white', border: '1px solid red', padding: '0.5em', backgroundColor: '#424549'}}>Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}

export default UserSettings