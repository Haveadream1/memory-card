export default function ScoreDiv({
    divClassName,
    spanClassName,
    score,
    highScore
}) {
    return (
        <div className={divClassName}>
            <p>Score: <span className={spanClassName}>{score}</span></p>
            <p>High score: <span className={spanClassName}>{highScore}</span></p>
        </div>
    );
}   