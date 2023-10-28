import { useState, useContext, useEffect } from "react"
import { LoginContext } from "./logincontext"
import Discord from "./styled/avatar"
import Mic from '../assets/microphone.svg'
import Headset from '../assets/headphone.svg'
import UserSettings from '../assets/usersettings.svg'
import {styled} from 'styled-components'

const StyledImg = styled.img`
    padding: 0.2em;
    height: 3.5vh;
    &:hover {
        background-color:  #4a4c51;
    }
`

const LoggedUser = () => {
    const { userData, setUserSettings } = useContext(LoginContext)
    const [ user, setUser] = useState([])
    
    useEffect(() => {
        setUser(userData[0])
    }, [userData])

    return (
        <>
            <div style={{ backgroundColor: '#1e2124', position: 'fixed', bottom: '0', minWidth: '15vw', maxWidth: '15vw'}}>
                <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5em', justifyContent: 'space-evenly'}}>
                    <Discord src={user.avatar_url}/>
                    <h5>{user.display_name}</h5>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5em', alignItems: 'center'}}>  
                        <StyledImg style={{ cursor: 'pointer'}} src={Mic} alt="Microphone icon"/>
                        <StyledImg style={{ cursor: 'pointer'}} src={Headset} alt="Headset icon"/>
                        <StyledImg style={{ cursor: 'pointer'}} src={UserSettings} alt="Settings icon" onClick={()=> setUserSettings(true)}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoggedUser