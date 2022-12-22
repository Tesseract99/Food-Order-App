import cssClasses from "./styles/Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  const showCartItems_ = () => {
    props.showCartItems(false);
  };

  return <div className={cssClasses.backdrop} onClick={showCartItems_}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={cssClasses.modal}>
      <div>{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  const overlays = document.getElementById("overlays");

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop showCartItems={props.showCartItems} />,
        overlays
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        overlays
      )}
    </>
  );
};

export default Modal;
