import { decode } from 'html-entities'
import { useState, useEffect, useContext } from 'react'
import EditMessage from './editmessage'
import { LoginContext } from './logincontext'

const SingleMessage = ({x, poster, index}) => {
    const { userData } = useContext(LoginContext)
    const [ edit, setEdit] = useState(false)
    const [editMessage, setEditMessage] = useState(false)
    const [deleteMessage, setDeleteMessage] = useState(false)
    const editBar = () => {
        if (poster[index] === userData[0].display_name) {
            setEdit(true)
        }
    }

    return (
        <div key={index} onClick={() => editBar()}>
            {decode(x.message)}
            <EditMessage edit={edit} setDeleteMessage={setDeleteMessage} setEditMessage={setEditMessage} setEdit={setEdit} />
        </div>
    )
}

export default SingleMessage