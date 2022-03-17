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
    console.log(colors)
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
    const questionLimit = 15

    console.log(props.auth_token)
    return (
        <div className="App">
            <Global styles={globalStyles} />
            <Header />
            <Routes>
                <Route path="/home" element={<Home auth_token={props.auth_token} setPlaylistName={setPlaylistName} />} />
                <Route path="/quiz" element={
                    totalQuestions < questionLimit ?
                    <Quiz auth_token={props.auth_token} addCorrect={correctResponse} addIncorrect={incorrectResponse} /> :
                    <Navigate to="/done" redirect/>
                } />
                
                <Route path="/done" element={
                    (totalQuestions < questionLimit) ?
                    <Navigate to="/home" replace />  :
                    <Done correctCount={correctResponses} questionCount={totalQuestions} /> 
                } />
                <Route path="/" exact element={<Navigate to={"/home"} />} />
            </Routes>
            <Footer questionCount={totalQuestions} correctCount={correctResponses} playlistName={playlistName}/>
        </div>
    );
}

export default App;
