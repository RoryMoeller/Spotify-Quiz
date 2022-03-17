/** @jsxImportSource @emotion/react */

import { RiSpotifyLine  } from 'react-icons/ri';
import { css } from "@emotion/react";
import colors from "./colorTheme"
import { 
    Link,
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
        backdrop-filter: blur(5px);
    `;
    const otherStyle = css`
    text-decoration: none;
    color: white;
    `;
    const homeButton = css`
    float: left;
    color: white;
    margin: 5px;
    margin-left: 20px;
`;
    return (
        <div>
            <div css={headerStyle}>
                <Link css={homeButton} to="/home"><RiSpotifyLine /></Link>
                Spotify Playlist Quiz
                {props.content && <div>{props.content}</div>}
            </div>
        </div>
    )
}
