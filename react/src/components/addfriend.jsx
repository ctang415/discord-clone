import StyledInput from "./styled/styledinput"
import StyledLink from "./styled/styledlink"
import StyledList from "./styled/styledlist"
import { LoginContext } from "./logincontext"
import StyledUl from "./styled/styledul"
import {styled} from 'styled-components'
import { useState, useContext } from "react"
import Discord from "./styled/avatar"
import StyledButton from "./styled/styledbutton"


export const StyledListFriend = styled(StyledList)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid grey;
    width: 100%;
    font-weight: bold;
    &:hover {
        background-color: #4a4c51;
} 
`

const AddFriend = ({friend}) => {
    const { friends, userData } = useContext(LoginContext);
    const [ username, setUsername] = useState('')
    const [ error, setError ] = useState([])

    const addFriend = async (e) => {
        e.preventDefault()
        const friend = { username: userData[0].username , friendUsername: username }
        try {
            const response = await fetch ('http://localhost:3000/add-friend', {
                method: 'POST', headers: {'Content-type': 'application/json'}, credentials: 'include',
                body: JSON.stringify(friend)
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                alert('Request sent!')
                setUsername('')
            }
        } catch (err) {
            console.log(err.errors)
            setError(err.errors)
        }
    }

    if (friend) {
    return (
        <div style={{ padding: '4vh'}}>
        <h4 style={{color: 'white'}}>ADD A FRIEND</h4>
        <form onSubmit={addFriend}>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <StyledInput style={{padding: '0.5em', color: 'white'}} placeholder="You can add friends by their Discord username" 
                type="text" name="friendUsername" value={username} onChange={(e) => setUsername(e.target.value)} required></StyledInput>
                <StyledButton type="submit">Send Friend Request</StyledButton>
            </div>
        </form>
        {error.map(err => {
            return (
                <p key={err.msg}>{err.msg}</p>
            )
        })}
        </div>
    )
    } else {
        return (
        <div style={{ padding: '4vh'}}>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <StyledInput style={{padding: '0.5em', color: 'white'}} placeholder="Search" type="text"></StyledInput>
            </div>
            <h4>ONLINE - {friends.filter(x => x.online !== false).length}</h4>
            <StyledUl>
                {friends.filter(x => x.online !== false).map(friend => {
                    return (
                        <StyledLink style={{display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}} 
                        key={friend.name} to={`/chats/${friend.id}`}>
                            <StyledListFriend>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1em'}}>
                                    <Discord/>
                                    {friend.name}
                                </div>
                                <div style={{display: 'flex', flexDirection: 'row', gap: '1em'}}>
                                <div style={{backgroundColor: '#1e2124', borderRadius: '1em', padding: '0.5em'}}>
                                    <img src={ChatIcon} alt="Chat Icon"/>
                                </div>
                                <div style={{backgroundColor: '#1e2124', borderRadius: '1em', padding: '0.5em'}}>
                                    <img src={SettingsIcon} alt="Settings Icon"/>
                                </div>
                            </div>
                            </StyledListFriend>
                        </StyledLink>
                    )
                })}
            </StyledUl>
            </div>
        )
    }
}

export default AddFriend