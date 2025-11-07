export default function ScoreDiv({
    divClassName,
    spanClassName,
}) {
    return (
        <div className={divClassName}>
            <p>Score: <span className={spanClassName}>10</span></p>
            <p>High score: <span className={spanClassName}>20</span></p>
        </div>
    );
}