import StyledInput from "./styled/styledinput"
import StyledLink from "./styled/styledlink"
import StyledList from "./styled/styledlist"
import { LoginContext } from "./logincontext"
import StyledUl from "./styled/styledul"
import {styled} from 'styled-components'
import { useState, useRef, useEffect, useContext } from "react"
import Discord from "./styled/avatar"
import StyledButton from "./styled/styledbutton"
import ChatIcon from '../assets/chat.svg'
import SettingsIcon from '../assets/settings.svg'
import StyledUi from "./styled/styledui"
import Settings from "./settings"

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

const AddFriend = ({friend, pending, all}) => {
    const { friends, userData, fetchUser } = useContext(LoginContext);
    const [ username, setUsername] = useState('')
    const [ error, setError ] = useState([])
    const [ id, setId] = useState('')
    const [ friendUsername, setFriendUsername] = useState('')
    const [ accept, setAccept] = useState(false)
    const [ user, setUser] = useState('')
    const [settings, setSettings] = useState(false)
    const [ myUsername, setMyUsername] = useState('')
    const [ myFriend, setMyFriend] = useState('')

    const addFriend = async (e) => {
        e.preventDefault()
        setError([])
        const friend = { username: userData[0].username, friendUsername: username }
        try {
            /*
            const response = await fetch ('http://localhost:3000/add-friend', {
                method: 'POST', headers: {'Content-type': 'application/json'}, credentials: 'include',
                body: JSON.stringify(friend)
            })
            */
            const response = await fetch (`http://localhost:3000/users/${userData[0].id}/friends`, {
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

    const cancelRequest = async () => {
        const request = { id: id, user: user, friend: friendUsername}    
        try {
            const response = await fetch ('http://localhost:3000/users/delete-request', {
                method: 'POST', headers: {'Content-Type': 'application/json'}, credentials: 'include',
                body: JSON.stringify(request)
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                alert('Friend request removed!')
                fetchUser()
                setId('')
                setUser('')
                setFriendUsername('')
                setAccept(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const acceptRequest = async () => {
        const request = { id: id, user: user, friend: friendUsername}
        try {
            const response = await fetch ('http://localhost:3000/users/accept-request', {
                method: 'POST', headers: {'Content-Type': 'application/json'}, credentials: 'include',
                body: JSON.stringify(request)
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                alert('Friend added!')
                fetchUser()
                setId('')
                setUser('')
                setFriendUsername('')
                setAccept(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (user !== '' && friendUsername !== '' && id !== ''){
            if (accept) {
                acceptRequest()
            } else {
                cancelRequest()
            }
        }
    }, [friendUsername])

    if (pending) {
        return (
            <div style={{ padding: '4vh'}}>
            <h4 style={{color: 'white'}}>Pending</h4>
            <StyledUl>
            {friends.filter(x => x.status === 'Pending').map(user => {
                return (
                <StyledUi style={{ alignItems: 'center', justifyContent: 'space-between'}} key={user.requester.username}>
                    <StyledUi style={{ gap: '1em'}}>
                    <Discord src={user.recipient.avatar_url}/>
                    <p>{user.recipient.display_name}</p>
                    </StyledUi>
                    <StyledUi style={{ gap: '1em'}}>
                    <button onClick={ 
                        user.requester.username === userData[0].username ?
                        () => {setId(`${user._id}`, () => id); setUser(`${user.requester._id}`); setFriendUsername(`${user.recipient._id}`);  } :
                        () => { setAccept(true); setId(`${user._id}`); setUser(`${user.requester._id}`); setFriendUsername(`${user.recipient._id}`);}
                        }>
                        {user.requester.username === userData[0].username ? "Cancel request" : "Add friend" }
                    </button>
                    <button onClick={
                        () =>{ setId(`${user._id}`); setUser(`${user.requester._id}`); setFriendUsername(`${user.recipient._id}`); }
                    }
                    style={ user.requester.username !== userData[0].username ? { display: 'flex'} : { display: 'none'}}>
                    Deny
                    </button>
                    </StyledUi>
                </StyledUi>
                )
            })}
            </StyledUl>
            </div>
        )
    } else if (all) {
        return (
            <div style={{ padding: '4vh'}}>
            <h4 style={{color: 'white'}}>All</h4>
            <StyledUl>
            {friends.filter(x => x.status === 'Friends').map(friend => {
                return (
                <div key={friend.recipient.display_name === userData[0].display_name ? friend.requester.display_name : friend.recipient.display_name} to={`/chats/${friend.requester.id}`}
                style={{display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <StyledListFriend>
                <StyledLink to={ friend.recipient.display_name === userData[0].display_name ? `/chats/${friend.requester.id}` : `/chats${friend.recipient.id}`}> 
                    
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1em'}}>
                                <Discord src={ friend.recipient.display_name === userData[0].display_name ? friend.requester.avatar_url : friend.recipient.avatar_url}/>
                                {friend.recipient.display_name === userData[0].display_name ? friend.requester.display_name : friend.recipient.display_name}
                            </div>
                </StyledLink>
                <div style={{display: 'flex', flexDirection: 'row', gap: '1em'}}>
                <StyledLink to={ friend.recipient.display_name === userData[0].display_name ? `/chats/${friend.requester.id}` : `/chats${friend.recipient.id}`}>
                <div style={{backgroundColor: '#1e2124', borderRadius: '1em', padding: '0.5em'}}>
                    <img src={ChatIcon} alt="Chat Icon"/>
                </div>
                </StyledLink>
                <Settings setSettings={setSettings} settings={settings} setId={setId} setMyUsername={setMyUsername} setMyFriend={setMyFriend} 
                id={id} myFriend={myFriend} myUsername={myUsername} />
                <div style={{backgroundColor: '#1e2124', borderRadius: '1em', padding: '0.5em'}}>
                    <img onClick={() => { setSettings(true); setId(friend._id); setMyUsername(friend.recipient.id); setMyFriend(friend.requester.id) }} src={SettingsIcon} alt="Settings Icon"/>
                </div>
            </div>
            </StyledListFriend>
            </div>
                )
            })}
            </StyledUl>
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
            <h4>ONLINE - {friends.filter(x => x.status === 'Friends').filter(x => x.recipient.display_name === userData[0].display_name ? (x.requester.online === true) : (x.recipient.online === true)).length}</h4>
            <StyledUl style={{ width: '95%'}}>
            {friends.filter(x => x.status === 'Friends').map(friend => {
                return (
                    <StyledListFriend style={ friend.recipient.display_name === userData[0].display_name ? friend.requester.online === true ? {display: 'flex'} : {display: 'none'} : friend.recipient.online === true ? {display: 'flex'} : {display: 'none'} }  
                    key={friend.recipient.display_name === userData[0].display_name ? friend.requester.display_name : friend.recipient.display_name}>
                        <StyledLink style={{display:'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} 
                         to={ friend.requester.display_name === userData[0].display_name ? `/chats/${friend.recipient.id}` : `/chats/${friend.requester.id}`}>
                                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1em'}}>
                                    <Discord src={ friend.recipient.display_name === userData[0].display_name ? friend.requester.avatar_url : friend.recipient.avatar_url}/>
                                    { friend.recipient.display_name === userData[0].display_name ? friend.requester.display_name : friend.recipient.display_name}
                                </div>
                            </StyledLink>
                                <div style={{display: 'flex', flexDirection: 'row', gap: '1em'}}>
                                <StyledLink to={ friend.requester.display_name === userData[0].display_name ? `/chats/${friend.recipient.id}` : `/chats/${friend.requester.id}`}>
                                <div style={{backgroundColor: '#1e2124', borderRadius: '1em', padding: '0.5em'}}>
                                    <img src={ChatIcon} alt="Chat Icon"/>
                                </div>
                                </StyledLink>
                                <Settings settings={settings} setSettings={setSettings} setId={setId} setMyUsername={setMyUsername} setMyFriend={setMyFriend}
                                id={id} myUsername={myUsername} myFriend={myFriend}/>
                                <div style={{backgroundColor: '#1e2124', borderRadius: '1em', padding: '0.5em'}}>
                                    <img onClick={() => {setSettings(true); setId(friend._id); setMyUsername(friend.recipient.id); setMyFriend(friend.requester.id) }} src={SettingsIcon} alt="Settings Icon"/>
                                </div>
                            </div>
                    </StyledListFriend>
                    )
                })}
            </StyledUl>
            
            </div>
        )
    }
}

export default AddFriend
