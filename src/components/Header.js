/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

export function Header(props) {
    const headerStyle = css`
        height: 60px;
        padding-top: 5px;
        width: 100%;
        box-shadow: 0px 7px 10px 5px rgba(0,0,0,0.2);
        margin-bottom: 20px;
        background-color: rgba(30,215,96, .7);
        backdrop-filter: blur(5px);4
    `;
    return (
        <div css={headerStyle}>
            Spotify Playlist Quiz
            {props.content && <div>{props.content}</div>}
        </div>
    )
}