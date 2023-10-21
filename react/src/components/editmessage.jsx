import { useContext, useRef, useEffect } from "react"
import { LoginContext } from "./logincontext"
import { SettingsDiv } from "./settings"

const EditMessage = ({setEditMessage, deleteMessage, edit, setEdit}) => {
    const { userData } = useContext(LoginContext)
    const editMenu = useRef(null)
    
    const closeEditMenu = (e)=>{
        if (editMenu.current && edit && !editMenu.current.contains(e.target)){
          setEdit(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", closeEditMenu);
      }, [closeEditMenu]);

  if (edit)
    return (
      <SettingsDiv style={{ marginLeft: '15vh', marginTop: '0vh'}} ref={editMenu}>
        <p onClick={() => {setEditMessage(true); setEdit(false) }}>Edit Message</p>
        <p onClick={() => {setEdit(false); deleteMessage() }}>Delete Message</p>
      </SettingsDiv>
    )
}

export default EditMessage