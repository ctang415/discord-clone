import DiscordIcon from '../../assets/discord.svg'

const Discord = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center',
            backgroundColor: '#5865F2', borderRadius: '2em', padding: '0.5em',  alignSelf: 'center' }}>
            <img style={{ minHeight: '2vh'}} src={DiscordIcon} alt="Discord Icon"></img>
        </div>
    )
}

export default Discord