import StyledLink from "./styled/styledlink"
import StyledList from "./styled/styledlist"
import StyledUl from "./styled/styledul"

const SideBar = () => {
    const array = [ 
        {name: 'Makarich', online: false, message: ['Hey', '?', 'ok'], id: "756733"}, 
        {name: 'BV', online: true, message: 'yo', id: '6231213'}, 
        { name: 'Toki', online: true, message: ':o', id: '3123213' }, 
        { name: 'saru', online: false, message: 'val?', id: '4354354'}
    ]
    
    return (
        <div style={{ display: "flex", flexDirection: 'column', backgroundColor: '#36393e', padding: '4vh'}}>
            <h4>DIRECT MESSAGES</h4> 
            <StyledUl>
                {array.map(user => {
                    return (
                        <StyledLink key={user.name} to={`/chats/${user.id}`}>
                            <StyledList>
                                {user.name}
                            </StyledList>
                        </StyledLink>
                    )
                })}
            </StyledUl>
        </div>
    )
}

export default SideBar