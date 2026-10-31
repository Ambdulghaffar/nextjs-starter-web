"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  HorizontaLDots,
  ListIcon,
  PageIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons/index";
import { ROUTES } from "@/utils/routes";
import {
  BirdhouseIcon,
  BotMessageSquareIcon,
  GlobeIcon,
  PieChartIcon,
  UserGroupIcon,
} from "lucide-react";
import KitLogo from "@/components/common/KitLogo";
import SidebarWidget from "./SidebarWidget";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: {
    name: string;
    path: string;
    pro?: boolean;
    new?: boolean;
  }[];
};

const { DASHBOARD, DASHBOARD_CHAT, DASHBOARD_USERS } = ROUTES;

const navItems: NavItem[] = [
  {
    icon: <BirdhouseIcon />,
    name: "Accueil",
    path: DASHBOARD,
  },
  {
    icon: <UserGroupIcon />,
    name: "Utilisateurs",
    path: DASHBOARD_USERS,
  },
  {
    icon: <BotMessageSquareIcon />,
    name: "Chat IA",
    subItems: [
      { name: "Chat", path: DASHBOARD_CHAT, pro: false },
      {
        name: "Image Generation",
        path: `${DASHBOARD}/#image-generation`,
        pro: false,
      },
    ],
  },
  {
    icon: <GlobeIcon />,
    name: "Découvrir [website name]",
    path: ROUTES.HOME,
  },
];

const othersItems: NavItem[] = [
  {
    icon: <CalenderIcon />,
    name: "calendar",
    path: `${DASHBOARD}/calendar`,
  },
  {
    icon: <UserCircleIcon />,
    name: "userProfile",
    path: `${DASHBOARD}/profile`,
  },
  {
    name: "forms",
    icon: <ListIcon />,
    subItems: [
      { name: "formElements", path: `${DASHBOARD}/form-elements`, pro: false },
    ],
  },
  {
    name: "tables",
    icon: <TableIcon />,
    subItems: [
      { name: "basicTables", path: `${DASHBOARD}/basic-tables`, pro: false },
    ],
  },
  {
    name: "pages",
    icon: <PageIcon />,
    subItems: [
      { name: "blankPage", path: `${DASHBOARD}/blank` },
      { name: "error404", path: `${DASHBOARD}/error-404` },
    ],
  },
  {
    icon: <PieChartIcon />,
    name: "charts",
    subItems: [
      { name: "lineChart", path: `${DASHBOARD}/line-chart`, pro: false },
      { name: "barChart", path: `${DASHBOARD}/bar-chart`, pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "uiElements",
    subItems: [
      { name: "alerts", path: `${DASHBOARD}/alerts` },
      { name: "avatar", path: `${DASHBOARD}/avatars` },
      { name: "badge", path: `${DASHBOARD}/badge` },
      { name: "buttons", path: `${DASHBOARD}/buttons` },
      { name: "images", path: `${DASHBOARD}/images` },
      { name: "videos", path: `${DASHBOARD}/videos` },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "authentication",
    subItems: [
      { name: "signIn", path: `${DASHBOARD}/signin`, pro: false },
      { name: "signUp", path: `${DASHBOARD}/signup`, pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
    toggleMobileSidebar,
  } = useSidebar();

  const pathname = usePathname();

  const handleMobileNavigation = () => {
    if (isMobileOpen) {
      toggleMobileSidebar();
    }
  };

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "autres";
    index: number;
  } | null>(null);

  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {},
  );

  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "autres") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }

      return {
        type: menuType,
        index,
      };
    });
  };

  useEffect(() => {
    let submenuMatched = false;

    ["main", "autres"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;

      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "autres",
                index,
              });

              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setTimeout(() => {
        setOpenSubmenu(null);
      }, 0);
    }
  }, [pathname, isActive]);

  /**
   * Calcule la hauteur du sous-menu lorsqu'il est ouvert.
   */
  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;

      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  /**
   * Rend les éléments de navigation.
   */
  const renderMenuItems = (items: NavItem[], menuType: "main" | "autres") => (
    <ul className="flex flex-col gap-1">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              type="button"
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
                } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
                }`}
            >
              <span
                className={`${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                  }`}
              >
                {nav.icon}
              </span>

              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}

              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto h-5 w-5 transition-transform duration-200
                    ${
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? "text-brand-500 rotate-180"
                        : ""
                    }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                href={nav.path}
                onClick={handleMobileNavigation}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                  }`}
              >
                <span
                  className={`${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                    }`}
                >
                  {nav.icon}
                </span>

                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}

          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 ml-9 space-y-1">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      href={subItem.path}
                      onClick={handleMobileNavigation}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}

                      <span className="ml-auto flex items-center gap-1">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}

                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 left-0 z-50 mt-16 flex h-screen flex-col border-r
        border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300
        ease-in-out lg:mt-0 dark:border-gray-800 dark:bg-gray-900 ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
              ? "w-[290px]"
              : "w-[90px]"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 
        LOGO
        - Desktop : affiché normalement.
        - Mobile : complètement masqué.
      */}
      <div
        className={`hidden py-8 lg:flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        {isExpanded || isHovered ? (
          <>
            <KitLogo className="h-auto w-[150px]" />
          </>
        ) : (
          <>
            <KitLogo className="h-auto w-[32px]" hidden={true} />
          </>
        )}
      </div>

      <div
        className="no-scrollbar flex flex-col overflow-y-auto duration-300
          ease-linear"
      >
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            {/* ==================== MAIN ==================== */}
            <div>
              <h2
                className={`mb-4 flex text-xs leading-[20px] text-gray-400
                  uppercase ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Administration"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>

              {renderMenuItems(navItems, "main")}
            </div>

            {/* ==================== OTHERS ==================== */}
            <div>
              <h2
                className={`mb-4 flex text-xs leading-[20px] text-gray-400
                  uppercase ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Autres"
                ) : (
                  <HorizontaLDots />
                )}
              </h2>

              {renderMenuItems(othersItems, "autres")}
            </div>
          </div>
        </nav>

        {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
      </div>
    </aside>
  );
};

export default AppSidebar;
