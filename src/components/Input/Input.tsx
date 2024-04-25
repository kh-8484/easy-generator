interface InputProps {
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  className?: string;
  errorClassName?: string;
  type?: string;
  placeholder?: string;
  errorMessage?: string;
  disabled?: boolean;
  length?: number;
  icon?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  name,
  onChange,
  id,
  className,
  errorMessage,
  type,
  placeholder,
  errorClassName,
  disabled,
  length,
  icon,
}) => {
  return (
    <div className={`input-container  ${className}`}>
      {icon && <img src={icon} alt="icon" className="input-icon" />}
      <input
        id={id}
        className={`input font-Poppins-Medium-500-normal`}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        disabled={disabled}
        style={errorMessage ? { borderColor: "red" } : undefined}
        onWheel={
          type == "number" ? (event) => event.currentTarget.blur() : undefined
        }
        maxLength={length}
      />
      {errorMessage ? (
        <p
          className={`input-error-message flex-end font-Poppins-SemiBold-600-normal ${errorClassName}`}
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};

export default Input;
