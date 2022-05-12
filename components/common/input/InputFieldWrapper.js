import React from "react";




const InputFieldWrapper = ({ label, id = '', errors = '', children }) => {
  const [msg, setMsg] = React.useState(errors);
  React.useEffect(() => {
    setMsg(state => state = errors)
  }, [errors])
  return (
    <div className="input__field__wrapper">
      <label htmlFor={id} className="intput__field__wrapper__label">
        <span className={`input__field__wrapper__label__text`}>{label}</span>
        {children}
      </label>
      {errors && typeof msg === "string" ? (
        <p className="input__field__wrapper__error p-error">{msg}</p>
      ) : (
        msg.length > 0 &&
        msg.map((m, index) => (
          <p className="input__field__wrapper__error p-error" key={index}>
            {m}
          </p>
        ))
      )}
    </div>
  );
};

export default InputFieldWrapper;

