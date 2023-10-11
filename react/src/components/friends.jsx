import { useState } from "react"
import StyledNav from "./styled/stylednav"
import Friend from '../assets/person.svg'
import AddFriend from "./addfriend"

const Friends = () => {
    const [ friend, setFriend ] = useState(false)
    const [ pending, setPending] = useState(false)
    const [ all, setAll ] = useState(false)
    const changeFilter = () => {
        setFriend(false)
        setPending(false)
        setAll(false)
    }

    const changeFriend = () => {
        setFriend(true)
        setPending(false)
        setAll(false)
    }

    const changeAll = () => {
        setAll(true)
        setPending(false)
        setFriend(false)
    }
    const friendFilter = [ {name: 'Online', function: () => changeFilter()}, {name: 'All', function: () => changeAll()}, 
    {name: 'Pending', function: () => setPending(true)}, {name: 'Blocked'}]
    
    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
        <StyledNav style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <h4 style={{margin: '0', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.2em'}}>
                <img src={Friend} alt="Friend icon"/>
                Friends
            </h4>
            <ul style={{display: 'flex', gap: '1.5em', listStyle: 'none'}}>
                {friendFilter.map(friend => {
                    return (
                        <li style={{ cursor: 'pointer' }} key={friend.name} onClick={friend.function}>{friend.name}</li>
                    )
                })}
                <button onClick={() => changeFriend()} 
                style={{ backgroundColor: 'green', color: 'white', border: 'none'}}>Add Friend</button>
            </ul>
        </StyledNav>
        <AddFriend all={all} friend={friend} pending={pending} />
        </div>
        </>
    )
}

export default Friends