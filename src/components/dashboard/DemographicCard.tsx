"use client";

import { useState } from "react";
import { FR, KM, MA, SN } from "country-flag-icons/react/3x2";

import CountryMap from "./CountryMap";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

const countries = [
  {
    name: "Comores",
    users: 850,
    percentage: 68,
    Flag: KM,
  },
  {
    name: "Maroc",
    users: 213,
    percentage: 17,
    Flag: MA,
  },
  {
    name: "France",
    users: 502,
    percentage: 9,
    Flag: FR,
  },
  {
    name: "Sénégal",
    users: 75,
    percentage: 6,
    Flag: SN,
  },
];

export default function DemographicCard() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div
      className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6
        dark:border-gray-800 dark:bg-white/[0.03]"
    >
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Répartition des utilisateurs
          </h3>

          <p className="text-theme-sm mt-1 text-gray-500 dark:text-gray-400">
            Utilisateurs par pays
          </p>
        </div>

        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className="dropdown-toggle"
            aria-label="Options"
          >
            <MoreDotIcon
              className="text-gray-400 hover:text-gray-700
                dark:hover:text-gray-300"
            />
          </button>

          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full rounded-lg text-left font-normal
                text-gray-500 hover:bg-gray-100 hover:text-gray-700
                dark:text-gray-400 dark:hover:bg-white/5
                dark:hover:text-gray-300"
            >
              Voir les détails
            </DropdownItem>

            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full rounded-lg text-left font-normal
                text-gray-500 hover:bg-gray-100 hover:text-gray-700
                dark:text-gray-400 dark:hover:bg-white/5
                dark:hover:text-gray-300"
            >
              Actualiser
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      {/* Map */}
      <div
        className="my-6 overflow-hidden rounded-2xl border border-gray-200
          bg-gray-50 px-4 py-6 sm:px-6 dark:border-gray-800 dark:bg-gray-900"
      >
        <div
          id="mapOne"
          className="mapOne map-btn 2xsm:w-[307px] xsm:w-[358px] -mx-4 -my-6
            h-[212px] w-[252px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px]
            2xl:w-[554px]"
        >
          <CountryMap />
        </div>
      </div>

      {/* Countries */}
      <div className="space-y-5">
        {countries.map(({ name, users, percentage, Flag }) => (
          <div key={name} className="flex items-center justify-between">
            {/* Country */}
            <div className="flex items-center gap-3">
              <div
                className="flex size-8 items-center justify-center rounded-full
                  bg-gray-100 dark:bg-gray-800"
              >
                <Flag
                  title={name}
                  className="h-4 w-6 rounded-[2px] object-cover"
                />
              </div>

              <div>
                <p
                  className="text-theme-sm font-semibold text-gray-800
                    dark:text-white/90"
                >
                  {name}
                </p>

                <span
                  className="text-theme-xs block text-gray-500
                    dark:text-gray-400"
                >
                  {users.toLocaleString("fr-FR")} utilisateurs
                </span>
              </div>
            </div>

            {/* Percentage */}
            <div className="flex w-full max-w-[140px] items-center gap-3">
              <div
                className="relative block h-2 w-full max-w-[100px] rounded-sm
                  bg-gray-200 dark:bg-gray-800"
              >
                <div
                  className="bg-brand-500 absolute top-0 left-0 flex h-full
                    items-center justify-center rounded-sm text-xs font-medium
                    text-white"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p
                className="text-theme-sm font-medium text-gray-800
                  dark:text-white/90"
              >
                {percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
