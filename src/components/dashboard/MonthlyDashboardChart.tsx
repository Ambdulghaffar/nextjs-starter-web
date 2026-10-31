"use client";

import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { MoreDotIcon } from "@/icons";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { useQuery } from "@tanstack/react-query";
import { usersQueryOptions } from "@/lib/users/api/queries/queries.client";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlyDashboardChart() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: users } = useQuery(
    usersQueryOptions({
      page: 1,
      size: 1,
    }),
  );

  const options: ApexOptions = {
    colors: ["#465FFF", "#12B76A"],

    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 320,
      toolbar: {
        show: false,
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },

    dataLabels: {
      enabled: false,
    },

    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },

    xaxis: {
      categories: [
        "Jan",
        "Fév",
        "Mar",
        "Avr",
        "Mai",
        "Juin",
        "Juil",
        "Août",
        "Sep",
        "Oct",
        "Nov",
        "Déc",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#667085",
          fontSize: "12px",
        },
      },
    },

    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
      fontSize: "13px",
      markers: {
        size: 5,
      },
    },

    yaxis: {
      labels: {
        style: {
          colors: "#667085",
          fontSize: "12px",
        },
      },
      title: {
        text: undefined,
      },
    },

    grid: {
      borderColor: "#EAECF0",
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },

    fill: {
      opacity: 1,
    },

    tooltip: {
      theme: "light",
      y: {
        formatter: (val: number) => `${val}`,
      },
    },

    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 280,
          },
          plotOptions: {
            bar: {
              columnWidth: "55%",
            },
          },
        },
      },
    ],
  };

  const series = [
    {
      name: "Publications",
      data: [42, 68, 55, 81, 73, 96, 88, 64, 102, 118, 94, 126],
    },
    {
      name: "Commentaires",
      data: [125, 184, 156, 231, 205, 278, 245, 198, 312, 356, 294, 389],
    },
  ];

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white
        px-5 pt-5 sm:px-6 sm:pt-6 dark:border-gray-800 dark:bg-white/[0.03]"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Activité mensuelle
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Évolution des publications et commentaires
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

      {/* Chart */}
      <div className="custom-scrollbar max-w-full overflow-x-auto">
        <div className="-ml-5 min-w-[650px] pt-4 pl-2 xl:min-w-full">
          <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={320}
          />
        </div>
      </div>

      {/* Bottom summary */}
      <div
        className="grid grid-cols-2 border-t border-gray-100 py-4
          dark:border-gray-800"
      >
        <div className="border-r border-gray-100 px-4 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Utilisateurs
          </p>

          <p
            className="mt-1 text-lg font-semibold text-gray-800
              dark:text-white/90"
          >
            {users?.totalElements ?? 0}
          </p>
        </div>
      </div>
    </div>
  );
}
