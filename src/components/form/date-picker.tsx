import { useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import Label from "./Label";
import { CalenderIcon } from "../../icons";
import Hook = flatpickr.Options.Hook;
import DateOption = flatpickr.Options.DateOption;

type PropsType = {
  id: string;
  mode?: "single" | "multiple" | "range" | "time";
  onChange?: Hook | Hook[];
  defaultDate?: DateOption;
  label?: string;
  placeholder?: string;
};

export default function DatePicker({
  id,
  mode,
  onChange,
  label,
  defaultDate,
  placeholder,
}: PropsType) {
  useEffect(() => {
    const input = document.getElementById(id);
    if (!input) return;

    const flatPickr = flatpickr(input, {
      mode: mode || "single",
      appendTo: document.body,
      monthSelectorType: "static",
      dateFormat: "Y-m-d",
      defaultDate,
      onChange,
    });
    flatPickr.calendarContainer.style.zIndex = "100000";

    return () => {
      flatPickr.destroy();
    };
  }, [mode, onChange, id, defaultDate]);

  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}

      <div className="relative">
        <input
          id={id}
          placeholder={placeholder}
          className="shadow-theme-xs focus:border-brand-300
            focus:ring-brand-500/20 dark:focus:border-brand-800 h-11 w-full
            appearance-none rounded-lg border border-gray-300 bg-transparent
            px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400
            focus:ring-3 focus:outline-hidden dark:border-gray-700
            dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
        />

        <span
          className="pointer-events-none absolute top-1/2 right-3
            -translate-y-1/2 text-gray-500 dark:text-gray-400"
        >
          <CalenderIcon className="size-6" />
        </span>
      </div>
    </div>
  );
}
