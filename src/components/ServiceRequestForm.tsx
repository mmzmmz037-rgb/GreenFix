import { useState, type ChangeEvent, type FormEvent } from 'react';
import FormField from './FormField.tsx';
import './ServiceRequestForm.css';
import { validateAll, validateField, type FormErrors, type ServiceRequestData } from '../utils/validation.ts';
import StatusModal from './StatusModal.tsx';

type FormChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

const ServiceRequestForm = () => {
  const [formData, setFormData] = useState<ServiceRequestData>({
    fullName: '',
    phone: '',
    issueType: '',
    email: '',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: FormChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const hanldleBlur = (e: FormChangeEvent) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateAll(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0)
      return;

    setSubmitting(true);
    setSubmitStatus('idle');
    try {
      await fakeSubmit();
      setSubmitStatus('success');
      setFormData({
        fullName: '',
        phone: '',
        issueType: '',
        email: '',
        description: '',
      });
      setErrors({});

    } catch {
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  const fakeSubmit = () => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.2) reject(new Error('network'));
        else resolve();
      }, 1000);
    });
  }

  return (
    <div className="service-request-container" dir="rtl">
      <form className="service-request-form" onSubmit={handleSubmit}>
        <h1 className="form-title">בקשת שירות - GreenFix</h1>
        <p className="form-subtitle">
          שירותי תיקונים ותחזוקה לבית - מלאו את הפרטים ונחזור אליכם בהקדם
        </p>

        <FormField label="שם מלא*" htmlFor="fullName" error={errors.fullName}>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} placeholder="הכניסו את שמכם המלא" onChange={handleChange} onBlur={hanldleBlur} />
        </FormField>

        <FormField label="טלפון*" htmlFor="phone" error={errors.phone}>
          <input type="tel" id="phone" name="phone" value={formData.phone} placeholder="050-1234567" onChange={handleChange} onBlur={hanldleBlur} />
        </FormField>

        <FormField label="סוג התקלה*" htmlFor="issueType" error={errors.issueType}>
          <select id="issueType" name="issueType" value={formData.issueType} onChange={handleChange} onBlur={hanldleBlur}>
            <option value="" disabled>
              בחרו סוג תקלה
            </option>
            <option value="plumbing">אינסטלציה</option>
            <option value="electricity">חשמל</option>
            <option value="hvac">מיזוג אוויר</option>
            <option value="general">תחזוקה כללית</option>
            <option value="other">אחר</option>
          </select>
        </FormField>

        <FormField label="אימייל" htmlFor="email" optional error={errors.email}>
          <input type="email" id="email" name="email" value={formData.email} placeholder="example@gmail.com" onChange={handleChange} onBlur={hanldleBlur} />
        </FormField>

        <FormField label="תיאור קצר של הבעיה*" htmlFor="description" error={errors.description}>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            rows={4}
            placeholder="תארו בקצרה את הבעיה..."
            onChange={handleChange}
            onBlur={hanldleBlur}
          />
        </FormField>

        <button type="submit" className="submit-button" disabled={submitting}>
          {submitting ? 'שולח...' : 'שליחת בקשה'}
        </button>
      </form>
      <StatusModal status={submitStatus} onClose={() => setSubmitStatus('idle')} />
    </div>
  );
};

export default ServiceRequestForm;
