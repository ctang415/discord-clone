import DiscordIcon from '../../assets/discord.svg'

const Discord = ({src}) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center',
            backgroundColor: '#5865F2', borderRadius: '2em', padding: '0.5em',  alignSelf: 'center' }}>
            <img style={{ minHeight: '2vh'}} src={src} alt="Discord Icon"></img>
        </div>
    )
}

export default Discord