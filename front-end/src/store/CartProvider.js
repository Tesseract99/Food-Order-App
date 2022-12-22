import React, { useEffect } from "react";
import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      {
        const itemIndex = state.items.findIndex((obj) => {
          return obj.key === action.item.key;
        });
        const existingItem = state.items[itemIndex];

        let updatedItems = [...state.items]; //ititialize
        if (existingItem) {
          //item already present
          const updatedItem = {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          };
          updatedItems[itemIndex] = updatedItem;
          // console.log("updatedItems", updatedItems);
        } else {
          updatedItems = state.items.concat(action.item);
        }
        console.log(action.item);
        const updatedTotalAmount =
          state.totalAmount + action.item.price * action.item.quantity;
        return { items: updatedItems, totalAmount: updatedTotalAmount };
      }
      break;

    case "REMOVE":
      {
        const removeItemIndex = state.items.findIndex((item) => {
          return item.key === action.id;
        });

        let itemToRemove = state.items[removeItemIndex];
        const updatedTotalAmount = state.totalAmount - itemToRemove.price;
        const currQuantity = itemToRemove.quantity;

        const updatedItems = [...state.items];

        if (currQuantity === 1) {
          updatedItems.splice(removeItemIndex, 1);
        } else {
          // itemToRemove.quantity = currQuantity - 1;
          itemToRemove = { ...itemToRemove, quantity: currQuantity - 1 };
          // console.log("another one", itemToRemove);
          updatedItems[removeItemIndex] = itemToRemove;
        }

        return { items: updatedItems, totalAmount: updatedTotalAmount };
      }
      break;
    case "CLEAR": {
      return defaultCartState;
    }
    default:
      break;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  // useEffect(() => {
  //   console.log(cartState);
  // }, [cartState]);

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item }); //passing the 'action' object
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
