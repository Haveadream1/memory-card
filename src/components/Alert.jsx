import ScoreDiv from "./ScoreDiv";

export default function Alert({ score }) {
    return (
        <div className="alert-container">
            <section className="end-game-alert" aria-labelledby="alert-heading">
                <h2 id="alert-heading">Congratulations</h2>
                <ScoreDiv 
                    divClassName="end-game-score-container"
                    spanClassName="bold end-game-score"
                    score={score}
                />
                <button id="play-again-button" type="button" aria-label="Play again">Play Again</button>
            </section>
        </div>
    );
}