import { atom } from "recoil";

const storedSettings = window.localStorage.getItem("app-settings");

const settingsState = atom({
  key: "settingsState",
  default: storedSettings
    ? JSON.parse(storedSettings)
    : {
        pages: {
          dashboard: true,
          recent: true,
          inventory: true,
          notifications: true,
        },
        notifications: {
          board: true,
          phone: true,
        },
        api: {
          host: "192.168.50.99",
          port: 8000,
        },
        home: "DASHBOARD",
      },
});

export { settingsState };
