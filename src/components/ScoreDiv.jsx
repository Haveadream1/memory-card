export default function ScoreDiv({
    divClassName,
    spanClassName,
    score
}) {
    return (
        <div className={divClassName}>
            <p>Score: <span className={spanClassName}>{score}</span></p>
            <p>High score: <span className={spanClassName}>20</span></p>
        </div>
    );
}   