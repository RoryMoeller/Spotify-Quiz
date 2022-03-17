import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import './index.css';
import App from './App';

// check if landed on home page
console.log(window.location)
console.log(window.location.hash.substr(1, 13))
if (window.location.hash.substr(1,13) === "access_token="){
    var queryParams = new URLSearchParams(window.location.hash.substr(1)).get('access_token')
    console.log("Landed on home page, setting token to: " + queryParams)
    window.location = window.location.origin + "#/home?" + window.location.hash.substr(1)
}
ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <App accessToken={queryParams}/>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
