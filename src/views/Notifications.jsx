import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

import { MonitorIcon, RefreshIcon, SmartphoneIcon } from "@iconicicons/react";

import useNotify from "../hooks/useNotify";

const InProgressItem = (props) => {
  return (
    <div className="flex items-center space-x-2 px-2 py-1 w-full">
      <h3 className="w-1/6">{props.sale.TicketNumber}</h3>
      <p className="w-1/2">
        {props.sale.FirstName || props.sale.LastName
          ? `${props.sale.FirstName} ${props.sale.LastName}`
          : props.sale.CheckDescription}
      </p>
      <div className="w-1/3 flex items-center justify-end space-x-2">
        {(props.sale.Phone || props.sale.WebPhone) && (
          <button
            type="button"
            className="text-base bg-green-600 rounded-lg py-1 px-4 flex items-center justify-center space-x-2 focus:ring-green-600"
            onClick={() =>
              props.sendPhone(
                props.sale.SaleID,
                props.sale.WebPhone ? props.sale.WebPhone : props.sale.Phone
              )
            }
          >
            <SmartphoneIcon className="h-6 w-6" />
          </button>
        )}
        <button
          type="button"
          className="text-base bg-blue-600 rounded-lg py-1 px-4 flex items-center justify-center space-x-2"
          onClick={() => props.sendBoard(props.sale.SaleID)}
        >
          <MonitorIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

const NotifItem = (props) => {
  return (
    <div className="flex items-center space-x-2 px-2 py-1 w-full">
      <p className="w-1/6">{props.notif.TicketNumber}</p>
      <p className="w-2/3">{props.notif.CheckDescription}</p>
      <div className="w-1/6 flex items-center justify-end">
        {props.notif.NotifType === "BOARD" ? (
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

  const filterNotifs = () => {
    if (notifs.Notifications) {
      let filtered = notifs.Notifications.filter((notif) => {
        return notifFilter === "ALL" || notifFilter === notif.NotifType;
      });
      filtered.sort((a, b) => b.TicketNumber - a.TicketNumber);

      setFilteredNotifs(filtered);
    } else {
      setFilteredNotifs([]);
    }
  };

  const handleSendBoard = async (saleID, index) => {
    let notif = await sendBoardNotif(saleID);
    if (notif) {
      let inProgressCopy = [...notifs.InProgress];
      inProgressCopy.splice(index, 1);
      setNotifs({
        InProgress: inProgressCopy,
        Notifications: [...notifs.Notifications, notif],
      });
    }
  };

  const handleSendPhone = async (saleID, phone, index) => {
    let notif = await sendPhoneNotif(saleID, phone);
    if (notif) {
      let inProgressCopy = [...notifs.InProgress];
      inProgressCopy.splice(index, 1);
      if (notif.Board && notif.Phone) {
        setNotifs({
          InProgress: inProgressCopy,
          Notifications: [...notifs.Notifications, notif.Board, notif.Phone],
        });
      } else if (notif.Board) {
        setNotifs({
          InProgress: inProgressCopy,
          Notifications: [...notifs.Notifications, notif.Board],
        });
      } else if (notif.Board) {
        setNotifs({
          InProgress: inProgressCopy,
          Notifications: [...notifs.Notifications, notif.Phone],
        });
      }
    }
  };

  const getNotifs = async () => {
    let notificationsRes = await fetch("http://192.168.1.86:8000/fpos/board/");
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
          {notifs.InProgress && (
            <>
              {notifs.InProgress.map((notif, index) => (
                <InProgressItem
                  key={notif.SaleID}
                  sale={notif}
                  sendBoard={(saleID) => handleSendBoard(saleID, index)}
                  sendPhone={(saleID, phone) =>
                    handleSendPhone(saleID, phone, index)
                  }
                />
              ))}
            </>
          )}
        </div>
      </div>
      <div className="w-1/2 p-4 flex flex-col space-y-4 bg-gray-800">
        <div className="flex items-center justify-between pb-1">
          <h1 className="text-2xl font-bold tracking-wide">Ready</h1>
          <select
            name="notif-filter"
            id="notif-filter"
            className="form-select text-center rounded-lg bg-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
            defaultValue="ALL"
            onChange={(e) => setNotifFilter(e.target.value)}
          >
            <option value="ALL">All</option>
            <option value="BOARD">Board</option>
            <option value="PHONE">Phone</option>
          </select>
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
