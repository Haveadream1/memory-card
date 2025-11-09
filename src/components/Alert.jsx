import ScoreDiv from "./ScoreDiv";

export default function Alert({ 
    score,
    highScore,
    onAlertClick
}) {
    const handleOnClick = () => {
        onAlertClick(true);
    }

    return (
        <div className="alert-container">
            <section className="end-game-alert" aria-labelledby="alert-heading">
                <h2 id="alert-heading">You Lost</h2>
                <ScoreDiv 
                    divClassName="end-game-score-container"
                    spanClassName="bold end-game-score"
                    score={score}
                    highScore={highScore}
                />
                <button 
                    id="play-again-button" 
                    type="button" 
                    aria-label="Play again" 
                    onClick={handleOnClick}
                >
                    Play Again
                </button>
            </section>
        </div>
    );
}