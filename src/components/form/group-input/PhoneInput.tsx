"use client";
import React, { useEffect, useRef, useState } from "react";
import { KM, MA, FR, US, GB, CA, AU } from "country-flag-icons/react/3x2";
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from "libphonenumber-js";

interface CountryCode {
  code: string;
  label: string;
}

interface PhoneInputProps {
  countries: CountryCode[];
  placeholder?: string;
  onChange?: (phoneNumber: string) => void;
  selectPosition?: "start" | "end";
  value?: string;
}

const FLAGS: Record<string, React.ComponentType<{ className?: string }>> = {
  KM,
  MA,
  FR,
  US,
  GB,
  CA,
  AU,
};

function Flag({ code }: { code: string }) {
  const Component = FLAGS[code];
  return Component ? <Component className="h-4 w-6 rounded-xs" /> : null;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  countries,
  placeholder = "+1 (555) 000-0000",
  onChange,
  selectPosition = "start",
  value,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("MA");
  const [phoneNumber, setPhoneNumber] = useState<string>(value || "+212");
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const countryCodes: Record<string, string> = countries.reduce(
    (acc, { code, label }) => ({ ...acc, [code]: label }),
    {},
  );

  useEffect(() => {
    if (value) {
      setTimeout(() => setPhoneNumber(value), 0);
    }
  }, [value]);

  // Fermer le menu au clic à l'extérieur
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Numéro réduit à l'indicatif (ex: "+269") => champ facultatif vide
  const emit = (newValue: string) => {
    if (!onChange) return;
    onChange(/^\+\d{1,4}$/.test(newValue.trim()) ? "" : newValue);
  };

  const handleCountrySelect = (code: string) => {
    setSelectedCountry(code);
    setPhoneNumber(countryCodes[code]);
    emit(countryCodes[code]);
    setOpen(false);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    emit(e.target.value);
  };

  // Validation : le numéro doit être valide ET correspondre au pays sélectionné
  const trimmed = phoneNumber.trim();
  const hasDigits = trimmed !== "" && !/^\+\d{1,4}$/.test(trimmed);
  const parsed = hasDigits ? parsePhoneNumberFromString(trimmed) : undefined;
  const expectedCallingCode = countryCodes[selectedCountry]?.replace("+", "");

  const invalid =
    hasDigits &&
    (!isValidPhoneNumber(trimmed) ||
      parsed?.countryCallingCode !== expectedCallingCode);

  const isStart = selectPosition === "start";

  return (
    <div>
      <div ref={wrapperRef} className="relative flex">
        <div className={isStart ? "absolute left-0" : "absolute right-0"}>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-haspopup="listbox"
            aria-expanded={open}
            className={`flex h-11 items-center gap-2 border-gray-200
              bg-transparent px-3 text-sm text-gray-700 focus:outline-hidden
              dark:border-gray-800 dark:text-gray-400 ${
                isStart ? "rounded-l-lg border-r" : "rounded-r-lg border-l"
              }`}
          >
            <Flag code={selectedCountry} />
            <svg
              className="stroke-current"
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M4.79175 7.396L10.0001 12.6043L15.2084 7.396"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {open && (
            <ul
              role="listbox"
              className="absolute top-12 left-0 z-40 max-h-60 w-44 overflow-auto
                rounded-lg border border-gray-200 bg-white py-1 shadow-lg
                dark:border-gray-700 dark:bg-gray-900"
            >
              {countries.map((country) => (
                <li
                  key={country.code}
                  role="option"
                  aria-selected={country.code === selectedCountry}
                  onClick={() => handleCountrySelect(country.code)}
                  className="flex cursor-pointer items-center gap-3 px-3 py-2
                    text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300
                    dark:hover:bg-white/5"
                >
                  <Flag code={country.code} />
                  <span>{country.code}</span>
                  <span className="ml-auto text-gray-400">{country.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder={placeholder}
          aria-invalid={invalid}
          className={`dark:bg-dark-900 h-11 w-full ${
            isStart ? "pl-[76px]" : "pr-[76px]"
          } shadow-theme-xs
            focus:ring-brand-500/10 rounded-lg border ${
              invalid
                ? "border-red-500 focus:border-red-500"
                : `focus:border-brand-300 dark:focus:border-brand-800
                  border-gray-300`
            } bg-transparent px-4 py-3 text-sm text-gray-800
            placeholder:text-gray-400 focus:ring-3 focus:outline-hidden
            dark:border-gray-700 dark:bg-gray-900 dark:text-white/90
            dark:placeholder:text-white/30`}
        />
      </div>

      {invalid && (
        <p className="mt-1 text-xs text-red-500">
          Numéro invalide pour {selectedCountry} (
          {countryCodes[selectedCountry]})
        </p>
      )}
    </div>
  );
};

export default PhoneInput;
