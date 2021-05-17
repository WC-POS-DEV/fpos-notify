import React, { useEffect, useState } from "react";

import {
  ArrowLeftIcon,
  CloseIcon,
  MonitorIcon,
  RefreshIcon,
  SmartphoneIcon,
  UserIcon,
} from "@iconicicons/react";

const ReceiptItem = (props) => {
  return (
    <>
      {props.item.IsSeat ? (
        <div className="bg-blue-600 p-2 rounded-lg">
          Seat {props.item.BasePrice}
        </div>
      ) : (
        <div className={`px-2 ${props.item.IsModifier ? "ml-4" : ""}`}>
          {props.item.ReceiptDescription}
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

  // useEffect(() => {
  //   setCurrentPhone(currentPhone.slice(0, 10));
  // }, [currentPhone]);

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
              onClick={(e) => setCurrentPhone(currentPhone + "1")}
            >
              1
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={(e) => setCurrentPhone(currentPhone + "2")}
            >
              2
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={(e) => setCurrentPhone(currentPhone + "3")}
            >
              3
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={(e) => setCurrentPhone(currentPhone + "4")}
            >
              4
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={(e) => setCurrentPhone(currentPhone + "5")}
            >
              5
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={(e) => setCurrentPhone(currentPhone + "6")}
            >
              6
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={(e) => setCurrentPhone(currentPhone + "7")}
            >
              7
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={(e) => setCurrentPhone(currentPhone + "8")}
            >
              8
            </button>
            <button
              type="button"
              className="w-full bg-gray-600 p-2 text-center rounded-lg"
              onClick={(e) => setCurrentPhone(currentPhone + "9")}
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
              onClick={(e) => setCurrentPhone(currentPhone + "0")}
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
      <p className="w-1/6">{props.sale.TicketNumber}</p>
      <p className="w-1/2">
        {props.sale.CustomerEntered
          ? `${props.sale.FirstName} ${props.sale.LastName}`
          : props.sale.CheckDescription}
      </p>
      <p className="w-1/6">
        ${Math.floor(props.sale.Total / 100)}
        <span className="text-xs">.{props.sale.Total % 100}</span>
      </p>
      <p className="w-1/6 text-right text-sm">
        <span className="px-2 py-1 rounded-lg bg-green-600 whitespace-nowrap">
          {props.sale.OrderType}
        </span>
      </p>
    </div>
  );
};

const SaleDetails = (props) => {
  const [sale, setSale] = useState(null);

  const getSale = async () => {
    setSale(
      await (
        await fetch(`http://192.168.1.11:8000/fpos/sale/id/${props.saleID}/`)
      ).json()
    );
  };

  useEffect(async () => {
    props.saleID ? await getSale() : setSale(null);
  }, [props.saleID]);

  const sendBoardNotif = async () => {
    try {
      await fetch(`http://192.168.1.11:8000/fpos/notify/${props.saleID}/`);
    } catch (err) {
      console.error(err);
    }
  };

  const sendPhoneNotif = async (phone) => {
    try {
      let phoneRes = await fetch(
        `http://192.168.1.11:8000/fpos/phone/${props.saleID}/${phone}/`
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {sale && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-wide space-x-4 flex items-center">
              <span>Ticket #{sale.TicketNumber}</span>
              <span className="px-2 py-1 text-base rounded-lg bg-green-600">
                {sale.OrderType}
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
                {sale.CustomerNumber
                  ? `${sale.FirstName} ${sale.LastName}`
                  : sale.CheckDescription}
              </h2>
            </div>
            <div className="flex items-center space-x-2 w-1/2">
              <SmartphoneIcon className="h-6 w-6" />
              <h2>
                {sale.CustomerNumber
                  ? `(${sale.Phone.substring(0, 3)}) ${sale.Phone.substring(
                      3,
                      6
                    )}-${sale.Phone.substring(6)}`
                  : ""}
              </h2>
            </div>
          </div>
          <div className="flex-grow bg-gray-900 rounded-xl p-2 space-y-1 overflow-y-auto">
            {sale.Items.map((item, index) => (
              <ReceiptItem item={item} key={index} />
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <BoardConfirm send={sendBoardNotif} />
            <PhoneConfirm phone={sale.Phone} send={sendPhoneNotif} />
          </div>
        </>
      )}
    </>
  );
};

const Sales = () => {
  const [currentSale, setCurrentSale] = useState(null);
  const [saleList, setSaleList] = useState([]);

  const getSales = async () => {
    let sales = await (
      await fetch("http://192.168.1.11:8000/fpos/recent/")
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
          <button type="button" className="p-2" onClick={refreshSales}>
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
                  key={sale.SaleID}
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
            saleID={currentSale.SaleID}
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
