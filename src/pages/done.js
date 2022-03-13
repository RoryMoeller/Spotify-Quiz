

export function Done(props) {

    return (
        <div>
            You finished the quiz wow! Your final score was { (props.correctCount / props.questionCount) * 100 }%
        </div>
    )
}