import { useContext } from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import styled from "styled-components"
import { LoginContext } from "./logincontext"
import SideBar from "./sidebar"
import Discord from "./styled/avatar"
import StyledChatDiv from "./styled/styledchatdiv"
import StyledInput from "./styled/styledinput"
import StyledList from "./styled/styledlist"
import StyledNav from "./styled/stylednav"
import StyledUi from "./styled/styledui"
import StyledUl from "./styled/styledul"

const StyledInputChat = styled(StyledInput)`
    background-color: #36393e;
    color: white;
    padding: 0.75em;
`

const Chat = () => {
    const [ name, setName ] = useState('')
    const [user, setUser] = useState([])
    const [ messages, setMessages] = useState([])
    const { data } = useContext(LoginContext)
    const params = useParams()

    useEffect(() => {
        const filter = data.filter(x => x.id === params.chatid)
        console.log(filter)
        setMessages(filter.map(friend => friend.message))
        console.log(messages)
        setUser(filter)
        setName(filter[0].name)
        console.log(user)      
    }, [params])

    return (
        <>
        <StyledUi>        
            <SideBar></SideBar>
            <StyledChatDiv>
                <StyledUl>
                    <StyledNav style={{ display: 'flex', alignItems: 'center', gap: '1em'}}>         
                    <Discord/>      
                        {user.map(data => {
                            return (
                                <div style={{ fontWeight: 'bold', fontSize: '1.25em', display: 'flex', flexDirection: 'row'}} key={data.name}>{data.name}</div>
                            )
                        })}
                    </StyledNav>
                    <div style={{ padding: '4vh', display: "flex", flexDirection: 'column', lineHeight: '0.1em', minHeight: '75vh', 
                    maxHeight: '75vh', overflow: 'scroll'}}>
                    {messages.map(x => x.map(message => {
                        return (
                            <StyledList key={message}>
                                {message}
                            </StyledList>
                        )
                    }))}
                    </div>
                    <StyledInputChat type="text" placeholder={`Message @ ${name} `}/>
                </StyledUl>
            </StyledChatDiv>
        </StyledUi>
        </>
    )
}

export default Chat