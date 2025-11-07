export default function ScoreDiv({
    divClassName,
    scoreClassName,
    highScoreClassName
}) {
    return (
        <div className={divClassName}>
            <p>Score: <span className={scoreClassName}>10</span></p>
            <p>High score: <span className={highScoreClassName}>20</span></p>
        </div>
    );
}