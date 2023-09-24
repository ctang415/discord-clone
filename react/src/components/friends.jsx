import StyledLink from "./styled/styledlink"
import StyledList from "./styled/styledlist"
import StyledUl from "./styled/styledul"

const Friends = () => {
    const array = [ 
        {name: 'Makarich', online: false, message: 'Hey', id: "756733"}, 
        {name: 'BV', online: true, message: 'yo', id: '6231213'}, 
        { name: 'Toki', online: true, message: ':o', id: '3123213' }, 
        { name: 'saru', online: false, message: 'val?', id: '4354354'}
    ]
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '4vh'}}>
            <h4>ONLINE - {array.filter(x => x.online !== false).length}</h4>
            <StyledUl>
                {array.filter(x => x.online !== false).map(friend => {
                    return (
                        <StyledList key={friend.name}>
                            <StyledLink to={`/chats/${friend.id}`}>
                                {friend.name}
                            </StyledLink>
                        </StyledList>
                    )
                })}
            </StyledUl>
        </div>
    )
}

export default Friends