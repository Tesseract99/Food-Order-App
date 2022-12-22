import React from "react";
import mealsTableImg from "../../assets/meals.jpg";
import cssClasses from "./styles/Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={cssClasses.header}>
        <h1>Sumurai's Ramen</h1>
        {/* <button>Cart</button> */}
        <HeaderCartButton showCartItems={props.showCartItems} />
      </header>
      <div className={cssClasses["main-image"]}>
        <img src={mealsTableImg} alt="food on table" />
      </div>
    </React.Fragment>
  );
};

export default Header;
