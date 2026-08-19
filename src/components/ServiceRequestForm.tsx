import FormField from './FormField.tsx';
import './ServiceRequestForm.css';

const ServiceRequestForm = () => {
  return (
    <div className="service-request-container" dir="rtl">
      <form className="service-request-form">
        <h1 className="form-title">בקשת שירות - GreenFix</h1>
        <p className="form-subtitle">
          שירותי תיקונים ותחזוקה לבית - מלאו את הפרטים ונחזור אליכם בהקדם
        </p>

        <FormField label="שם מלא*" htmlFor="fullName">
          <input type="text" id="fullName" name="fullName" placeholder="הכניסו את שמכם המלא" />
        </FormField>

        <FormField label="טלפון*" htmlFor="phone">
          <input type="tel" id="phone" name="phone" placeholder="050-1234567" />
        </FormField>

        <FormField label="סוג התקלה*" htmlFor="issueType">
          <select id="issueType" name="issueType" defaultValue="">
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

        <FormField label="אימייל" htmlFor="email" optional>
          <input type="email" id="email" name="email" placeholder="example@email.com" />
        </FormField>

        <FormField label="תיאור קצר של הבעיה" htmlFor="description">
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="תארו בקצרה את הבעיה..."
          />
        </FormField>

        <button type="submit" className="submit-button">
          שליחת בקשה
        </button>
      </form>
    </div>
  );
};

export default ServiceRequestForm;
