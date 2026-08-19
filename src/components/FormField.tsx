import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string
  htmlFor: string
  optional?: boolean
  children: ReactNode
};

const FormField = ({ label, htmlFor, optional, children }: FormFieldProps) => {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor}>
        {label}
        {optional && <span className="form-field-optional"> (לא חובה)</span>}
      </label>
      {children}
    </div>
  );
};

export default FormField;
