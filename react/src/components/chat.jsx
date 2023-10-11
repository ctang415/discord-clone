import { useContext } from "react"
import { useEffect, useState } from "react"
import { useParams } from "react-router"
import styled from "styled-components"
import { LoginContext } from "./logincontext"
import Message from "./message"
import SideBar from "./sidebar"
import Discord from "./styled/avatar"
import StyledChatDiv from "./styled/styledchatdiv"
import StyledInput from "./styled/styledinput"
import StyledList from "./styled/styledlist"
import StyledNav from "./styled/stylednav"
import StyledUi from "./styled/styledui"
import StyledUl from "./styled/styledul"
import UserSettings from "./usersettings"

const StyledInputChat = styled(StyledInput)`
    background-color: #36393e;
    color: white;
    padding: 0.75em;
`

const Chat = () => {
    const [ name, setName ] = useState('')
    const [user, setUser] = useState([])
    const [ message, setMessage ] = useState('')
    const [ messages, setMessages] = useState([])
    const { userData, friends, fetchUser } = useContext(LoginContext)
    const [ poster, setPoster ] = useState([])
    const params = useParams()
    let ignore = false;

    const fetchMessages = async () => {
        const chat = { user: userData[0].id, friend: `${params.chatid}` }
        console.log(chat)
        try {
            const response = await fetch (`http://localhost:3000/chats/${params.chatid}`, {
                method: 'GET', credentials: 'include', headers: {'Content-Type': 'application/json'}
            })
            if (!response.ok) {
                throw await response.json()
            }
                await response.json()
                if (response.status === 200) {
                    console.log('successful chat retrieval')
                }
        } catch (err) {
        console.log(err)
        const responseTwo = await fetch ('http://localhost:3000/chats/new-chat', {
                    method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(chat)
                })
                await responseTwo.json()
                if (responseTwo.status === 200) {
                    fetchUser() 
                    console.log('successful chat creation')
                }
        }
    }

    const sendMessage = async (e) => {
        e.preventDefault()
        const myMessage = { friend: `${params.chatid}`, sender: userData[0].id, message: message}
        try {
            const response = await fetch ('http://localhost:3000/chats/send-message', {
                method: 'POST', headers: {'Content-Type': 'application/json'}, credentials: 'include', 
                body: JSON.stringify(myMessage)
            })
            if (!response.ok) {
                throw await response.json()
            }
            await response.json()
            if (response.status === 200) {
                console.log('successful message')
                fetchUser()
                fetchMessages()
                setMessage('')
            }
        } catch (err) {
            console.log(err)
        } 
    }

    useEffect(() => {
        const filter = friends.map(x => x.requester._display_name === userData[0]._display_name ? x.recipient : x.requester ) 
        setMessages(userData[0].chatsList.map(x => x.messages)) 
        setUser(filter)
        setName(filter[0].display_name)
        setPoster(userData[0].chatsList.map(x=> x.messages)[0].map(y => (y.sender.display_name)))        
    console.log(poster)
    }, [])

    useEffect(() => {
}, [])

    useEffect(() => {
        if (!ignore) {
            fetchMessages()
        }
        return () => { ignore = true }
    }, [])

    return (
        <>
        <StyledUi>        
            <SideBar></SideBar>
            <UserSettings/>
            <StyledChatDiv>
                <StyledUl>
                    {user.map(data => {
                        return (
                            <StyledNav key={data.display_name} style={{ display: 'flex', alignItems: 'center', gap: '1em'}}>         
                                <Discord src={data.avatar_url}/>      
                                <div style={{ fontWeight: 'bold', fontSize: '1.25em', display: 'flex', flexDirection: 'row'}} key={data.display_name}>{data.display_name}</div>  
                            </StyledNav>
                           )
                     })}
                    <div style={{ padding: '4vh', display: "flex", flexDirection: 'column', lineHeight: '0.1em', minHeight: '75vh', 
                    maxHeight: '75vh', overflow: 'scroll'}}>
                    {messages.map(( message => {
                        return (
                            message.map( (x, index) => {
                                return (
                                    <div key={index}>
                                        <Message index={index} poster={poster} setPoster={setPoster} x={x}/>
                                    </div>
                                )
                            })
                        )
                    }))}
                    </div>
                    <form style={{ display: 'flex'}} onSubmit={sendMessage}>
                    <StyledInputChat type="text" name="message" placeholder={`Message @ ${name}`} onChange={(e)=> setMessage(e.target.value)} value={message} required/>
                    <button type="submit">SEND</button>
                    </form>
                </StyledUl>
            </StyledChatDiv>
        </StyledUi>      
        </>
    )
}

export default Chat
