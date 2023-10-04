import { useContext } from "react"
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
    const { friends, userData } = useContext(LoginContext)
    
    return (
        <div style={{ display: "flex", flexDirection: 'column', backgroundColor: '#36393e', 
        minWidth: "15vw", maxWidth: "15vw", minHeight: '100vh', maxHeight: '100vh'}}>
            <StyledNav style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <StyledInput style={{ display: 'flex', width: '90%', color: 'white', padding: '0.45em'}} placeholder="Find or start a conversation" type="text"></StyledInput>
            </StyledNav>
            <div style={{ padding: '4vh'}}>
            <StyledLink to="/">
                <StyledH4><img src={Friend} alt="Friend Icon"></img>Friends</StyledH4>
            </StyledLink>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <h5>DIRECT MESSAGES</h5> 
            <h5>+</h5>
            </div>
            <StyledUl>
                {userData[0].chatsList.map(user => {
                    return (
                        <div key={user.name} style={{ display: 'flex', flexDirection:'row'}}>                        
                        <StyledLink  to={`/chats/${user.id}`}>
                            <StyledList style={{ display: 'flex', gap: '1em', alignItems: 'center'}}>
                                <Discord/>
                                {user.name}
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