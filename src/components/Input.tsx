import type React from "react";
import { useState } from "react";

type InputProps = {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  required?: boolean;
  pattern?: RegExp;
  errorMessage?: string;
  placeholder?: string;
};

const Input = ({ label, type, value, onChange, name, required = false, pattern, errorMessage = "Invalid input", placeholder = "" }: InputProps) => {
  const [err, setErr] = useState<string | null>(null);

  const validate = (value: string) => {
    if (required && !value) {
      setErr(`${label} is required.`);
      return false;
    }
    if (pattern && !pattern.test(value)) {
      setErr(errorMessage);
      return false;
    }
    setErr(null);
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    validate(e.target.value);
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        className="input"
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {err && <span className="text-error text-xs">{err}</span>}
    </div>
  )
};
export default Input;