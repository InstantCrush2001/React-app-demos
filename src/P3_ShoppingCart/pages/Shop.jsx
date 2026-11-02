import { useOutletContext } from "react-router";
import ProductCard from "../components/ProductShop";
import { useState, useEffect } from "react";


export default function Shop(){

    let {cart, setCart, products} = useOutletContext();

    function handleChange(id, newQuantity){
        if (cart.some(item => item.id === id)){
            setCart(prev => prev.map(item => item.id === id 
                ? {...item, quantity: item.quantity + Number(newQuantity)} 
                : item
        ));
        } else {
            setCart(prev => [ ...prev, { id: id, quantity: Number(newQuantity)} ]); 
        }
    }

    return (
    <div>
        <h1>Shop</h1>
        <div className="products">
            {products.map(({id, name, price, img}) => (
            <ProductCard 
            key={ id } 
            name={name} 
            price = {price} 
            image={img} 
            onItemClicked={(quantity) => handleChange(id, quantity)}/>
        ))}
        </div>
    </div>
    );
}