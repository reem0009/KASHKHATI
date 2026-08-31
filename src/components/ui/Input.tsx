import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  success,
  helperText,
  className = '',
  ...props
}) => {
  const errorClass = error ? 'input-error' : '';
  const successClass = success && !error ? 'input-success' : '';

  return (
    <div className="w-full">
      {label && <label className="label">{label}</label>}
      <input
        className={`input ${errorClass} ${successClass} ${className}`}
        {...props}
      />
      {error && <p className="text-error-600 text-sm mt-md">{error}</p>}
      {success && !error && helperText && (
        <p className="text-success-600 text-sm mt-md">{helperText}</p>
      )}
      {!error && helperText && (
        <p className="text-neutral-500 text-sm mt-md">{helperText}</p>
      )}
    </div>
  );
};
