/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import colors from "./colorTheme"
import { 
    NavLink,
  }from 'react-router-dom';
export function Header(props) {
    const headerStyle = css`
        color: white;
        font-size: 40px;
        height: 60px;
        padding-top: 5px;
        width: 100%;
        box-shadow: 0px 7px 10px 5px rgba(0,0,0,0.2);
        margin-bottom: 20px;
        background-color: rgba(${colors.standard.accents.primary}, .7);
        backdrop-filter: blur(5px);4
    `;
    const otherStyle = css`
    text-decoration: none;
    color: white;
`;
    return (
        <div>
            <div css={headerStyle}>
                <NavLink css={otherStyle} to="/home">Spotify Playlist Quiz</NavLink>
                {props.content && <div>{props.content}</div>}
            </div>
        </div>
    )
}
