import { useContext } from "react"
import { LoginContext } from "./logincontext"
import StyledLink from "./styled/styledlink"
import StyledList from "./styled/styledlist"
import StyledUl from "./styled/styledul"
import {styled} from 'styled-components'
import StyledInput from "./styled/styledinput"
import StyledNav from "./styled/stylednav"
import ChatIcon from '../assets/chat.svg'
import SettingsIcon from '../assets/settings.svg'
import Discord from "./styled/avatar"
import Friend from '../assets/person.svg'

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

const Friends = () => {
    const { friends } = useContext(LoginContext)
    const friendFilter = ['Online', 'All', 'Pending', 'Blocked']
    
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
                        <li style={{ cursor: 'pointer' }} key={friend}>{friend}</li>
                    )
                })}
                <button style={{ backgroundColor: 'green', color: 'white', border: 'none'}}>Add Friend</button>
            </ul>
        </StyledNav>
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
        </div>
        </>
    )
}

export default Friends