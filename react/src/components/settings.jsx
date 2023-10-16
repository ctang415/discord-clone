import { useContext, useEffect, useRef } from "react"
import {styled} from 'styled-components'
import { LoginContext } from "./logincontext"

const SettingsDiv = styled.div`
    position: absolute;
    margin-top: 6.5vh;
    padding: 0.5em;
    background-color: #1e2124;
    color: red;
`

const Settings = ({setSettings, settings, setMyUsername, setId, id, setMyFriend, myUsername, myFriend}) => {
    const { fetchUser } = useContext(LoginContext)
    const settingsMenu = useRef(null)
    
    const closeSettingMenu = (e)=>{
        if (settingsMenu.current && settings && !settingsMenu.current.contains(e.target)){
          setSettings(false)
        }
    }
    
    const removeFriend = async () => {
        const request = { id: id, myUsername: myUsername, myFriend: myFriend }
        try {
            /*
            const response = await fetch('http://localhost:3000/users/remove-friend', {
                method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(request)
            })
            */

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
                setSettings(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", closeSettingMenu);
      }, [closeSettingMenu]);

    if (settings)
        return (
                <SettingsDiv ref={settingsMenu}>
                    <p onClick={() => removeFriend()}>Remove as friend</p>
                </SettingsDiv>
        )
}

export default Settings