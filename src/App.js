/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";


import './App.css';

import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Home } from './pages/home';
import { Quiz } from './pages/quiz';
import { Done } from './pages/done';

import { Footer } from './components/Footer';
import { Header } from './components/Header';
import colors from './components/colorTheme';


const globalStyles = css`
@import url('https://fonts.googleapis.com/css2?family=Ropa+Sans&display=swap');
    body {
        font-family: 'Ropa Sans', sans-serif;
        margin: 0;
        background: linear-gradient(0deg,
            rgba(${colors.standard.background.primary},1) 0%,
            rgba(${colors.standard.background.secondary},1) 20%,
            rgba(${colors.standard.background.tertiary},1) 95%
        );
    }
    html {
        height: 100%;
    }
`

function App(props) {
    // Question Tracking
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [correctResponses, setCorrectResponses] = useState(0)
    const incorrectResponse = function () {
        setTotalQuestions(totalQuestions + 1)
    }
    const correctResponse = function () {
        setCorrectResponses(correctResponses + 1)
        setTotalQuestions(totalQuestions + 1)
    }
    const [playlistName, setPlaylistName] = useState("")
    const [playlistLink, setPlaylistLink] = useState("")
    const [questionLimit, setQuestionLimit] = useState(15)
    const AUTH_TOKEN = "Bearer " + (props.accessToken || process.env.REACT_APP_SPOTIFY_AUTH_TOKEN);
    const [spotifyToken, setSpotifyToken] = useState(AUTH_TOKEN)
    const queryParams = new URLSearchParams(window.location.hash.substr(1));
    console.log(queryParams.get('access_token'))
    const resetQuizStats = function () {
        setTotalQuestions(0)
        setCorrectResponses(0)
    }

    console.log(props.auth_token)
    return (
        <div className="App">
            <Global styles={globalStyles} />
            <Header />
            <Footer questionCount={totalQuestions} correctCount={correctResponses} playlistName={playlistName} playlistLink={playlistLink} setQuestionLimit={setQuestionLimit} />
            <Routes>
                <Route path="home" element={<Home updateToken={setSpotifyToken} auth_token={spotifyToken} setPlaylistName={setPlaylistName} setPlaylistLink={setPlaylistLink} resetQuizStats={resetQuizStats} />} />
                <Route path="quiz" element={
                    totalQuestions < questionLimit ?
                    <Quiz auth_token={spotifyToken} addCorrect={correctResponse} addIncorrect={incorrectResponse} /> :
                    <Navigate to="/done" redirect/>
                } />
                
                <Route path="done" element={
                    (totalQuestions < questionLimit) ?
                    <Navigate to="/home" replace />  :
                    <Done correctCount={correctResponses} questionCount={totalQuestions} /> 
                } />
                <Route path="/" exact element={<Navigate to={"home"} />} />
            </Routes>
        </div>
    );
}

export default App;
