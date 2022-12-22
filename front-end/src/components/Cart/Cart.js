import cssClasses from "./styles/Cart.module.css";
import Card from "../UI/Card";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import { useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import axios from "axios";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const showCartItems_ = () => {
    props.showCartItems(false);
  };

  const onRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const onAddHandler = (item) => {
    cartContext.addItem({ ...item, quantity: 1 });
  };

  const proceedCheckout = () => {
    setShowCheckout(true);
  };

  const onSubmitHandler = async (customerData) => {
    setIsSubmitting(true);
    // const url =
    //   "https://samurai-s-ramen-default-rtdb.asia-southeast1.firebasedatabase.app/";
    // const response = await fetch(url + "order.json", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     customerData: customerData,
    //     order: cartContext.items,
    //   }),
    // });

    const url = "http://localhost:5000/";
    await axios.post(url, {
      customerData: customerData,
      order: cartContext.items,
    });

    //implement error handling here
    setIsSubmitting(false);
    setDidSubmit(true);
    cartContext.clearCart();
  };

  const modalActions = (
    <div className={cssClasses["modal-actions"]}>
      <div className={cssClasses.total}>
        Total Amount: {cartContext.totalAmount}
      </div>
      <div className={cssClasses.actions}>
        <button className={cssClasses["button--alt"]} onClick={showCartItems_}>
          Close
        </button>

        {cartContext.items.length > 0 && (
          <>
            <button className={cssClasses.button} onClick={proceedCheckout}>
              Order
            </button>
            <button
              className={cssClasses["button--alt"]}
              onClick={cartContext.clearCart}
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );

  const cartModal = (
    <div className={cssClasses["cart-items"]}>
      <ul>
        {cartContext.items.map((item) => {
          return (
            <>
              {/* <li>
                <div>
                  {item.name}: {item.price} x {item.quantity}
                </div>
              </li> */}
              <CartItem
                key={item.key}
                name={item.name}
                price={item.price}
                amount={item.quantity}
                onRemove={onRemoveHandler.bind(null, item.key)}
                onAdd={onAddHandler.bind(null, item)}
              />
            </>
          );
        })}
      </ul>

      {showCheckout && (
        <Checkout
          onSubmitHandler={onSubmitHandler}
          showCartItems_={showCartItems_}
        />
      )}
      {!showCheckout && modalActions}
    </div>
  );

  return (
    <Modal showCartItems={props.showCartItems}>
      {!isSubmitting && !didSubmit && cartModal}
      {isSubmitting && (
        <p className={cssClasses["placing-order"]}>Placing Your Order...</p>
      )}
      {!isSubmitting && didSubmit && (
        <p className={cssClasses["order-placed"]}>
          Your Order has been placed! 🥳
        </p>
      )}
    </Modal>
  );
};

export default Cart;
