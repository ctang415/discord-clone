import StyledInput from "./styled/styledinput"
import StyledLink from "./styled/styledlink"
import StyledList from "./styled/styledlist"
import { LoginContext } from "./logincontext"
import StyledUl from "./styled/styledul"
import {styled} from 'styled-components'
import { useState, useEffect, useContext } from "react"
import Discord from "./styled/avatar"
import StyledButton from "./styled/styledbutton"
import ChatIcon from '../assets/chat.svg'
import SettingsIcon from '../assets/settings.svg'

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

const AddFriend = ({friend, pending}) => {
    const { friends, userData, fetchUser } = useContext(LoginContext);
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
                fetchUser()
            }
        } catch (err) {
            setError(err.errors)
        }
    }

    useEffect(() => {
        console.log(friends)
        console.log(userData[0])
    }, [])

    if (pending) {
        return (
            <div style={{ padding: '4vh'}}>
            <h4 style={{color: 'white'}}>Pending</h4>
            {friends.filter(x => x.status === 'Pending').map(user => {
                return (
                    <button>
                        {user.requester.username === userData[0].username ? "PENDING REQUEST" : "Add" }
                    </button>
                )
            })}
            </div>
        )
        } else if (friend) {
    return (
        <div style={{ padding: '4vh'}}>
        <h4 style={{color: 'white'}}>ADD A FRIEND</h4>
        <form onSubmit={addFriend}>
            <div style={{ display: 'flex', gap: '2em'}}>
                <StyledInput style={{padding: '0.5em', color: 'white', width: '50%'}} placeholder="You can add friends by their Discord username" 
                type="text" name="friendUsername" value={username} onChange={(e) => setUsername(e.target.value)} required></StyledInput>
                <StyledButton style={{padding: '0.5em', borderRadius: '0.3em'}} type="submit">Send Friend Request</StyledButton>
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
            <h4>ONLINE - {friends.filter(x => x.status === 'Friends')}</h4>
            <StyledUl>
                {friends.filter(x => x.status === 'Friends').map(friend => {
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

/*
else {
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
    */