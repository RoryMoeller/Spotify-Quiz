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

function parsePlaylistToTrackList(playlist) {
    return new TrackList(playlist)
}

export function Quiz(props) {
    const playlist_id = "51f1c2c97d53416b"
    const [playlist, loading, error] = useSpotifyPlaylist(playlist_id, props.auth_token);
    const tracklist= parsePlaylistToTrackList(playlist)
    // console.log("===TrackList===", tracklist);
    return (
        <div>
            Wow this is a quiz page
            <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error!</p>}
                {!loading && !error && <p>{tracklist.tracks.map(track => track.name + " on " + track.album.name + " by " + track.artists[0].name)}</p>}
            </div>
        </div>
    )
}
