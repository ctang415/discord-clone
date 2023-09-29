import { useState, useContext, useEffect } from "react"
import { LoginContext } from "./logincontext"
import {styled} from 'styled-components'
import Discord from "./styled/avatar"
import StyledButton from "./styled/styledbutton"
import StyledUi from "./styled/styledui"
import Modal from "./modal"
import MyProfile from "./myprofile"
import MyAccount from "./myaccount"

export const StyledP = styled.p`
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

export const StyledUserButton = styled.button`
    color: white;
    background-color: grey;
    border: none;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    padding-left: 1em;
    padding-right: 1em;
    border-radius: 0.2em;
    cursor: pointer;
`

const UserSettings = () => {
    const { userSettings, userData} = useContext(LoginContext)
    const [ modal, setModal ] = useState(false)
    const [ profileEdit, setProfileEdit] = useState(false)
    const [ changes, setChanges ] = useState(false)
    const [ displayName, setDisplayName] = useState(userData[0].display_name)
    const [ about, setAbout ] = useState(userData[0].about_me)

    const clearChanges = () => {
        setDisplayName(userData[0].display_name)
        setAbout(userData[0].about_me)
        setChanges(false)
    }

    useEffect(() => {
        console.log(userSettings) 
    }, [])
    
    if (userSettings) {
        return (
            <div className="modal-content">
                <Modal modal={modal} setModal={setModal} />
                <div style= {{display: 'flex', flexDirection: 'row', width: '100%', gap: '3em',}}>
                    <MyProfile clearChanges={clearChanges}
                    setProfileEdit={setProfileEdit} profileEdit={profileEdit}/>
                    <MyAccount setChanges={setChanges} changes={changes} setAbout={setAbout} displayName={displayName} setDisplayName={setDisplayName}
                    setModal={setModal} setProfileEdit={setProfileEdit} profileEdit={profileEdit} about={about}/>
                    </div>
                </div>
        )
    }
}

export default UserSettings