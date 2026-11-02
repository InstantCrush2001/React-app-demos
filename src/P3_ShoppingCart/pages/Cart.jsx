import { useOutletContext } from "react-router";
import ProductCart from "../components/ProductCart";

export default function Cart(){
    let {cart, setCart, products} = useOutletContext();

    function handleChange(id, newQuantity){
        const quantity = Number(newQuantity);

        if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99 ) return;

        setCart(prev => prev.map(item => item.id === id 
                ? {...item, quantity} 
                : item
        ));
    }

    function handleRemove(id){
        setCart(prev => prev.filter(item => item.id !== id
        ));
    }

    const total = cart.reduce((sum , i) => {
        const product = products.find(item => item.id === i.id);
        if (!product) return sum;
        return sum + (product.price * i.quantity);
    }, 0)

    return (
        <div>
            <h1>Shopping cart: ${total.toFixed(2)}</h1>

        {cart.map(({id, quantity}) => {
            const product = products.find(item => item.id === id);
            return(
                <div key={ id }>
                    <ProductCart 
                    name={product.name} 
                    price = {product.price} 
                    image={product.img}
                    quantity={quantity}
                    onSubsClick={() => handleChange(id, quantity -1)}
                    onAddClick={() => handleChange(id, quantity + 1)}
                    onQuantityChange={(newQuantity) => handleChange(id, newQuantity)}
                    onRemoveClicked={() => handleRemove(id)}/>
                </div>
            );
        })}
    </div>
    )
}