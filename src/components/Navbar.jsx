import React from "react";
import { Link, useLocation } from "react-router-dom";

import {
  BellIcon,
  DashboardIcon,
  MenuIcon,
  MinimizeIcon,
  SettingsIcon,
  TagIcon,
} from "@iconicicons/react";
import { useRecoilValue } from "recoil";

import { settingsState } from "../recoil/atoms";

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
  const settings = useRecoilValue(settingsState);

  return (
    <nav className="h-screen bg-gray-800 p-4 space-y-8">
      {settings.pages.dashboard && (
        <NavItem
          to="/"
          icon={<DashboardIcon className="h-12 w-12 text-white" />}
        />
      )}
      {settings.pages.recent && (
        <NavItem
          to="/sales"
          icon={<MenuIcon className="h-12 w-12 text-white" />}
        />
      )}
      {settings.pages.inventory && (
        <NavItem
          to="/inventory"
          icon={<TagIcon className="h-12 w-12 text-white" />}
        />
      )}
      {settings.pages.notifications && (
        <NavItem
          to="/notifications"
          icon={<BellIcon className="h-12 w-12 text-white" />}
        />
      )}

      <NavItem
        to="/settings"
        icon={<SettingsIcon className="h-12 w-12 text-white" />}
      />
      <button
        onClick={() => window.ipc.send("minimize")}
        className="p-2 block rounded-xl bg-gray-900"
      >
        <MinimizeIcon className="h-12 w-12 text-white" />
      </button>
    </nav>
  );
};

export default Navbar;
