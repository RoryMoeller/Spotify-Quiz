import { useState, useEffect } from 'react';

import { useSpotifyPlaylist } from '../hooks/useSpotifyPlaylist';


class TrackList {
    constructor(playlist) {
        this.tracks = []
        playlist.map(entry => {
            this.tracks.push(entry.track)
        })
        this.tracks.filter(track => track.type === 'track')
        this.size = this.tracks.length
        console.log(this.tracks)
    }
    grabAnyTrack() {
        return this.tracks[Math.floor(Math.random() * this.tracks.length)]
    }
    grabTrackNotIn(trackList) {
        let track = this.grabAnyTrack()
        if (trackList.length === this.size) {
            alert("Please use a larger playlist")
            return track
        }
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



export function Home(props) {
    // Playlist building
    const [playlist_link, setPlaylistLink] = useState('4S9D4eYUYqIR9CqiMfvNJo')
    const [playlist, loading, error] = useSpotifyPlaylist(playlist_link, props.auth_token);
    const [trackList, setTrackList] = useState(new TrackList(playlist))
    useEffect(() => {
        if (playlist) {
            setTrackList(parsePlaylistToTrackList(playlist))
        }
    }, [playlist])

    function updatePlaylist(e) {
        e.preventDefault()
        if (e.target.value.length > 4 && e.target.value.substr(0, 4) === 'http') {
            let pl = parsePlaylistLinkToPlaylistID(e.target.value)
            setPlaylistLink(pl)
        } else {
            e.target.value = ''
        }
    }

    return (
        <div>
            This is the home screen wow
            <p>Paste playlist link below</p>
            <input onChange={updatePlaylist} placeholder="Hyperlink to spotify playlist" />
            {loading && <p>Loading...</p>}
            {error && <p>Error! {error}</p>}
            {!loading && !error && trackList.size > 0 &&
                <div>
                    <p>Currently using this playlist:</p>
                    <pre>
                        {parsePlaylistToTrackList(playlist).tracks.map(track => track.name + " on " + track.album.name + "[" + track.album.release_date.substr(0, 4) + "] by " + track.artists[0].name + "\r\n")}
                    </pre> 
                </div>
            }
        </div>
    )
}
