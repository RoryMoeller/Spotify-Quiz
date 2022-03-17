/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import colors from '../components/colorTheme';

import playlistSuggestions from '../components/playlistList';

import { useSpotifyPlaylist } from '../hooks/useSpotifyPlaylist';


class TrackList {
    constructor(playlist) {
        this.tracks = []
        playlist.forEach(entry => {
            this.tracks.push(entry.track)
        })
        this.tracks.filter(track => track.type === 'track')
        this.size = this.tracks.length
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
        return link.split('/')[4].split('?')[0]
    } else {
        return link
    }
}

function parsePlaylistToTrackList(playlist) {
    return new TrackList(playlist)
}

const logMeIn = function() {
    var client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    var redirect_uri = 'http://localhost:3000/home';
    var state = Math.random().toFixed(16).toString();
    localStorage.setItem('stateKey', 'state');
    var scope = 'user-read-private user-read-email';
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    window.location = url;
}

export function Home(props) {
    const homeStyle = css`
        .trackBox {
            overflow-y: auto;
            overflow-x: clip;
            max-height: 60vh;
            max-width: 60vw;
            border: none;
            background-color: white;
            border-radius: 20px;
            scrollbar-width: thin;
            scrollbar-color: rgba(${colors.standard.background.quaternary}, 1) rgba(${colors.standard.background.primary}, 1);
            background-color: rgb(${colors.standard.table.bg});
            color: rgb(${colors.standard.text.secondary});
            table {
            }

        }
        .buttonBox {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            width: 75%;
            margin-top: 30px;
        }
        .buttonBox button {
            background-color: rgb(${colors.standard.background.button});
            color: rgba(0, 0, 0, 0.5);
            padding-left: 18px;
            padding-bottom: 5px;
            padding-right: 18px;
            padding-top: 5px;
            border-radius: 500px;
            font-size: 25px;
            border: none;
            cursor: pointer;
            
        }
        .buttonBox button:hover {
            filter: brightness(0.5);
        }
        .active  {
            background-color: rgb(${colors.standard.accents.lighter}) !important;
            color: rgb(${colors.standard.text.button}) !important;
        }
        .sideBar {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            width: 200px;
            background-color: rgb(${colors.standard.background.primary});
            position: absolute;
            top: 65px;
            left: 0;
            height: calc(100vh - 130px);
        }
        .sideBar button {
            width: 50%;
            border: none;
            height: 50px;
            cursor: pointer;
            background-color: rgb(${colors.standard.background.primary});
            color: rgb(${colors.standard.text.primary});
        }
        .sideBar button:hover {
            filter: brightness(0.5);
        }
        input {
            width: 250px;
            height: 40px;
            font-size: 20px;
            background-color: rgb(${colors.standard.background.dark});
            color: rgb(${colors.standard.text.primary});
        }
        input:focus {
            outline: 1px solid rgb(${colors.standard.accents.primary});
        }
        button, select {
            font-family: inherit;
        }
        .loginButton {
            display: block;
            margin-top: 40px;
            background-color: rgb(${colors.standard.background.button});
            color: rgba(0, 0, 0, 0.5);
            padding-left: 18px;
            padding-bottom: 5px;
            padding-right: 18px;
            padding-top: 5px;
            border-radius: 500px;
            font-size: 25px;
            border: none;
            cursor: pointer;
        }
    `
    const otherStyle = css`
    color: rgb(${colors.standard.text.primary});

    `
    // Playlist building
    // storing this here in case we want to switch back to the old way of listing playlists
    /* </tr>track.name + " on " + track.album.name + "[" + track.album.release_date.substr(0, 4) + "] by " + track.artists[0].name + "\r\n") */ 
    const parsedHash = new URLSearchParams(
        window.location.hash.substr(1)
    )
    var access_token = parsedHash.get('access_token')
    if (access_token === null) {
        access_token = props.auth_token
    } else {
        access_token = "Bearer " + access_token
        props.updateToken(access_token)
    }
    const [playlist_link, setPlaylistLink] = useState('37i9dQZF1DWXRqgorJj26U')
    const [playlist, loading, error, playlistName, playlistLink] = useSpotifyPlaylist(playlist_link, access_token);
    props.setPlaylistName(playlistName)
    props.setPlaylistLink(playlistLink)
    const [trackList, setTrackList] = useState(new TrackList(playlist))
    const navigateTo = useNavigate();
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
    props.resetQuizStats();

    return (
        <div css={homeStyle}>
            <center >
                <p css={otherStyle}>Paste playlist link below</p>
                <input onChange={updatePlaylist} placeholder="Hyperlink to spotify playlist" />
                {loading && <p>Loading...</p>}
                {error && <p>Error! {error}</p> && <button onClick={logMeIn} className={"loginButton"}> Log In with Spotify </button>}
                {!loading && !error && trackList.size > 0 &&
                    <div>
                        <p css={otherStyle}>Currently using this playlist:</p>
                        <div className="trackBox">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Track</th>
                                        <th>Album</th>
                                        <th>Year</th>
                                        <th>Artist</th>
                                    </tr>
                                </thead>
                                <tbody>

                                {parsePlaylistToTrackList(playlist).tracks.map(track => 
                                    <tr key={track.name + track.album.name + track.album.release_date}>
                                        <td>{track.name}</td>
                                        <td>{track.album.name}</td>
                                        <td>{track.album.release_date.substr(0,4)}</td>
                                        <td>{track.artists[0].name}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        <center className="buttonBox">
                            <button onClick={() => {
                                navigateTo("/quiz?quiz_type=track&playlist_link=" + playlist_link)
                            }}> Quiz By Tracks </button>
                            <button onClick={() => {
                                navigateTo("/quiz?quiz_type=album&playlist_link=" + playlist_link)
                            }}> Quiz By Album </button>
                            <button onClick={() => {
                                navigateTo("/quiz?quiz_type=artist&playlist_link=" + playlist_link)
                            }}> Quiz By Artist </button>
                        </center>
                    </div>
                }
            </center>
            <div className="sideBar">
                {playlistSuggestions.lists.map(suggestion => 
                    <button key={suggestion.url} 
                        className={playlist_link === parsePlaylistLinkToPlaylistID(suggestion.url) ? "active" : ""} 
                        onClick={() => {
                            setPlaylistLink(parsePlaylistLinkToPlaylistID(suggestion.url))
                        }}>
                        {suggestion.name}
                    </button>
                )}
            </div>
        </div>
        
    )
}
