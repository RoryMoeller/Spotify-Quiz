import logo from './logo.svg';
import './App.css';

import { Navigate, Route, Routes, useSearchParams } from 'react-router-dom';

import { Home } from './pages/home';
import { Quiz } from './pages/quiz';

function App(props) {
    console.log(props.auth_token)
    return (
        <div className="App">
            <Routes>
                <Route path="/home" element={<Home auth_token={props.auth_token} />} />
                <Route path="/quiz" element={<Quiz auth_token={props.auth_token}/>} />
                <Route path="/" exact element={<Navigate to={"/home"} />} />
            </Routes>
        </div>
    );
}

export default App;
