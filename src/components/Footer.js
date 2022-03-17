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
        backdrop-filter: blur(5px);4
    `;
    return (
        <div css={footerStyle}>
            <div>Powered by Spotify</div>
            <div className="questionCounter">
                <div>Questions: {props.correctCount} / {props.questionCount}</div>
            </div>
            <div>{props.playlistName}</div>
            {props.content && <div>{props.content}</div>}
        </div>
    )
}
