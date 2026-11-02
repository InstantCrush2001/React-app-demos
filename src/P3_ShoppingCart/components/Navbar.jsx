import { Outlet, Link } from "react-router";
import { useState, useEffect } from "react";

export default function Navbar(){
    const [cartState, setCartState] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => data.map(product => ({
            id: product.id, 
            name: product.title,
            price: product.price,
            img: product.image
        })))
        .then(setProducts);
    }, []);

    return (
    <div>
        <nav> 
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li>
                    <div>
                        <Link to="/cart">Cart</Link>
                        <p>{cartState.reduce((total , i) => total + i.quantity, 0)}</p>
                    </div>
                    
                </li>
                
            </ul>
        </nav>
        <Outlet context={{cart: cartState, setCart: setCartState, products: products}}/>
    </div>
    );
}