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

function parsePlaylistToTrackList(playlist) {
    return new TrackList(playlist)
}

function AnswerBank(props) {
    const questionStyle = css`
        .AnswerP {
            font-size: 25px;
            margin-top: 10px;
            margin-bottom: 30px;
        }
        background-color: rgba(0,0,0, .2);
        padding-top: 10px;
        margin-bottom: 20px;
        padding-bottom: 60px;
        border-radius: 20px;
        box-shadow: 0px 0px 20px rgba(0,0,0, .2);
        width: 70%;
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
    const [playlist, loading, error] = useSpotifyPlaylist(nav_playlist_link, props.auth_token);
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

    return (
        <div>
            <p> {props.ansType} Quiz</p>

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
            </center>
        </div>
    )
}
