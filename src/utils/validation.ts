export type FormErrors = Partial<Record<keyof ServiceRequestData, string>>;

export interface ServiceRequestData {
  fullName: string;
  phone: string;
  issueType: string;
  email: string;
  description: string;
};

export const validateField = (name: string, value: string): string | null => {
  switch (name) {
    case 'fullName':
      if (!value.trim()) return 'נא להזין שם מלא';
      if (value.trim().length < 2) return 'השם קצר מדי';
      return null;

    case 'phone': {
      const digits = value.replace(/[\s-]/g, '');
      if (!digits) return 'נא להזין מספר טלפון';
      if (!/^0\d{8,9}$/.test(digits)) return 'מספר טלפון לא תקין';
      return null;
    }

    case 'issueType':
      if (!value) return 'נא לבחור סוג תקלה';
      return null;

    case 'email':
      if (!value.trim()) return null;
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim())) {
        return 'כתובת אימייל לא תקינה';
      }
      return null;

    case 'description':
      if (!value.trim()) return 'נא לתאר בקצרה את הבעיה';
      if (value.trim().length < 8) return 'אפשר לפרט קצת יותר?';
      if (value.trim().length > 500) return 'התיאור ארוך מדי (מקסימום 500 תווים)';

      return null;

    default:
      return null;
  }
};

export const validateAll = (formData: ServiceRequestData): FormErrors => {
  const errors: FormErrors = {};
  (Object.keys(formData) as Array<keyof ServiceRequestData>).forEach((key) => {
    const error = validateField(key, formData[key]);
    if (error) errors[key] = error;
  });
  return errors;
};