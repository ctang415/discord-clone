import { useState } from "react"
import StyledNav from "./styled/stylednav"
import Friend from '../assets/person.svg'
import AddFriend from "./addfriend"

const Friends = () => {
    const [ friend, setFriend ] = useState(false)
    const friendFilter = [ {name: 'Online', function: () => setFriend(false)}, {name: 'All', function: () =>setFriend(false)}, 
    {name: 'Pending'}, {name: 'Blocked'}]

    return (
        <>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
        <StyledNav style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <h4 style={{margin: '0', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.2em'}}>
                <img src={Friend} alt="Friend icon"/>
                Friends</h4>
            <ul style={{display: 'flex', gap: '1.5em', listStyle: 'none'}}>
                {friendFilter.map(friend => {
                    return (
                        <li style={{ cursor: 'pointer' }} key={friend.name} onClick={friend.function}
                        >{friend.name}</li>
                    )
                })}
                <button onClick={() => setFriend(true)} 
                style={{ backgroundColor: 'green', color: 'white', border: 'none'}}>Add Friend</button>
            </ul>
        </StyledNav>
        <AddFriend friend={friend} />
        </div>
        </>
    )
}

export default Friends