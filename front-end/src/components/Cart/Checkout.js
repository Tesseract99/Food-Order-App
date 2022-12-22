import classes from "./styles/Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (val) => {
  return val.trim() === "";
};

const isSiXChars = (val) => {
  return val.trim().length === 6;
};

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    enteredNameIsValid: true,
    enteredStreetIsValid: true,
    enteredCityIsValid: true,
    enteredPostalIsValid: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalIsValid = isSiXChars(enteredPostal);

    setFormValidity({
      enteredNameIsValid,
      enteredStreetIsValid,
      enteredCityIsValid,
      enteredPostalIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalIsValid;

    if (!formIsValid) return;

    props.onSubmitHandler({
      name: enteredName,
      city: enteredCity,
      street: enteredStreet,
      postalCode: enteredPostal,
    });
  };

  const nameControlClasses = `${classes.control} + ${
    formValidity.enteredNameIsValid ? "" : classes.invalid
  }`;
  const streeControlClasses = `${classes.control} + ${
    formValidity.enteredStreetIsValid ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} + ${
    formValidity.enteredCityIsValid ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} + ${
    formValidity.enteredPostalIsValid ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidity.enteredNameIsValid && <p>Name is invalid</p>}
      </div>
      <div className={streeControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInputRef} />
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.showCartItems_}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
