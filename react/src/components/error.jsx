import { useNavigate } from "react-router"

const Error = () => {
const navigate = useNavigate()
    return (
        <div style={{textAlign: 'center'}}>
        <h3>
            PAGE NOT FOUND
        </h3>
        <button onClick={() => navigate('/')}>Go Home</button>
        </div>
    )
}

export default Error