import React from "react";
import Styles from "../../styles/input.module.css";

const Input = (props) => {
  const {
    type,
    placeholder,
    label,
    check,
    errors,
    value,
    register,
    onChange,
    name,
    onClick,
    accept,
    disabled,
    style,
  } = props;
  return (
    <>
      <input
        {...(register ? register(label, check) : {})}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors && errors[label] && Styles.inputActive
        }`}
        type={type}
        value={value}
        onClick={onClick}
        placeholder={placeholder}
        disabled={disabled}
        accept={accept}
        style={style}
      />

      {errors && errors[label] && (
        <span className={Styles.inputError}>{errors[label]?.message}</span>
      )}
      {/* Pattern */}
      {label === "email" && errors[label]?.type === "pattern" && (
        <p className={Styles.inputError}>Please Enter A Valid Email </p>
      )}
      {/* Min or Max Length */}
      {errors && errors[label]?.type === "minLength" && (
        <p className={Styles.inputError}>
          {name} Must Be Of {check.minLength} Digit
        </p>
      )}
    </>
  );
};

export default Input;
