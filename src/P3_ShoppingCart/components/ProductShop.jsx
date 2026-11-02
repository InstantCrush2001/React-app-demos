import { useState } from "react";

export default function ProductCard({name, price, image, onItemClicked}){
    const [value, setValue] = useState("1");
    return (
    <fieldset>
        <img className="product-img" src={image}/>
        <span>{name}</span>
        <span> - ${price} </span>
        <label>
            Quantity:
            <input 
                type = "number"
                value={Number(value)}
                onChange={(e) => setValue(e.target.value)}>
            </input>
            <button 
                disabled={Number(value) <= 1}
                onClick={() => {
                    const next = Number(value) - 1
                    if (!Number.isInteger(next) || next < 1) return 
                    setValue(next)
            }} >-</button>
            <button 
                disabled={Number(value) >= 99}
                onClick={() => {
                    const next = Number(value) + 1
                    if (!Number.isInteger(next) || next > 99) return 
                    setValue(next)
            }} >+</button>
        </label>
        <button onClick={() => {
                    const quantity = Number(value);
                    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) return;
                    onItemClicked(value)
                }}>Add to Cart</button>
    </fieldset>
        );
    }