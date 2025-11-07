import ScoreDiv from "./ScoreDiv";

export default function Header() {
    return (
        <header>
            <h1>Memory card</h1>
            <ScoreDiv 
                divClassName="score-container" 
                spanClassName="bold"
            />
        </header>
    );
}