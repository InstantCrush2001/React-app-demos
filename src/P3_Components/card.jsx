export default function Card({name, image, onCardClicked}){
    return (
    <button onClick={onCardClicked}>
        <img src={image}/>
        <span>{name}</span>
    </button>
        );
}