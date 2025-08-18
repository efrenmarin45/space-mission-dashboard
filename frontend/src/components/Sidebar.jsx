import satellite from "../assets/satellite.svg";
import calendar from "../assets/calendar.svg";
import newspaper from "../assets/newspaper.svg";
import rocket from "../assets/rocket.svg";
import shuttle from "../assets/shuttle.svg";
import { Link } from "@tanstack/react-router";

const NavItem = ({ to, icon, alt, label, exact = false }) => {
  return (
    <Link to={to} activeOptions={{ exact }}>
      {({ isActive }) => {
        return (
          <div
            className={`hover:scale-102 mb-1 mt-1 flex h-24 w-[19rem] transform flex-row transition duration-500 ${isActive ? `bg-[var(--active-blue)]` : `bg-[var(--secondary-blue)]`}`}
          >
            <button
              className={`h-24 w-24 ${isActive ? `bg-[var(--icon-active-blue)]` : `bg-[var(--icon-bg-blue)]`}`}
            >
              <img
                src={icon}
                alt={alt}
                className="m-auto h-16 w-16 brightness-0 invert filter"
              />
            </button>
            <div className="flex flex-1 items-center justify-center">
              <p className="
               text-2xl font-semibold">
                {label}
              </p>
            </div>
          </div>
        );
      }}
    </Link>
  );
};

const navList = [
  {
    to: "/dashboard",
    icon: satellite,
    alt: "Satellite Icon",
    label: "ISS Tracker",
    exact: true,
  },
  {
    to: "/dashboard/launches",
    icon: rocket,
    alt: "Rocket Icon",
    label: "Launches",
    exact: true,
  },
  {
    to: "/dashboard/vehicles",
    icon: shuttle,
    alt: "Shuttle Icon",
    label: "Vehicles",
    exact: true,
  },
  {
    to: "/dashboard/events",
    icon: calendar,
    alt: "Calendar Icon",
    label: "Events",
    exact: true,
  },
  {
    to: "/dashboard/news",
    icon: newspaper,
    alt: "Newspaper Icon",
    label: "News",
    exact: true,
  },
];

export const Sidebar = () => {
  return (
    <div className="mr-2 flex w-80 flex-shrink-0 flex-col border-2 border-[var(--secondary-blue)] bg-[var(--primary-blue)]">
      <nav className="flex flex-col items-center justify-center">
        {navList.map((item) => {
          return (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              alt={item.alt}
              label={item.label}
              exact={item.exact}
            ></NavItem>
          );
        })}
      </nav>
    </div>
  );
};
