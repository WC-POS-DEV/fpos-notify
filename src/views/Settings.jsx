import React, { useEffect, useState } from "react";

import { CloseIcon, RefreshIcon } from "@iconicicons/react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { settingsState } from "../recoil/atoms";

const Settings = () => {
  const [settings, setSettings] = useState({
    ...useRecoilValue(settingsState),
  });
  const updateSettingsRecoil = useSetRecoilState(settingsState);

  useEffect(() => {
    const storedSettings = window.localStorage.getItem("app-settings");
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  const saveSettings = () => {
    window.localStorage.setItem("app-settings", JSON.stringify(settings));
    updateSettingsRecoil(settings);
  };

  return (
    <main className="w-full h-screen p-4">
      <section className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold tracking-wide">App Settings</h1>
          <button
            type="button"
            className="p-2 rounded-lg"
            onClick={() => setSettings({ ...defaultSettings })}
          >
            <RefreshIcon className="w-6 h-6" />
          </button>
        </div>
        <button
          type="button"
          className="p-2 rounded-lg"
          onClick={() => window.ipc.send("quit")}
        >
          <CloseIcon className="w-6 h-6" />
        </button>
      </section>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <section className="p-4 mt-4 bg-gray-800 rounded-xl">
            <h1 className="text-2xl font-bold tracking-wide">Pages</h1>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="pt-4 space-y-4"
            >
              <fieldset className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="dashboard-enable"
                  id="dashboard-enable"
                  className="w-8 h-8 text-green-600 rounded-full form-checkbox focus:ring-offset-gray-800 focus:ring-green-600"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      pages: { ...settings.pages, dashboard: e.target.checked },
                    })
                  }
                  checked={settings.pages.dashboard}
                />
                <label htmlFor="dashboard-enable" className="text-lg">
                  Dashboard
                </label>
              </fieldset>
              <fieldset className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="recent-sales-enable"
                  id="recent-sales-enable"
                  className="w-8 h-8 text-green-600 rounded-full form-checkbox focus:ring-offset-gray-800 focus:ring-green-600"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      pages: { ...settings.pages, recent: e.target.checked },
                    })
                  }
                  checked={settings.pages.recent}
                />
                <label htmlFor="recent-sales-enable" className="text-lg">
                  Recent Sales
                </label>
              </fieldset>
              <fieldset className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="inventory-enable"
                  id="inventory-enable"
                  className="w-8 h-8 text-green-600 rounded-full form-checkbox focus:ring-offset-gray-800 focus:ring-green-600"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      pages: { ...settings.pages, inventory: e.target.checked },
                    })
                  }
                  checked={settings.pages.inventory}
                />
                <label htmlFor="inventory-enable" className="text-lg">
                  Inventory
                </label>
              </fieldset>
              <fieldset className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="waitlist-enable"
                  id="waitlist-enable"
                  className="w-8 h-8 text-green-600 rounded-full form-checkbox focus:ring-offset-gray-800 focus:ring-green-600"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      pages: {
                        ...settings.pages,
                        waitlist: e.target.checked,
                      },
                    })
                  }
                  checked={settings.pages.waitlist}
                />
                <label htmlFor="waitlist-enable" className="text-lg">
                  Waitlist
                </label>
              </fieldset>
              <fieldset className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="notifications-enable"
                  id="notifications-enable"
                  className="w-8 h-8 text-green-600 rounded-full form-checkbox focus:ring-offset-gray-800 focus:ring-green-600"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      pages: {
                        ...settings.pages,
                        notifications: e.target.checked,
                      },
                    })
                  }
                  checked={settings.pages.notifications}
                />
                <label htmlFor="notifications-enable" className="text-lg">
                  Notifications
                </label>
              </fieldset>
            </form>
          </section>
          <section className="p-4 mt-4 bg-gray-800 rounded-xl">
            <h1 className="text-2xl font-bold tracking-wide">Notifications</h1>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="pt-4 space-y-4"
            >
              <fieldset className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="board-notifications-enable"
                  id="board-notifications-enable"
                  className="w-8 h-8 text-green-600 rounded-full form-checkbox focus:ring-offset-gray-800 focus:ring-green-600"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        board: e.target.checked,
                      },
                    })
                  }
                  checked={settings.notifications.board}
                />
                <label htmlFor="board-notifications-enable" className="text-lg">
                  Menu Board
                </label>
              </fieldset>
              <fieldset className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="phone-notifications-enable"
                  id="phone-notifications-enable"
                  className="w-8 h-8 text-green-600 rounded-full form-checkbox focus:ring-offset-gray-800 focus:ring-green-600"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        phone: e.target.checked,
                      },
                    })
                  }
                  checked={settings.notifications.phone}
                />
                <label htmlFor="phone-notifications-enable" className="text-lg">
                  Phone
                </label>
              </fieldset>
            </form>
          </section>
        </div>
        <div className="w-1/2">
          <section className="p-4 mt-4 bg-gray-800 rounded-xl">
            <h1 className="text-2xl font-bold tracking-wide">API Server</h1>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="pt-4 space-y-4"
            >
              <fieldset className="space-y-2">
                <label
                  htmlFor="api-server-host"
                  className="block whitespace-nowrap"
                >
                  IP Address
                </label>
                <input
                  type="text"
                  name="api-server-host"
                  id="api-server-host"
                  className="w-full p-2 mt-1 bg-gray-600 rounded-lg form-input focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
                  placeholder="192.168.50.99"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      api: { ...settings.api, host: e.target.value },
                    })
                  }
                  value={settings.api.host}
                />
              </fieldset>
              <fieldset className="space-y-2">
                <label
                  htmlFor="api-server-port"
                  className="block whitespace-nowrap"
                >
                  Port
                </label>
                <input
                  type="text"
                  name="api-server-port"
                  id="api-server-port"
                  className="w-full p-2 mt-1 bg-gray-600 rounded-lg form-input focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
                  placeholder="8000"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      api: { ...settings.api, port: e.target.value },
                    })
                  }
                  value={settings.api.port}
                />
              </fieldset>
            </form>
          </section>
          <section className="p-4 mt-4 bg-gray-800 rounded-xl">
            <h1 className="text-2xl font-bold tracking-wide">Label Printer</h1>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="pt-4 space-y-4"
            ></form>
          </section>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center p-4 mt-4 space-x-4 bg-gray-800 rounded-xl"
          >
            <label
              htmlFor="home-page-select"
              className="text-2xl font-bold tracking-wide whitespace-nowrap"
            >
              Home Page
            </label>
            <select
              name="home-page-select"
              id="home-page-select"
              className="w-full p-2 px-4 text-center bg-gray-600 rounded-lg form-select focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
              onChange={(e) =>
                setSettings({ ...settings, home: e.target.value })
              }
              value={settings.home}
            >
              <option value="DASHBOARD">Dashboard</option>
              <option value="RECENT">Recent Sales</option>
              <option value="INVENTORY">Inventory</option>
              <option value="NOTIFICATIONS">Notifications</option>
            </select>
          </form>
          <section className="flex items-center mt-4 space-x-2">
            <button
              type="button"
              className="flex items-center justify-center w-1/2 p-2 space-x-2 text-base bg-gray-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-1/2 p-2 space-x-2 text-base bg-green-600 rounded-lg"
              onClick={saveSettings}
            >
              Save
            </button>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Settings;
