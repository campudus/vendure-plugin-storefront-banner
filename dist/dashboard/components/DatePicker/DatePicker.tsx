import { useLingui } from "@lingui/react/macro";
import { Calendar, Trash2 } from "lucide-react";
import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";

import { toDate } from "../../helpers/banners";
import "react-datepicker/dist/react-datepicker.min.css";
import "./DatePicker.scss";

type DatePickerProps = {
  value: Date | string;
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange: (value: Date | string) => void;
};

type DatePickerInputProps = {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
};

const DatePickerInput = forwardRef<HTMLInputElement, DatePickerInputProps>(
  ({ value, onClick, placeholder }, ref) => (
    <div className="date-picker" onClick={onClick}>
      <input
        className="date-picker__input"
        ref={ref}
        value={value ?? ""}
        placeholder={placeholder}
        readOnly
      />

      <div className="date-picker__icon-container">
        <Calendar size={16} />
      </div>
    </div>
  ),
);

DatePickerInput.displayName = "DatePickerInput";

export function DatePicker({ value, minDate, maxDate, onChange }: DatePickerProps) {
  const { t } = useLingui();

  return (
    <div className="banner-date-picker">
      <ReactDatePicker
        selected={toDate(value)}
        minDate={toDate(minDate ?? "") ?? undefined}
        maxDate={toDate(maxDate ?? "") ?? undefined}
        onChange={(date: Date | null) => onChange(date ?? "")}
        dateFormat="dd.MM.yyyy HH:mm"
        showTimeSelect
        timeFormat="HH:mm"
        placeholderText={t`Select date`}
        customInput={<DatePickerInput />}
      />

      {value && (
        <button type="button" className="banner-date-picker__clear" onClick={() => onChange("")}>
          <Trash2 size={14} />
        </button>
      )}
    </div>
  );
}

