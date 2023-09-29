import { useContext } from "react"
import { LoginContext } from "./logincontext"
import { StyledP } from "./usersettings"

const MyProfile = ({profileEdit, setProfileEdit, clearChanges}) => {
    const {userData, logOut} = useContext(LoginContext)
    const handleChange = (boolean) => {
            clearChanges()
            setProfileEdit(boolean)
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '3em', 
        backgroundColor: '#282b30'}}>
            <h5>USER SETTINGS</h5>
            <StyledP style={ profileEdit ? null : { backgroundColor: 'grey', color: 'white'} } onClick={()=> handleChange(false)}>My Account</StyledP>
            <StyledP style={ profileEdit ? {backgroundColor: 'grey', color: 'white'} : null } onClick={() => handleChange(true)}>Profiles</StyledP>
            <StyledP onClick={() => logOut(userData[0].email)}>Log Out</StyledP>   
        </div>
    )
}

export default MyProfile