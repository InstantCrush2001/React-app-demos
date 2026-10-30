export default function Card({name, image, hasWon, onCardClicked}){
    return (
    <button onClick={onCardClicked} disabled={hasWon}>
        <img className="card-img" src={image}/>
        <span>{name}</span>
    </button>
        );
}