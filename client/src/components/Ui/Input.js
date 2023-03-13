function Input({
  id,
  type = 'text',
  label,
  placeholder,
  disabled,
  className,
  children,
  ...rest
}) {
  return (
    <div className={`flex flex-col w-full ${className} mb-4`}>
      <div className="flex flex-row justify-between">
        <label htmlFor={id} className="mb-2 font-semibold text-gray-700">
          {label}
        </label>
        {children}
      </div>
      <input
        {...rest}
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`py-2 px-3 border w-[300px] h-[36px] border-gray-300 rounded-md border-solid focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          disabled ? 'bg-gray-100' : 'bg-white'
        } ${className}`}
      />
    </div>
  );
}

export default Input;
