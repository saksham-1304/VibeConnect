const Textarea = ({ 
  label, 
  error, 
  className = "", 
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  rows = 4,
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
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className={`
          block w-full rounded-lg border-0 py-2.5 px-3
          bg-white/10 dark:bg-white/5
          backdrop-blur-md
          border border-white/20 dark:border-white/10
          text-neutral-900 dark:text-white
          placeholder:text-neutral-500 dark:placeholder:text-neutral-400
          focus:ring-2 focus:ring-primary-500 focus:border-transparent
          transition-all duration-200
          resize-none
          ${error ? 'ring-2 ring-red-500 border-red-500' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Textarea;