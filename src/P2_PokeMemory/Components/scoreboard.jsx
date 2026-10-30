export default function Score({score, best}){
    return (
        <div className="score">
        <h2>Current Score: {score}</h2>
        <h2>Best Score: {best}</h2>
        </div>

        );
}
