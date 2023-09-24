import { useEffect, useState } from "react"
import { useParams } from "react-router"
import SideBar from "./sidebar"
import StyledChatDiv from "./styled/styledchatdiv"
import StyledList from "./styled/styledlist"
import StyledUi from "./styled/styledui"
import StyledUl from "./styled/styledul"

const Chat = () => {
    const [user, setUser] = useState('')
    const [ messages, setMessages] = useState([])
    const array = [ 
        {name: 'Makarich', online: false, message: ['Hey', '?', 'ok'], id: "756733"}, 
        {name: 'BV', online: true, message: ['yo'], id: '6231213'}, 
        { name: 'Toki', online: true, message: [':o'], id: '3123213' }, 
        { name: 'saru', online: false, message: ['val?'], id: '4354354'}
    ]
    const params = useParams()

    useEffect(() => {
        const filter = array.filter(x => x.id === params.chatid)
        console.log(filter)
        setMessages(filter.map(friend => friend.message))
        console.log(messages)
        setUser(filter)

    }, [])

    return (
        <StyledUi>        
            <SideBar></SideBar>
            <StyledChatDiv>
                <h3></h3>
                <StyledUl>
                    {messages.map(x => x.map(message => {
                        return (
                            <StyledList key={message}>
                                {message}
                            </StyledList>
                        )
                    }))}
                </StyledUl>
            </StyledChatDiv>
        </StyledUi>
    )
}

export default Chat