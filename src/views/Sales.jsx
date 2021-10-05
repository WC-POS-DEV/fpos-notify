import React, { useEffect, useState } from "react";

import {
  ArrowLeftIcon,
  ClipboardIcon,
  CloseIcon,
  HomeIcon,
  MailIcon,
  MessageIcon,
  MonitorIcon,
  RefreshIcon,
  SmartphoneIcon,
  UserIcon,
} from "@iconicicons/react";
import { useRecoilValue } from "recoil";

import { settingsState } from "../recoil/atoms";
import useNotify from "../hooks/useNotify";

const ReceiptItem = (props) => {
  return (
    <>
      {props.item.isSeat ? (
        <div className="bg-blue-600 p-2 rounded-lg">
          Seat {props.item.basePrice}
        </div>
      ) : (
        <div className={`px-2 ${props.item.isModifier ? "ml-4" : ""}`}>
          {props.item.receiptDescription}
        </div>
      )}
    </>
  );
};

const BoardConfirm = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const send = () => {
    props.send();
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {isOpen && (
        <div className="absolute bottom-0 mb-12 bg-gray-700 rounded-lg shadow-lg w-full p-2 flex items-center space-x-2">
          <button
            type="button"
            className="w-full bg-gray-600 rounded-lg px-2 py-1 text-base"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-full bg-green-600 rounded-lg px-2 py-1 text-base"
            onClick={send}
          >
            Send
          </button>
        </div>
      )}
      <button
        type="button"
        className="w-full text-base bg-blue-600 rounded-lg p-2 flex items-center justify-center space-x-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MonitorIcon className="h-6 w-6" />
        <span>Board Notification</span>
      </button>
    </div>
  );
};

