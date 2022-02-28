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
    grabAnyTrack() {
        return this.tracks[Math.floor(Math.random() * this.tracks.length)]
    }
    grabTrackNotIn(trackList) {
        let track = this.grabAnyTrack()
        while (trackList.includes(track)) {
            track = this.grabAnyTrack()
        }
        return track
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
        if (e.target.value.length > 4 && e.target.value.substr(0, 4) === 'http') {
            let pl = parsePlaylistLinkToPlaylistID(e.target.value)
            console.log(pl)
            setPlaylistLink(pl)
        } else {
            e.target.value = ''
        }
    }
    return (
        <div>
            <p>Wow this is a quiz page</p>

                <p>Paste playlist link below</p>
                <input onChange={updatePlaylist} placeholder="Hyperlink to spotify playlist"/>

            <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error! {error}</p>}
                {!loading && !error && <pre>{parsePlaylistToTrackList(playlist).tracks.map(track => track.name + " on " + track.album.name + "[" + track.album.release_date.substr(0, 4) + "] by " + track.artists[0].name + "\r\n") }</pre>}
            </div>
        </div>
    )
}
