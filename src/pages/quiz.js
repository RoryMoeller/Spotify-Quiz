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
        if (trackList.length === this.size){
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

function AnswerBank(props) {
    const questionStyle = css`
        .AnswerP {
            font-size: 25px;
        }
    `

    const answerBoxStyle = css`
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        width: 75%;
        margin-top: 25px;
    `
    const answerElements = []
    // generate random number between 0 and the length of the answer array
    const correctIndex = parseInt( Math.random() * 10  % props.answers.length )
    console.log(correctIndex)
    for (let i = 0; i < props.answers.length; i++) {
        answerElements.push(
            <Answer key={i} answer={props.answers[i]} ansType={props.ansType} submitSelection={i === correctIndex ? props.addCorrect : props.addIncorrect} />
        )
    }
    // Create a question based on track @correctIndex
    const question = `Click track  #${correctIndex + 1}`
    return (
        <div css={questionStyle}>
            <p className="AnswerP">{question}</p>
            <div css={answerBoxStyle}>
                {answerElements}
                {/* <Answer answer={trackList.grabAnyTrack()} ansType="track" submitSelection={props.addCorrect} />
                <Answer answer={trackList.grabAnyTrack()} ansType="album" submitSelection={props.addIncorrect} />
                <Answer answer={trackList.grabAnyTrack()} ansType="artist" submitSelection={props.addIncorrect} /> */}
            </div>
        </div>
    )
}

export function Quiz(props) {
    var nav_playlist_link = new URLSearchParams(window.location.search).get('playlist_link')
    if (nav_playlist_link === null) {
        alert("Please enter a playlist link")
        nav_playlist_link = "4S9D4eYUYqIR9CqiMfvNJo"
    }
    const [playlist_link, setPlaylistLink] = useState(nav_playlist_link)
    const [playlist, loading, error] = useSpotifyPlaylist(playlist_link, props.auth_token);
    const [trackList, setTrackList] = useState(new TrackList(playlist))
    const quizType = new URLSearchParams(window.location.search).get('quiz_type')
    useEffect(() => {
        if (playlist) {
            setTrackList(parsePlaylistToTrackList(playlist))
        } 
    }, [playlist])

    function grabNumberOfTracks(numberTracks) {
        let tracks = []
        for (let i = 0; i < numberTracks; i++) {
            tracks.push(trackList.grabTrackNotIn(tracks))
        }
        return tracks
    }

    function updatePlaylist(e) {
        e.preventDefault()
        console.log("Quiz Type:", quizType)
        if (e.target.value.length > 4 && e.target.value.substr(0, 4) === 'http') {
            let pl = parsePlaylistLinkToPlaylistID(e.target.value)
            setPlaylistLink(pl)
        } else {
            e.target.value = ''
        }
    }
    return (
        <div>
            <p>Wow this is a quiz page</p>

            <center>
                {loading && <p>Loading...</p>}
                {error && <p>Error! {error}</p>}
                {!loading && !error && trackList.size > 0 && 
                    <AnswerBank 
                        ansType={quizType}
                        addCorrect={props.addCorrect}
                        addIncorrect={props.addIncorrect}
                        answers={grabNumberOfTracks(3)}
                    />
                }
                {/* {<p>Size: {trackList.size}</p>} */}
            </center>
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