import cssClasses from "./styles/HeaderCartButton.module.css";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import { useState, useContext, useEffect } from "react";

const HeaderCartButton = (props) => {
  const cartContext = useContext(CartContext);
  const [shouldBump, setShouldBump] = useState(false);

  // console.log(cartContext);

  const numberOfCartItems = cartContext.items.reduce((prevValue, item) => {
    return Number(prevValue) + Number(item.quantity);
  }, 0);
  const showCartItems_ = () => {
    props.showCartItems(true);
    console.log("clicked");
  };

  const buttonClasses = `${cssClasses.button} ${
    shouldBump ? cssClasses.bump : ""
  }`;
  useEffect(() => {
    console.log("Bump Now!");
    setShouldBump(true);
    setTimeout(() => {
      setShouldBump(false);
    }, 300);
  }, [cartContext.items]);

  return (
    <button className={buttonClasses} onClick={showCartItems_}>
      <span className={cssClasses.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={cssClasses.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
