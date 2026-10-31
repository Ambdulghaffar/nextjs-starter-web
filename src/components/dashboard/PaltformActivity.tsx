"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";

import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "@/icons";
import { useQuery } from "@tanstack/react-query";
import { usersQueryOptions } from "@/lib/users/api/queries/queries.client";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function PlatformActivity() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: users } = useQuery(
    usersQueryOptions({
      page: 1,
      size: 1,
    }),
  );

  const series = [82];

  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: (val) => `${val}%`,
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Activité"],
  };

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div
      className="rounded-2xl border border-gray-200 bg-gray-100
        dark:border-gray-800 dark:bg-white/[0.03]"
    >
      <div
        className="shadow-default rounded-2xl bg-white px-5 pt-5 pb-11 sm:px-6
          sm:pt-6 dark:bg-gray-900"
      >
        {/* Header */}
        <div className="flex justify-between">
          <div>
            <h3
              className="text-lg font-semibold text-gray-800 dark:text-white/90"
            >
              Activité de la plateforme
            </h3>

            <p
              className="text-theme-sm mt-1 font-normal text-gray-500
                dark:text-gray-400"
            >
              Vue d’ensemble de l’activité de [nom de la plateforme] sur les 12
              derniers mois.
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
                tag="a"
                onItemClick={closeDropdown}
                className="flex w-full rounded-lg text-left font-normal
                  text-gray-500 hover:bg-gray-100 hover:text-gray-700
                  dark:text-gray-400 dark:hover:bg-white/5
                  dark:hover:text-gray-300"
              >
                Voir les détails
              </DropdownItem>

              <DropdownItem
                tag="a"
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

        {/* Chart */}
        <div className="relative">
          <div className="max-h-[330px]">
            <ReactApexChart
              options={options}
              series={series}
              type="radialBar"
              height={330}
            />
          </div>

          <span
            className="bg-success-50 text-success-600 dark:bg-success-500/15
              dark:text-success-500 absolute top-full left-1/2 -translate-x-1/2
              -translate-y-[95%] rounded-full px-3 py-1 text-xs font-medium"
          >
            Activité élevée
          </span>
        </div>

        {/* Description */}
        <p
          className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm
            text-gray-500 sm:text-base"
        >
          La plateforme affiche actuellement un niveau d’activité de{" "}
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            82 %
          </span>
          . La communauté continue de publier et d’échanger activement.
        </p>
      </div>

      {/* Statistics */}
      <div
        className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8
          sm:py-5"
      >
        {/* Users */}
        <div>
          <p
            className="text-theme-xs mb-1 text-center text-gray-500 sm:text-sm
              dark:text-gray-400"
          >
            Utilisateurs
          </p>

          <p
            className="flex items-center justify-center text-base font-semibold
              text-gray-800 sm:text-lg dark:text-white/90"
          >
            {users?.totalElements ?? 0}
          </p>
        </div>
      </div>
    </div>
  );
}
