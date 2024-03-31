import "./FormField.css";

type FormFieldProps = {
  id: string;
  labelText: string;
  onChange: (value: string) => void;
  type?: React.HTMLInputTypeAttribute;
  value: string;
};

export const FormField = ({
  id,
  labelText,
  onChange,
  type,
  value,
}: FormFieldProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="form-field-container">
      <label htmlFor={id}>{labelText}</label>
      <input id={id} type={type} value={value} onChange={handleOnChange} />
    </div>
  );
};
