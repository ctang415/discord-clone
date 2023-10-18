import { useContext, useRef, useEffect } from "react"
import { LoginContext } from "./logincontext"
import { SettingsDiv } from "./settings"

const EditMessage = ({setEditMessage, setDeleteMessage, edit, setEdit}) => {
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
                <SettingsDiv ref={editMenu}>
                    <p onClick={() => setEditMessage(true)}>Edit Message</p>
                    <p onClick={() => setDeleteMessage(true)}>Delete Message</p>
                </SettingsDiv>
        )
}

export default EditMessage