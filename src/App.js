/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";


import './App.css';

import { useState } from 'react';
import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';

import { Home } from './pages/home';
import { Quiz } from './pages/quiz';
import { Footer } from './components/Footer';
import { Header } from './components/Header';

const globalStyles = css`
    html {
        height: 100%;
    }
`

function App(props) {
    const [totalQuestions, setTotalQuestions] = useState(0)
    const [correctResponses, setCorrectResponses] = useState(0)
    const incorrectResponse = function () {
        setTotalQuestions(totalQuestions + 1)
    }
    const correctResponse = function () {
        setCorrectResponses(correctResponses + 1)
        setTotalQuestions(totalQuestions + 1)
    }

    console.log(props.auth_token)
    return (
        <div className="App">
            <Global styles={globalStyles} />
            <Header />
            <Routes>
                <Route path="/home" element={<Home auth_token={props.auth_token} />} />
                <Route path="/quiz" element={<Quiz auth_token={props.auth_token}/>} />
                <Route path="/" exact element={<Navigate to={"/home"} />} />
            </Routes>
            <Footer questionCount={totalQuestions} correctCount={correctResponses} />
        </div>
    );
}

export default App;
