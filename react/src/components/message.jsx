import Discord from "./styled/avatar"
import StyledList from "./styled/styledlist"
import SingleMessage from "./SingleMessage"

const Message = ({x, poster, index}) => {
    
    return (
        <StyledList style={{display: 'flex', flexDirection: 'row', gap: '1.5em', padding: '0em', alignItems:'center'}} key={x.message}>
            <div style={ poster[index - 1] === poster[index] && index !== 0 ? { visibility: 'hidden'} : {visibility: 'visible'}}>
                <Discord src={x.sender.avatar_url}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1em'}}>
                <div style={{ color: 'grey', display: 'flex', flexDirection: 'row', gap: '1em'}}> 
                    <p style={ poster[index - 1] === poster[index] && index !== 0 ? {display: 'none' } : {display: 'flex', color: 'white', fontWeight: 'bold'} }>{x.sender.display_name}</p> 
                    <p style={ poster[index - 1] === poster[index] && index !== 0 ? {display: 'none'} : {display: 'flex'}}>{x.timestamp_formatted} {x.creation_time}</p>
                </div>
                <SingleMessage x={x} index={index} poster={poster} />
            </div>
        </StyledList>
    )
}

export default Message