import { useState } from "react";

export default function ProductCart({name, price, image, quantity, onSubsClick, onAddClick, onQuantityChange, onRemoveClicked}){

    return (
    <fieldset>
        <img className="product-img" src={image}/>
        <span>{name}</span>
        <span> - ${price} </span>
        
        <button onClick={onSubsClick} >-</button>
        <input 
            value = {quantity}
            onChange={(e) => onQuantityChange(e.target.value)}>
        </input>
        <button onClick={onAddClick} >+</button>
        
        <span>      <button onClick={onRemoveClicked} >Remove</button></span>
        
    </fieldset>
        );
    }