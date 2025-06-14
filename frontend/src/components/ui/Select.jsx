const Select = ({ 
  label, 
  error, 
  className = "", 
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  ...props 
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          block w-full rounded-lg border-0 py-2.5 px-3
          bg-white/10 dark:bg-white/5
          backdrop-blur-md
          border border-white/20 dark:border-white/10
          text-neutral-900 dark:text-white
          focus:ring-2 focus:ring-primary-500 focus:border-transparent
          transition-all duration-200
          ${error ? 'ring-2 ring-red-500 border-red-500' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-white dark:bg-neutral-800">
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Select;