import { useState, useContext, useEffect, useRef } from "react"
import {styled} from 'styled-components'
import { LoginContext } from "./logincontext"
import SettingsIcon from '../assets/settings.svg'

export const SettingsDiv = styled.div`
    position: absolute;
    margin-top: 6.5vh;
    padding: 0.5em;
    background-color: #1e2124;
    color: red;
`

const Settings = ({setMyUsername, setId, id, setMyFriend, myUsername, myFriend, friend}) => {
    const { userData, fetchUser } = useContext(LoginContext)
    const settingsMenu = useRef(null)
    const [ options, setOptions] = useState(false)
        
    const closeSettingMenu = (e)=>{
        if (settingsMenu.current && options && !settingsMenu.current.contains(e.target)){
          setOptions(false)
        }
    }
    
    const removeFriend = async () => {
        const request = { id: id, myUsername: myUsername, myFriend: myFriend }
        try {
            const response = await fetch(`http://localhost:3000/users/${userData[0].id}/friends/${myFriend}`, {
                method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(request)
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                alert('Friend removed!')
                fetchUser()
                setId('')
                setMyFriend('')
                setMyUsername('')
                setOptions(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", closeSettingMenu);
      }, [closeSettingMenu]);

        return (
            <>            
                <div style={{backgroundColor: '#1e2124', borderRadius: '1em', padding: '0.5em'}}>
                    <img onClick={() => { console.log(friend._id); setOptions(true); setId(friend._id); setMyUsername(friend.recipient.id); setMyFriend(friend.requester.id) }} src={SettingsIcon} alt="Settings Icon"/>
                </div>
                <SettingsDiv style={options ? { display: 'flex'} : {display: 'none'}} ref={settingsMenu}>
                    <p onClick={() => removeFriend()}>Remove as friend</p>
                </SettingsDiv>
            </>
        )
}

export default Settings