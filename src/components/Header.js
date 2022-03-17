/** @jsxImportSource @emotion/react */

import { RiSpotifyLine, RiGithubLine } from 'react-icons/ri';
import { css } from "@emotion/react";
import colors from "./colorTheme"
import { Link }from 'react-router-dom';
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

    const homeButton = css`
        float: left;
        color: white;
        margin: 5px;
        margin-left: 20px;
    `;
    const gitHubButton = css`
        float: right;
        color: white;
        margin: 5px;
        margin-right: 20px;
`;
    return (
        <div>
            <div css={headerStyle}>
                <Link css={homeButton} to="/home"><RiSpotifyLine /></Link>
                Spotify Playlist Quiz
                {props.content && <div>{props.content}</div>}
                <a css={gitHubButton} target="_blank" rel="noreferrer" href="https://github.com/RoryMoeller/spotify-quiz"><RiGithubLine /></a>
            </div>
        </div>
    )
}
