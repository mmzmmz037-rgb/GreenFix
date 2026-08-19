import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
};

const FormField = ({ label, htmlFor, optional, error, children }: FormFieldProps) => {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor}>
        {label}
        {optional && <span className="form-field-optional"> (לא חובה)</span>}
      </label>
      {children}
      {error && <p className="form-field-error">{error}</p>}
    </div>
  );
};

export default FormField;
