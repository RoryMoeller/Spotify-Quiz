import { useState } from 'react';
import { useSpotifyPlaylist } from '../hooks/useSpotifyPlaylist';

class TrackList {
    constructor(playlist) {
        this.tracks = []
        playlist.map(entry => {
            this.tracks.push(entry.track)
        })
        this.tracks.filter(track => track.type === 'track')
    }
}

function parsePlaylistLinkToPlaylistID(link) {
    if (link.substr(0, 34) === 'https://open.spotify.com/playlist/') {
        console.log(link.split('/')[4].split('?')[0])
        return link.split('/')[4].split('?')[0]
    } else {
        return link
    }
}

function parsePlaylistToTrackList(playlist) {
    return new TrackList(playlist)
}

export function Quiz(props) {
    const [playlist_link, setPlaylistLink] = useState('4S9D4eYUYqIR9CqiMfvNJo')

    const [playlist, loading, error] = useSpotifyPlaylist(playlist_link, props.auth_token);
    // console.log("===TrackList===", tracklist);
    function updatePlaylist(e) {
        e.preventDefault()
        let pl = parsePlaylistLinkToPlaylistID(e.target.value)
        console.log(pl)
        setPlaylistLink(pl)
    }
    return (
        <div>
            <p>Wow this is a quiz page</p>

                <p>Enter playlist link below</p>
                <input onChange={updatePlaylist}/>

            <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error! {error}</p>}
                {!loading && !error && <pre>{parsePlaylistToTrackList(playlist).tracks.map(track => track.name + " on " + track.album.name + " by " + track.artists[0].name + "\r\n") }</pre>}
            </div>
        </div>
    )
}
