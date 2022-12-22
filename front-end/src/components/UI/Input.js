import cssClasses from "./styles/Input.module.css";

const Input = (props) => {
  return (
    <div className={cssClasses.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />
    </div>
  );
};

export default Input;
