import cssClasses from "./styles/MealItemForm.module.css";
import Input from "../UI/Input";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";

const MealItemForm = (props) => {
  const cartContext = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const addItemHandler = (event) => {
    event.preventDefault();
    cartContext.addItem({
      key: props.item.id,
      name: props.item.name,
      price: props.item.price,
      quantity: quantity,
    });
  };

  const quantityChangeHandler = (event) => {
    const val = event.target.value;
    setQuantity(val);
  };

  return (
    <form className={cssClasses.form}>
      <Input
        label="Quantity"
        input={{
          type: "number",
          id: "amount",
          min: "1",
          max: "5",
          defaultValue: "1",
          onChange: quantityChangeHandler,
        }}
      />
      <button onClick={addItemHandler}>+ Add</button>
    </form>
  );
};

export default MealItemForm;
