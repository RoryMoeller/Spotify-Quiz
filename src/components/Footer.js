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
    `;
    console.log("link:", props.playlistLink)
    return (
        <div css={footerStyle}>
            <div>Powered by Spotify</div>
            <div className="questionCounter">
                <div>Questions: {props.correctCount} / {props.questionCount}</div>
            </div>
            <div><a href={props.playlistLink} target="_blank" rel="noreferrer">{props.playlistName}</a></div>
            {props.content && <div>{props.content}</div>}
        </div>
    )
}
