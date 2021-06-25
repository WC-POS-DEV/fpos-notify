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
    <main className="h-screen w-full p-4">
      <section className="w-full flex items-center justify-between">
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
          <section className="p-4 mt-4 rounded-xl bg-gray-800">
            <h1 className="text-2xl font-bold tracking-wide">Pages</h1>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4 pt-4"
            >
              <fieldset className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="dashboard-enable"
                  id="dashboard-enable"
                  className="form-checkbox rounded-full h-8 w-8 text-green-600 focus:ring-offset-gray-800 focus:ring-green-600"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      pages: { ...settings.pages, dashboard: e.target.checked },
                    })
                  }
                  checked={settings.pages.dashboard}
                />
                <label htmlFor="dashboard-enable" className="text-lg">
                  Dashboard Page
                </label>
              </fieldset>
              <fieldset className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="recent-sales-enable"
                  id="recent-sales-enable"
                  className="form-checkbox rounded-full h-8 w-8 text-green-600 focus:ring-offset-gray-800 focus:ring-green-600"
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
                  className="form-checkbox rounded-full h-8 w-8 text-green-600 focus:ring-offset-gray-800 focus:ring-green-600"
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      pages: { ...settings.pages, inventory: e.target.checked },
                    })
                  }
                  checked={settings.pages.inventory}
                />
                <label htmlFor="inventory-enable" className="text-lg">
                  Inventory Page
                </label>
              </fieldset>
              <fieldset className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="notifications-enable"
                  id="notifications-enable"
                  className="form-checkbox rounded-full h-8 w-8 text-green-600 focus:ring-offset-gray-800 focus:ring-green-600"
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
                  Notifications Page
                </label>
              </fieldset>
            </form>
          </section>
          <section className="p-4 mt-4 rounded-xl bg-gray-800">
            <h1 className="text-2xl font-bold tracking-wide">Notifications</h1>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4 pt-4"
            >
              <fieldset className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="board-notifications-enable"
                  id="board-notifications-enable"
                  className="form-checkbox rounded-full h-8 w-8 text-green-600 focus:ring-offset-gray-800 focus:ring-green-600"
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
                  className="form-checkbox rounded-full h-8 w-8 text-green-600 focus:ring-offset-gray-800 focus:ring-green-600"
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
          <section className="p-4 mt-4 rounded-xl bg-gray-800">
            <h1 className="text-2xl font-bold tracking-wide">API Server</h1>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4 pt-4"
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
                  className="form-input w-full rounded-lg bg-gray-600 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
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
                  className="form-input w-full rounded-lg bg-gray-600 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
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
          <form
            onSubmit={(e) => e.preventDefault()}
            className="p-4 mt-4 rounded-xl bg-gray-800 flex items-center space-x-4"
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
              className="form-select w-full text-center rounded-lg bg-gray-600 p-2 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
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
          <section className="flex items-center space-x-2 mt-4">
            <button
              type="button"
              className="w-1/2 text-base bg-gray-800 rounded-lg p-2 flex items-center justify-center space-x-2"
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-1/2 text-base bg-green-600 rounded-lg p-2 flex items-center justify-center space-x-2"
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
