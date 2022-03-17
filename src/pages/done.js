/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useNavigate } from 'react-router-dom';
import colors from '../components/colorTheme';

export function Done(props) {
    const doneStyle = css`
    .buttonBox {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
        margin-top: 30px;
    }
    .buttonBox button {
        background-color: rgb(${colors.standard.background.button});
        color: rgba(0, 0, 0, 0.5);
        padding-left: 18px;
        padding-bottom: 5px;
        padding-right: 18px;
        padding-top: 5px;
        border-radius: 500px;
        font-size: 25px;
        border: none;
        cursor: pointer;
    }
    .buttonBox button:hover {
        filter: brightness(0.5);
        
    }
    `
    const otherStyle = css`
    padding-top: 150px;
    padding-bottom: 150px;
    color: rgb(${colors.standard.text.primary});
    font-size: 40px;
    `
    const navigateTo = useNavigate();
    return (
        <div css={doneStyle}>
            <div css={otherStyle}>
                You finished the quiz wow! Your final score was { ((props.correctCount / props.questionCount) * 100).toFixed(1) }%
            </div>
            <center className="buttonBox">
                <button onClick={() => {
                    navigateTo("/home")
                }}> Try Again </button>
            </center>
        </div>
    )
}
