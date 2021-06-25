import React, { useEffect, useState } from "react";

import { MonitorIcon, RefreshIcon, SmartphoneIcon } from "@iconicicons/react";
import { useRecoilValue } from "recoil";

import useNotify from "../hooks/useNotify";
import { settingsState } from "../recoil/atoms";

const InProgressItem = (props) => {
  const settings = useRecoilValue(settingsState);

  return (
    <div className="flex items-center space-x-2 px-2 py-1 w-full">
      <h3 className="w-1/6">{props.sale.ticketNumber}</h3>
      <p className="w-1/2">
        {props.sale.fistName || props.sale.lastName
          ? `${props.sale.fistName ? props.sale.firstName + " " : ""}${
              props.sale.lastName ? props.sale.lastName : ""
            }`
          : props.sale.checkDescription}
      </p>
      <div className="w-1/3 flex items-center justify-end space-x-2">
        {(props.sale.phone || props.sale.webPhone) &&
          settings.notifications.phone && (
            <button
              type="button"
              className="text-base bg-green-600 rounded-lg py-1 px-4 flex items-center justify-center space-x-2 focus:ring-green-600"
              onClick={() =>
                props.sendphone(
                  props.sale.saleId,
                  props.sale.webPhone ? props.sale.webPhone : props.sale.phone
                )
              }
            >
              <SmartphoneIcon className="h-6 w-6" />
            </button>
          )}
        {settings.notifications.board && (
          <button
            type="button"
            className="text-base bg-blue-600 rounded-lg py-1 px-4 flex items-center justify-center space-x-2"
            onClick={() => props.sendBoard(props.sale.saleId)}
          >
            <MonitorIcon className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
};

const NotifItem = (props) => {
  return (
    <div className="flex items-center space-x-2 px-2 py-1 w-full">
      <p className="w-1/6">{props.notif.ticketNumber}</p>
      <p className="w-2/3">{props.notif.checkDescription}</p>
      <div className="w-1/6 flex items-center justify-end">
        {props.notif.type === "BOARD" ? (
          <MonitorIcon className="h-6 w-6" />
        ) : (
          <SmartphoneIcon className="h-6 w-6" />
        )}
      </div>
    </div>
  );
};

const Notifications = () => {
  const [notifs, setNotifs] = useState({});
  const [filteredNotifs, setFilteredNotifs] = useState([]);
  const [notifFilter, setNotifFilter] = useState("ALL");
  const { sendBoardNotif, sendPhoneNotif } = useNotify();
  const settings = useRecoilValue(settingsState);

  const filterNotifs = () => {
    if (notifs.notifications) {
      let filtered = notifs.notifications.filter((notif) => {
        return (
          (notifFilter === "ALL" || notifFilter === notif.type) &&
          ((notif.type === "BOARD" && settings.notifications.board) ||
            (notif.type === "PHONE" && settings.notifications.phone))
        );
      });
      filtered.sort((a, b) => b.ticketNumber - a.ticketNumber);

      setFilteredNotifs(filtered);
    } else {
      setFilteredNotifs([]);
    }
  };

  const handleSendBoard = async (saleId) => {
    let notif = await sendBoardNotif(
      settings.api.host,
      settings.api.port,
      saleId
    );
    if (notif) {
      getNotifs();
    }
  };

  const handleSendPhone = async (saleId, phone) => {
    let notif = await sendPhoneNotif(
      settings.api.host,
      settings.api.port,
      saleId,
      phone
    );
    if (notif) {
      await getNotifs();
    }
    if (settings.notifications.board) {
      await sendBoardNotif(settings.api.host, settings.api.port, saleId);
    }
  };

  const getNotifs = async () => {
    let notificationsRes = await fetch(
      `http://${settings.api.host}:${settings.api.port}/fpos/board/`
    );
    setNotifs(await notificationsRes.json());
  };

  useEffect(() => {
    filterNotifs();
  }, [notifFilter, notifs]);

  useEffect(async () => {
    await getNotifs();
  }, []);

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/2 p-4 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">In Progress</h1>
          <button type="button" className="p-2 rounded-lg" onClick={getNotifs}>
            <RefreshIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 bg-green-600 rounded-xl flex items-center font-bold shadow-lg">
          <h2 className="w-1/6">Ticket</h2>
          <h2 className="w-1/2">Customer</h2>
          <h2 className="w-1/3 text-right">Actions</h2>
        </div>
        <div className="p-2 bg-gray-800 rounded-xl flex-grow overflow-y-auto hide-scroll">
          {notifs.inProgress && (
            <>
              {notifs.inProgress.map((notif) => (
                <InProgressItem
                  key={notif.saleId}
                  sale={notif}
                  sendBoard={(saleId) => handleSendBoard(saleId)}
                  sendphone={(saleId, phone) => handleSendPhone(saleId, phone)}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="w-1/2 p-4 flex flex-col space-y-4 bg-gray-800">
        <div className="flex items-center justify-between pb-1">
          <h1 className="text-2xl font-bold tracking-wide">Ready</h1>
          {settings.notifications.board && settings.notifications.phone && (
            <select
              name="notif-filter"
              id="notif-filter"
              className="form-select text-center rounded-lg bg-gray-600 p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
              defaultValue="ALL"
              onChange={(e) => setNotifFilter(e.target.value)}
            >
              <option value="ALL">All</option>
              <option value="BOARD">Board</option>
              <option value="phone">PHONE</option>
            </select>
          )}
        </div>
        <div className="p-4 bg-green-600 rounded-xl flex items-center font-bold shadow-lg">
          <h2 className="w-1/6">Ticket</h2>
          <h2 className="w-2/3">Description</h2>
          <h2 className="w-1/6 text-right">Type</h2>
        </div>
        <div className="flex-grow overflow-y-auto hide-scroll p-2 bg-gray-900 rounded-xl">
          {filteredNotifs.map((notif) => (
            <NotifItem key={notif.id} notif={notif} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
