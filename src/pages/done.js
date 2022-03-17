/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import colors from '../components/colorTheme';

export function Done(props) {
    const doneStyle = css`
    padding-top: 150px;
    padding-bottom: 150px;
    color: rgb(${colors.standard.text.primary});
    font-size: 40px;
    `
    return (
        <div css={doneStyle}>
            You finished the quiz wow! Your final score was { ((props.correctCount / props.questionCount) * 100).toFixed(1) }%
        </div>
    )
}
