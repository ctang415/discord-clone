import { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import LoggedUser from "./loggeduser"
import { LoginContext } from "./logincontext"
import StyledInput from "./styled/styledinput"
import StyledLink from "./styled/styledlink"
import StyledList from "./styled/styledlist"
import StyledNav from "./styled/stylednav"
import StyledUl from "./styled/styledul"
import Discord from "./styled/avatar"
import Friend from '../assets/person.svg'
const StyledH4 = styled.h4`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5em;
    margin: 0;
    padding: 1em;
    &:hover {
        background-color: #424549;
    } 
`

const SideBar = () => {
    const { friends, userData, messages } = useContext(LoginContext)
    const [ myFriends, setMyFriends ] = useState([])

    useEffect(() => {
        setMyFriends(friends.map(friend => friend.recipient.display_name !== userData[0].display_name ? friend.recipient.display_name : friend.requester.display_name))
        let x = friends.map(friend => friend.recipient.display_name !== userData[0].display_name ? friend.recipient.display_name : friend.requester.display_name)
        let y = messages.map(user =>  user.filter(x => x.display_name !== userData[0].display_name)[0].display_name)
        
        console.log(friends.map(friend => friend.recipient.display_name !== userData[0].display_name ? friend.recipient.display_name : friend.requester.display_name))
        console.log(messages.map(user =>  user.filter(x => x.display_name !== userData[0].display_name)[0].display_name))
        
    }, [])
    
    return (
        <div style={{ display: "flex", flexDirection: 'column', backgroundColor: '#36393e', 
        minWidth: "15vw", maxWidth: "15vw", minHeight: '95vh', maxHeight: '95vh', overflow: 'scroll'}}>
            <StyledNav style={{display: 'flex', maxWidth: '15vw', position: 'fixed'}}>
                <StyledInput style={{ display: 'flex', color: 'white', padding: '0.45em'}} placeholder="Find or start a conversation" type="text"></StyledInput>
            </StyledNav>
            <div style={{ padding: '4vh', marginTop: '5vh'}}>
            <StyledLink to="/">
                <StyledH4><img src={Friend} alt="Friend Icon"></img>Friends</StyledH4>
            </StyledLink>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h5>DIRECT MESSAGES</h5> 
            <h5>+</h5>
            </div>
            <StyledUl>
                {messages.map(user => {
                    return (
                        <div key={user.filter(x => x._id !== userData[0].id)[0].display_name} style={ myFriends.includes((user.filter(x => x._id !== userData[0].id)[0].display_name)) ? { display: 'flex', flexDirection:'row'} : {display: 'none'}}>                        
                        <StyledLink to={`/users/${userData[0].id}/chats/${user.filter(x => x._id !== userData[0].id)[0].id}`}>
                            <StyledList style={{ display: 'flex', gap: '1em', alignItems: 'center'}}>
                                <Discord src={user.filter(x => x._id !== userData[0].id)[0].avatar_url}/>
                                {user.filter(x => x._id !== userData[0].id)[0].display_name}
                            </StyledList>
                        </StyledLink>
                        </div>
                    )
                })}
            </StyledUl>
            </div>
            <LoggedUser/>
        </div>
    )
}

export default SideBar