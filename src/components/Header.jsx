import ScoreDiv from "./ScoreDiv";

export default function Header({
    score,
    highScore
}) {
    return (
        <header>
            <h1>Memory card</h1>
            <ScoreDiv 
                divClassName="score-container" 
                spanClassName="bold"
                score={score}
                highScore={highScore}
            />
        </header>
    );
}