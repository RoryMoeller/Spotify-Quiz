/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";

export function Header(props) {
    const headerStyle = css`
        height: 60px;
        border-top: 1px solid #eaeaea;
        width: 100%;
        box-shadow: 0px 7px 10px 5px rgba(0,0,0,0.2);
        margin-bottom: 20px;
    `;
    return (
        <div css={headerStyle}>
            This is a header
            {props.content && <div>{props.content}</div>}
        </div>
    )
}