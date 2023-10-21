import { useState, useEffect, useRef, useContext } from "react"
import { LoginContext } from "./logincontext"
import Discord from "./styled/avatar"

const Profile = ({profile, friendId, setProfile}) => {
    const { userData } = useContext(LoginContext)
    const [ userProfile, setUserProfile ] = useState('')
    const profileRef = useRef(null)
    let ignore = false;
    
    const getProfile = async () => {
        try {
            const response = await fetch (`http://localhost:3000/users/${friendId}`, {
                credentials: 'include'
            })
            if (!response.ok) {
                throw await response.json()
            }
            let data = await response.json()
            if (response.status === 200) {
                console.log(data)
                setUserProfile(data.user_detail)
                console.log('success')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const closeProfile = (e)=>{
        if (profileRef.current && profile && !profileRef.current.contains(e.target)){
            setProfile(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", closeProfile);
    }, [closeProfile]);


    useEffect(() => {
        if (!ignore) {
            getProfile()
        }
        return () => { ignore = true}
    }, [])

    if (profile) {
        return (
            <>
                <div id="myModal" className="modal">
                    <div className="modal-user-content" style={{ borderRadius: '1em' , padding: '0em', minWidth: '50vw', minHeight: '50vh'}} ref={profileRef}>
                        <div style={{ display: 'flex', gap: '1em', alignItems: 'center', justifyContent: 'space-between', padding: '1.5vh', borderTopLeftRadius: '1em', borderTopRightRadius: '1em', backgroundColor: 'grey'}}>
                            <Discord src={userProfile.avatar_url}/>
                            <button style={{ backgroundColor: 'green', color: 'white', border: 'none'}}>Send Message</button>
                        </div>
                        <div style={{ padding: '1.5vh'}}>
                            <h3>{userProfile.display_name}</h3>
                            <p>{userProfile.username}</p>
                            <h5>DISCORD MEMBER SINCE</h5>
                            <p>{userProfile.creation_formatted}</p>
                            <h5>ABOUT ME</h5>
                            <p>{userProfile.about_me}</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Profile