import cart from "../components/assets/cart.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ItemsContext } from "../cont/ItemContext";

export const CartWidget = () => {
  const { items } = useContext(ItemsContext);
  const quantity = items.reduce((acc, act) => acc + act.quantity, 0); 

  return (
    <Link to="/cart">
      <img src={cart} height={24} alt="Cart" /> 
      <span>{quantity}</span> 
    </Link>
  );
};