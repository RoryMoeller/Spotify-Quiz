/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

import { useState, useEffect } from 'react';
import { useSpotifyPlaylist } from '../hooks/useSpotifyPlaylist';
import { Answer } from '../components/Answer';
import colors from '../components/colorTheme';

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
        color: rgb(${colors.standard.text.primary});
        background-color: rgba(${colors.standard.background.quaternary}, .2);
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
    for (let i = 0; i < props.answers.length; i++) {
        answerElements.push(
            <Answer key={i} answer={props.answers[i]} ansType={props.ansType} submitSelection={i === correctIndex ? props.addCorrect : props.addIncorrect} />
        )
    }
    // Create a question based on track @correctIndex
    const questionBank = {
        track: [
            `Which of these songs was released in ${props.answers[correctIndex].album.release_date.substr(0, 4)}?`,
            `Which of these songs is by ${props.answers[correctIndex].artists[0].name}?`,
            `Which of these songs is on ${props.answers[correctIndex].album.name}?`
        ],
        album: [
            `Which of these albums is by ${props.answers[correctIndex].artists[0].name}?`,
            `Which of these albums has the song ${props.answers[correctIndex].name} on it?`,
            `Which of these albums was released in ${props.answers[correctIndex].album.release_date.substr(0, 4)}?`,
            `Which album has ${props.answers[correctIndex].album.total_tracks} tracks?`
        ],
        artist: [
            `Which of these artists did the song "${props.answers[correctIndex].name}"?`,
            `Which artist created an album named "${props.answers[correctIndex].album.name}"?`,
            `Which artist released an album ${props.answers[correctIndex].album.release_date.substr(0, 4)}`
        ]
    }
    const question = questionBank[props.ansType][parseInt(Math.random() * questionBank[props.ansType].length)]

    // question = `Click track  #${correctIndex + 1}`
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
    const quizHeader = css`
    color: rgb(${colors.standard.text.primary});
`
    var nav_playlist_link = new URLSearchParams(window.location.search).get('playlist_link')
    if (nav_playlist_link === null) {
        alert("Please enter a playlist link")
        nav_playlist_link = "37i9dQZF1DWXRqgorJj26U"
    }
    const [playlist, loading, error,,] = useSpotifyPlaylist(nav_playlist_link, props.auth_token);
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
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return (
        <div>
            <p css = {quizHeader}>{capitalizeFirstLetter(quizType)} Quiz</p>
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