const PhoneConfirm = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [currentPhone, setCurrentPhone] = useState("");

  useEffect(() => {
    setCurrentPhone(props.phone === null ? "" : props.phone);
  }, [props.phone]);

  const backspace = () => {
    setCurrentPhone(currentPhone.slice(0, -1));
  };

  const clear = () => {
    setCurrentPhone("");
  };

  const send = () => {
    props.send(currentPhone);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      {isOpen && (
        <div className="absolute bottom-0 mb-12 bg-gray-700 rounded-lg shadow-lg w-full p-2 space-y-2">
          <div className="p-2 h-11 bg-gray-600 rounded-lg text-lg font-bold text-center">
            {currentPhone}
          </div>
          <div className="grid grid-cols-3 gap-2 text-base">
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={() => setCurrentPhone(currentPhone + "1")}
            >
              1
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={() => setCurrentPhone(currentPhone + "2")}
            >
              2
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={() => setCurrentPhone(currentPhone + "3")}
            >
              3
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={() => setCurrentPhone(currentPhone + "4")}
            >
              4
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={() => setCurrentPhone(currentPhone + "5")}
            >
              5
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={() => setCurrentPhone(currentPhone + "6")}
            >
              6
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={() => setCurrentPhone(currentPhone + "7")}
            >
              7
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={() => setCurrentPhone(currentPhone + "8")}
            >
              8
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={() => setCurrentPhone(currentPhone + "9")}
            >
              9
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 flex justify-center rounded-lg"
              onClick={backspace}
            >
              <ArrowLeftIcon className="w-6" />
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={() => setCurrentPhone(currentPhone + "0")}
            >
              0
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 flex justify-center rounded-lg"
              onClick={clear}
            >
              <CloseIcon className="w-6" />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="w-full bg-gray-600 rounded-lg px-2 py-1 text-base"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="w-full bg-green-600 rounded-lg px-2 py-1 text-base"
              onClick={send}
            >
              Send
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        className="w-full text-base bg-green-600 focus:ring-green-600 rounded-lg p-2 flex items-center justify-center space-x-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <SmartphoneIcon className="h-6 w-6" />
        <span>Phone Notification</span>
      </button>
    </div>
  );
};

const SaleItem = (props) => {
  return (
    <div
      className="p-2 flex items-center hover:bg-gray-900 rounded-xl cursor-pointer"
      onClick={() => props.handleClick(props.sale)}
    >
      <p className="w-1/6">{props.sale.ticketNumber}</p>
      <p className="w-1/2">
        {props.sale.firstName || props.sale.lastName
          ? `${props.sale.firstName} ${props.sale.lastName}`
          : props.sale.checkDescription}
      </p>
      <p className="w-1/6">
        ${Math.floor(props.sale.total / 100)}
        <span className="text-xs">.{props.sale.total % 100}</span>
      </p>
      <p className="w-1/6 text-right text-sm">
        <span className="px-2 py-1 rounded-lg bg-green-600 whitespace-nowrap">
          {props.sale.orderType}
        </span>
      </p>
    </div>
  );
};

const SaleDetails = (props) => {
  const [sale, setSale] = useState(null);
  const settings = useRecoilValue(settingsState);
  const { sendBoardNotif, sendPhoneNotif } = useNotify();

  const getSale = async () => {
    setSale({
      ...(await (
        await fetch(
          `http://${settings.api.host}:${settings.api.port}/fpos/sale/id/${props.saleID}/`
        )
      ).json()),
      items: await (
        await fetch(
          `http://${settings.api.host}:${settings.api.port}/fpos/sale/id/${props.saleID}/items/`
        )
      ).json(),
    });
  };

  useEffect(async () => {
    props.saleID ? await getSale() : setSale(null);
  }, [props.saleID]);

  const handleBoardSend = async () => {
    await sendBoardNotif(settings.api.host, settings.api.port, sale.saleId);
  };

  const handlePhoneSend = async (phone) => {
    if (settings.notifications.board) {
      await sendBoardNotif(settings.api.host, settings.api.port, sale.saleId);
    }
    await sendPhoneNotif(
      settings.api.host,
      settings.api.port,
      sale.saleId,
      phone
    );
  };

  return (
    <>
      {sale && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-wide space-x-4 flex items-center">
              <span>Ticket #{sale.ticketNumber}</span>
              <span className="px-2 py-1 text-base rounded-lg bg-green-600">
                {sale.orderType}
              </span>
            </h1>
            <button type="button" onClick={props.handleClear}>
              <CloseIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex items-center justify-between bg-gray-900 shadow-lg p-4 rounded-xl">
            <div className="flex items-center space-x-2 w-1/2">
              <UserIcon className="h-6 w-6" />
              <h2>
                {sale.customerNumber
                  ? `${sale.firstName} ${sale.lastName}`
                  : sale.checkDescription}
              </h2>
            </div>
            <div className="flex items-center space-x-2 w-1/2">
              <SmartphoneIcon className="h-6 w-6" />
              <h2>
                {sale.customerNumber
                  ? `(${sale.phone.substring(0, 3)}) ${sale.phone.substring(
                      3,
                      6
                    )}-${sale.phone.substring(6)}`
                  : ""}
              </h2>
            </div>
          </div>
          <div className="flex-grow bg-gray-900 rounded-xl p-2 space-y-1 overflow-y-auto hide-scroll">
            {sale.items.map((item, index) => (
              <ReceiptItem item={item} key={index} />
            ))}
          </div>
          {(sale.webLastName ||
            sale.webPhone ||
            sale.mozartOrderNumber ||
            sale.webComment) && (
            <div className="p-2 space-y-1 bg-gray-900 rounded-xl">
              {sale.webLastName && (
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-6 w-6" />
                  <p>{sale.webLastName}</p>
                </div>
              )}
              {sale.webPhone && (
                <div className="flex items-center space-x-2">
                  <SmartphoneIcon />
                  <p>
                    {`(${sale.webPhone.substring(
                      0,
                      3
                    )}) ${sale.webPhone.substring(
                      3,
                      6
                    )}-${sale.webPhone.substring(6)}`}
                  </p>
                </div>
              )}
              {sale.mozartOrderNumber && (
                <div className="flex items-center space-x-2">
                  <ClipboardIcon />
                  <p>{sale.mozartOrderNumber}</p>
                </div>
              )}
              {sale.webComment && (
                <div className="flex items-center space-x-2">
                  <MessageIcon />
                  <p>{sale.webComment}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center space-x-4">
            {settings.notifications.board && (
              <BoardConfirm send={handleBoardSend} />
            )}
            {settings.notifications.phone && (
              <PhoneConfirm
                phone={sale.webPhone ? sale.webPhone : sale.phone}
                send={handlePhoneSend}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

const Sales = () => {
  const [currentSale, setCurrentSale] = useState(null);
  const [saleList, setSaleList] = useState([]);
  const settings = useRecoilValue(settingsState);

  const getSales = async () => {
    let sales = await (
      await fetch(
        `http://${settings.api.host}:${settings.api.port}/fpos/sales/recent/`
      )
    ).json();
    setSaleList(sales);
  };

  const refreshSales = async () => {
    setCurrentSale(null);
    await getSales();
  };

  useEffect(async () => {
    try {
      await getSales();
    } catch (err) {
      console.error(err);
      setSaleList([]);
    }
  }, []);

  return (
    <main className="flex h-screen w-full">
      <section className="w-1/2 p-4 space-y-4 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">Recent Sales</h1>
          <button
            type="button"
            className="p-2 rounded-lg"
            onClick={refreshSales}
          >
            <RefreshIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 bg-green-600 rounded-xl flex items-center font-bold shadow-lg">
          <h2 className="w-1/6">Ticket</h2>
          <h2 className="w-1/2">Customer</h2>
          <h2 className="w-1/6">Total</h2>
          <h2 className="w-1/6 text-right">Type</h2>
        </div>
        <div className="p-2 bg-gray-800 overflow-y-auto hide-scroll rounded-xl flex-grow">
          {Array.isArray(saleList) && (
            <>
              {saleList.map((sale) => (
                <SaleItem
                  sale={sale}
                  key={sale.saleId}
                  handleClick={(sale) => setCurrentSale(sale)}
                />
              ))}
            </>
          )}
        </div>
      </section>
      <section className="w-1/2 bg-gray-800 p-4 space-y-4 h-full flex flex-col">
        {currentSale ? (
          <SaleDetails
            saleID={currentSale.saleId}
            handleClear={() => setCurrentSale(null)}
          />
        ) : (
          <></>
        )}
      </section>
    </main>
  );
};

export default Sales;
