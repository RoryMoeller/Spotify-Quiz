/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

import { useState, useEffect } from 'react';
import { useSpotifyPlaylist } from '../hooks/useSpotifyPlaylist';
import { Answer } from '../components/Answer';

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
        if (trackList.length === this.size)
            return track
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
    const [trackList, setTrackList] = useState(new TrackList(playlist))
    useEffect(() => {
        if (playlist) {
            setTrackList(parsePlaylistToTrackList(playlist))
        } 
    }, [playlist])

    const quizStyle = css`
        .ansBox {
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
            width: 100%;
            margin-top: 25px;
        }
    `
    function grabNumberOfTracks(numberTracks) {
        let tracks = []
        for (let i = 0; i < numberTracks; i++) {
            tracks.push(trackList.grabTrackNotIn(tracks))
        }

    }
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
        <div css={quizStyle}>
            <p>Wow this is a quiz page</p>

                <p>Paste playlist link below</p>
                <input onChange={updatePlaylist} placeholder="Hyperlink to spotify playlist"/>

            <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error! {error}</p>}
                {!loading && !error && trackList.size > 0 && 
                    <div className="ansBox">
                        <Answer answer={trackList.grabAnyTrack()} ansType="track" submitSelection={props.addCorrect}/> 
                        <Answer answer={trackList.grabAnyTrack()} ansType="album" submitSelection={props.addIncorrect} /> 
                        <Answer answer={trackList.grabAnyTrack()} ansType="artist" submitSelection={props.addIncorrect} /> 
                    </div>
                }
                {/* {<p>Size: {trackList.size}</p>} */}
            </div>
        </div>
    )
}


/* 
{
    <pre>
        {parsePlaylistToTrackList(playlist).tracks.map(track => track.name + " on " + track.album.name + "[" + track.album.release_date.substr(0, 4) + "] by " + track.artists[0].name + "\r\n") }
    </pre> 
}
*/