import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  BellIcon,
  DashboardIcon,
  MenuIcon,
  SettingsIcon,
  TagIcon,
} from "@iconicicons/react";

export const NavItem = (props) => {
  let location = useLocation();
  return (
    <Link
      className={`p-2 block rounded-xl ${
        location.pathname === props.to
          ? "bg-green-600 shadow-lg"
          : "bg-gray-900"
      }`}
      to={props.to}
    >
      {props.icon}
    </Link>
  );
};

const Navbar = () => {
  return (
    <nav className="h-screen bg-gray-800 p-4 space-y-8">
      {/* <NavItem
        to="/"
        icon={<DashboardIcon className="h-12 w-12 text-white" />}
      /> */}
      <NavItem
        to="/sales"
        icon={<MenuIcon className="h-12 w-12 text-white" />}
      />
      <NavItem
        to="/inventory"
        icon={<TagIcon className="h-12 w-12 text-white" />}
      />
      <NavItem
        to="/notifications"
        icon={<BellIcon className="h-12 w-12 text-white" />}
      />
      {/* <NavItem
        to="/settings"
        icon={<SettingsIcon className="h-12 w-12 text-white" />}
      /> */}
    </nav>
  );
};

export default Navbar;
