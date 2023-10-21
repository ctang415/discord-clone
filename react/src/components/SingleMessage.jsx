import { decode } from 'html-entities'
import { useState, useEffect, useContext, useRef } from 'react'
import { useParams } from 'react-router'
import EditMessage from './editmessage'
import { LoginContext } from './logincontext'

const SingleMessage = ({x, poster, index, fetchMessages, chatId}) => {
    const { userData } = useContext(LoginContext)
    const [ edit, setEdit] = useState(false)
    const [editMessage, setEditMessage] = useState(false)
    const [ newMessage, setNewMessage] = useState('')
    const params = useParams()    
    const editMenu = useRef(null)

    const editBar = () => {
        if (poster[index] === userData[0].display_name) {
            setEdit(true)
        }
    }

    const updateMessage = async () => {
        const myMessage = {id: x._id, message: newMessage}
        try {
            const response = await fetch (`http://localhost:3000/users/${userData[0].id}/friends/${params.chatid}/chats/messages/${x._id}`, {
                method: 'POST', headers: {'Content-Type': 'application/json'}, credentials: 'include', body: JSON.stringify(myMessage)
            })
            if (!response.ok) {
                throw await response.json()
            }
            let data = await response.json()
            if (response.status === 200) {
                console.log(data)
                fetchMessages()
            }
        } catch (err) {
            console.log(err)
        }
    }

    const deleteMessage = async () => {
        const message = {id: x._id, chatid: chatId}
        try {
            const response = await fetch (`http://localhost:3000/users/${userData[0].id}/friends/${params.chatid}/chats/messages/${x._id}/delete`, {
                method: 'POST', headers: {'Content-Type': 'application/json'}, credentials: 'include', body: JSON.stringify(message)
            })
            if (!response.ok) {
                throw await response.json()
            }
            let data = await response.json()
            if (response.status === 200) {
                alert('Message deleted')
                fetchMessages()
                console.log(data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    
    const closeEditMessage = (e)=>{
        if (editMenu.current && editMessage && !editMenu.current.contains(e.target)){
            setEditMessage(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", closeEditMessage);
    }, [closeEditMessage]);


    useEffect(() => {
        if (editMessage) {
            setEdit(false)
        } else {
            if (newMessage !== x.message && newMessage !== '') {
                updateMessage()
            } 
            setNewMessage('')
        }
    }, [editMessage])

    if (editMessage) { 
        return (
            <form key={index} ref={editMenu}>
                <input type="text" name="message" value={ newMessage === decode(x.message) || newMessage === '' ? decode(x.message) : newMessage } onChange={(e) => setNewMessage(e.target.value)} required></input>
            </form>
        )
    } else {
    return (
        <div key={index} onClick={() => editBar()}>
            <EditMessage edit={edit} deleteMessage={deleteMessage} setEditMessage={setEditMessage} setEdit={setEdit} />
            {decode(x.message)}
        </div>
    )
}
}

export default SingleMessage