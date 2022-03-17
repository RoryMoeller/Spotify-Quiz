/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import colors from "./colorTheme";

export function Footer(props) {
    const footerStyle = css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 40px;
        padding-right: 40px;
        font-size: 20px;
        height: 60px;
        padding-top: 5px;
        position: fixed;
        bottom: 0px;
        width: calc(100vw - 80px);
        box-shadow: 0px -7px 10px 5px rgba(0,0,0,0.2);
        background-color: rgba(${colors.standard.accents.primary}, .7);
        backdrop-filter: blur(5px);
        color: rgba(${colors.standard.text.primary});
        a {
            color: rgba(${colors.standard.text.primary});
        }
        select {
            font-size: 20px;
        }
    `;
    const updateLength = function(e){
        if (e.target.value.length <= 0){
            return
        }
        switch(e.target.options.selectedIndex) {
            case 0:
                props.setQuestionLimit(10);
                break;
            case 1:
                props.setQuestionLimit(15);
                break;
            case 2:
                props.setQuestionLimit(20);
                break;
            default:
                props.setQuestionLimit(15);
                break;
        }
        e.preventDefault();
    }
    return (
        <div css={footerStyle}>
            <div><a href="https://www.spotify.com/" target="_blank" rel="noreferrer">Powered by Spotify</a></div>
            <div className="questionCounter">
                <div><a href={props.playlistLink} target="_blank" rel="noreferrer">{props.playlistName}</a></div>
                <div>Questions: {props.correctCount} / {props.questionCount}</div>
            </div>
            <div>
                <select onChange={updateLength} defaultValue={"medium"}>
                    <option value="short">short</option>
                    <option value="medium">medium</option>
                    <option value="long">long</option>
                </select>
                    
            </div>
            {props.content && <div>{props.content}</div>}
        </div>
    )
}
