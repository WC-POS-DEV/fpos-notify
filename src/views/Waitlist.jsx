import React, { useEffect, useState } from "react";

import {
  add,
  compareAsc,
  format,
  formatDistanceToNow,
  parseISO,
} from "date-fns";
import {
  ClockIcon,
  CloseIcon,
  FileIcon,
  GridIcon,
  MessageIcon,
  MinusIcon,
  RefreshIcon,
  PlusIcon,
  SmartphoneIcon,
  SpinnerIcon,
  TableRowsIcon,
} from "@iconicicons/react";
import { useRecoilValue } from "recoil";

import { settingsState } from "../recoil/atoms";

const Table = (props) => {
  let classes = [
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "space-y-1",
    "absolute",
  ];
  switch (props.table.shapeType) {
    case 0: // Small Circle
      classes.push("h-12", "w-12", "rounded-full", "bg-gray-800");
      break;
    case 1: // Large Circle
      classes.push("h-24", "w-24", "rounded-full", "bg-gray-800");
      break;
    case 2: // Small Diamond
      classes.push(
        "h-diamond-sm",
        "w-diamond-sm",
        "rounded-lg",
        "transform",
        "rotate-45",
        "bg-gray-800"
      );
      break;
    case 3: // Large Diamond
      classes.push(
        "h-diamond-lg",
        "w-diamond-lg",
        "rounded-lg",
        "transform",
        "rotate-45",
        "bg-gray-800"
      );
      break;
    case 4: // Small LR Rectangle
      classes.push("h-12", "w-18", "rounded-lg", "bg-gray-800");
      break;
    case 5: // Large LR Rectangle
      classes.push("h-12", "w-24", "rounded-lg", "bg-gray-800");
      break;
    case 6: // Small UD Rectangle
      classes.push("h-18", "w-12", "rounded-lg", "bg-gray-800");
      break;
    case 7: // Large UD Rectangle
      classes.push("h-24", "w-12", "rounded-lg", "bg-gray-800");
      break;
    case 8: // Small Square
      classes.push("h-12", "w-12", "rounded-lg", "bg-gray-800");
      break;
    case 9: // Large Square
      classes.push("h-24", "w-24", "rounded-lg", "bg-gray-800");
      break;
    case 10: // Pool UD Rectangle
      classes.push("h-18", "w-12", "rounded-lg", "bg-green-700");
      break;
    case 11: // Pool LR Rectangle
      classes.push("h-12", "w-18", "rounded-lg", "bg-green-700");
      break;
    default:
      classes.push("h-12", "w-12", "bg-red-700");
      break;
  }

  if (props.table.saleId && props.table.shapeType < 10) {
    classes.push("border-2", "border-blue-600", "filter", "brightness-75");
  } else if (props.table.saleId && props.table.shapeType > 9) {
    classes.push("border-2", "border-gray-800", "filter", "brightness-75");
  } else {
    classes.push("shadow");
  }
  return (
    <div
      className={`${classes.join(" ")}`}
      style={{ left: props.table.x, top: props.table.y }}
    >
      <div
        className={`text-xs ${
          props.table.shapeType === 2 || props.table.shapeType === 3
            ? "transform -rotate-45"
            : ""
        } `}
      >
        <p className="whitespace-nowrap">{props.table.tableName}</p>
        {props.table.saleId && (
          <>
            <p className="whitespace-nowrap text-center">
              {props.table.checkNumber}
            </p>
            <p className="whitespace-nowrap text-center">{props.table.age}m</p>
          </>
        )}
      </div>
    </div>
  );
};

const TableGrid = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [filteredTables, setFilteredTables] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [tables, setTables] = useState([]);
  const settings = useRecoilValue(settingsState);

  const getTables = async () => {
    let tableRes = await fetch(
      `http://${settings.api.host}:${settings.api.port}/fpos/tables/`
    );
    let tablesArray = await tableRes.json();
    let roomsArray = tablesArray.reduce((acc, current) => {
      acc[current.roomIndex] = {
        id: current.layoutRoomId,
        name: current.roomName,
      };
      return acc;
    }, []);

    setRooms(roomsArray);
    setTables(tablesArray);

    let currentRoomIndex;
    if (currentRoom === null) {
      currentRoomIndex = roomsArray.findIndex((room) => room !== undefined);
      setCurrentRoom(currentRoomIndex);
    } else {
      currentRoomIndex = currentRoom;
    }

    setFilteredTables(
      tablesArray.filter(
        (table) => table.layoutRoomId === roomsArray[currentRoomIndex].id
      )
    );
  };

  useEffect(async () => {
    if (props.isOpen) {
      setIsLoading(true);
      await getTables();
      setIsLoading(false);
    }
  }, [props.isOpen]);

  useEffect(() => {
    setFilteredTables(
      tables.filter((table) => table.layoutRoomId === rooms[currentRoom].id)
    );
  }, [currentRoom]);

  return (
    <>
      {props.isOpen && (
        <div className="fixed flex items-center justify-center inset-0 bg-gray-800 bg-opacity-90 p-8">
          <div className="ml-24 h-full w-full bg-gray-700 rounded-xl shadow-lg border-4 border-blue-600 overflow-hidden relative">
            {isLoading ? (
              <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20">
                <SpinnerIcon className="w-20 h-20 animate-spin" />
              </div>
            ) : (
              <div className="h-full mt-2">
                <div className="flex pl-4 pr-20">
                  <div className="w-full flex bg-gray-800 px-4 py-2 space-x-4 overflow-x-scroll hide-scroll rounded-lg">
                    <h2 className="font-bold tracking-wide text-xl pr-4 border-r-2 border-gray-400 px-4 flex items-center text-center">
                      Rooms
                    </h2>
                    {rooms.map((room, index) => {
                      return (
                        <button
                          className={`block p-2 rounded-lg whitespace-nowrap text-base ${
                            currentRoom === index ? "bg-blue-600" : ""
                          }`}
                          type="button"
                          key={room.id}
                          onClick={() => setCurrentRoom(index)}
                        >
                          {room.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="h-full p-4 overflow-scroll hide-scroll">
                  <div className="h-full relative mb-24">
                    {filteredTables.map((table) => {
                      return <Table table={table} key={table.layoutTableId} />;
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            className="absolute top-0 right-0 mt-12 mr-12 rounded-xl bg-gray-800 p-2"
            onClick={props.onClose}
          >
            <CloseIcon className="h-8 w-8" />
          </button>
          <button
            className="absolute top-0 right-0 mt-12 mr-12 rounded-xl bg-gray-800 p-2"
            onClick={props.onClose}
          >
            <CloseIcon className="h-8 w-8" />
          </button>
        </div>
      )}
    </>
  );
};

const TableList = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [filteredTables, setFilteredTables] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [tables, setTables] = useState([]);
  const settings = useRecoilValue(settingsState);

  const getTables = async () => {
    let tableRes = await fetch(
      `http://${settings.api.host}:${settings.api.port}/fpos/tables/`
    );
    let tablesArray = await tableRes.json();
    let roomsArray = tablesArray.reduce((acc, current) => {
      acc[current.roomIndex] = {
        id: current.layoutRoomId,
        name: current.roomName,
      };
      return acc;
    }, []);

    setRooms(roomsArray);
    setTables(tablesArray);

    let currentRoomIndex;
    if (currentRoom === null) {
      currentRoomIndex = roomsArray.findIndex((room) => room !== undefined);
      setCurrentRoom(currentRoomIndex);
    } else {
      currentRoomIndex = currentRoom;
    }

    setFilteredTables(
      tablesArray.filter(
        (table) => table.layoutRoomId === roomsArray[currentRoomIndex].id
      )
    );
  };

  useEffect(async () => {
    if (props.isOpen) {
      setIsLoading(true);
      await getTables();
      setIsLoading(false);
    }
  }, [props.isOpen]);

  useEffect(() => {
    setFilteredTables(
      tables.filter((table) => table.layoutRoomId === rooms[currentRoom].id)
    );
  }, [currentRoom]);

  return (
    <>
      {props.isOpen && (
        <div className="fixed flex items-center justify-center inset-0 bg-gray-800 bg-opacity-90 p-8">
          <div className="ml-24 h-full w-full bg-gray-700 rounded-xl shadow-lg border-4 border-blue-600 overflow-hidden relative">
            {isLoading ? (
              <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20">
                <SpinnerIcon className="w-20 h-20 animate-spin" />
              </div>
            ) : (
              <div className="flex space-x-4 h-full">
                <div className="h-full w-1/3 bg-gray-800 p-4 space-y-4 overflow-y-scroll hide-scroll">
                  <h2 className="font-bold tracking-wide text-xl pb-2 border-b-2 border-gray-400 px-4 text-center">
                    Rooms
                  </h2>
                  {rooms.map((room, index) => {
                    return (
                      <button
                        className={`block p-2 rounded-lg w-full whitespace-nowrap text-base ${
                          currentRoom === index ? "bg-blue-600" : ""
                        }`}
                        type="button"
                        key={room.id}
                        onClick={() => setCurrentRoom(index)}
                      >
                        {room.name}
                      </button>
                    );
                  })}
                </div>
                <div className="w-full overflow-y-auto hide-scroll">
                  <div className="w-full pr-20 py-4">
                    <div className="px-4 py-2 rounded-lg bg-gray-800 w-full flex items-center font-bold tracking-wide">
                      <h3 className="w-1/3">Table</h3>
                      <h3 className="w-1/3">Server</h3>
                      <h3 className="w-1/6 text-right">Guests</h3>
                      <h3 className="w-1/6 text-right">Age</h3>
                    </div>
                    <div className="">
                      {filteredTables.map((table, index) => {
                        return (
                          <div
                            className={`w-full flex items-center px-4 py-2 ${
                              index % 2 === 1 ? "bg-gray-600 rounded-lg" : ""
                            }`}
                            key={table.layoutTableId}
                          >
                            <p className="w-1/3">{table.tableName}</p>
                            <p className="w-1/3 truncate overflow-x-hidden">
                              {table.employeeName}
                            </p>
                            <p className="w-1/6 text-right">
                              {table.saleId ? (
                                <>
                                  {table.customerCount} / {table.seatCount}
                                </>
                              ) : (
                                <>
                                  <span className="text-blue-600 font-bold">
                                    &mdash;
                                  </span>
                                </>
                              )}
                            </p>
                            <p className="w-1/6 text-right">
                              {table.saleId ? (
                                <>{table.age}m</>
                              ) : (
                                <>
                                  <span className="text-blue-600 font-bold">
                                    &mdash;
                                  </span>
                                </>
                              )}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            className="absolute top-0 right-0 mt-12 mr-12 rounded-xl bg-gray-800 p-2"
            onClick={props.onClose}
          >
            <CloseIcon className="h-8 w-8" />
          </button>
        </div>
      )}
    </>
  );
};

const NewGuest = (props) => {
  const [guest, setGuest] = useState({
    name: "",
    phone: "",
    partySize: 2,
    quoteVal: 15,
    quoteUnit: "minutes",
  });
  const [isLoading, setIsLoading] = useState(false);
  const settings = useRecoilValue(settingsState);

  const resetGuest = () => {
    setGuest({
      name: "",
      phone: "",
      partySize: 2,
      quoteVal: 15,
      quoteUnit: "minutes",
    });
  };

  const validate = () => {
    return guest.name && guest.phone.length === 10;
  };

  const postGuest = async () => {
    if (validate()) {
      setIsLoading(true);
      let guestRes = await fetch(
        `http://${settings.api.host}:${settings.api.port}/waitlist/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName: guest.name,
            phoneNumber: guest.phone,
            partySize: guest.partySize,
            quoteTime: add(new Date(), { [guest.quoteUnit]: guest.quoteVal }),
          }),
        }
      );
      let guestObj = await guestRes.json();
      resetGuest();
      props.onAdd(guestObj);
      setIsLoading(false);
    }
  };

  const decrementPartySize = () => {
    if (guest.partySize > 1) {
      setGuest({ ...guest, partySize: (guest.partySize -= 1) });
    }
  };

  const incrementPartySize = () => {
    setGuest({ ...guest, partySize: (guest.partySize += 1) });
  };

  const decrementQuote = () => {
    if (guest.quoteVal > 1) {
      setGuest({ ...guest, quoteVal: (guest.quoteVal -= 1) });
    }
  };

  const incrementQuote = () => {
    setGuest({ ...guest, quoteVal: (guest.quoteVal += 1) });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
      <fieldset className="space-y-1">
        <label htmlFor="guest-name" className="block">
          Guest Name
        </label>
        <input
          type="text"
          id="guest-name"
          name="guest-name"
          className="form-input w-full rounded-lg bg-gray-600 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
          placeholder="Jane Doe"
          onChange={(e) => setGuest({ ...guest, name: e.target.value })}
          value={guest.name}
        />
      </fieldset>
      <div className="flex items-center space-x-2">
        <fieldset className="space-y-1">
          <label htmlFor="guest-phone" className="block">
            Guest Phone
          </label>
          <input
            type="text"
            id="guest-phone"
            name="guest-phone"
            className="form-input w-full rounded-lg bg-gray-600 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
            placeholder="7701234567"
            onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
            value={guest.phone}
          />
        </fieldset>
        <fieldset className="space-y-1">
          <label htmlFor="party-size" className="block">
            Party Size
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              min="1"
              name="party-size"
              id="party-size"
              className="form-input w-full rounded-lg bg-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
              onChange={(e) =>
                setGuest({ ...guest, partySize: e.target.value })
              }
              value={guest.partySize}
            />
            <button
              className=" bg-gray-600 rounded-lg px-2"
              type="button"
              onClick={decrementPartySize}
            >
              <MinusIcon className="h-6 w-6" />
            </button>
            <button
              className=" bg-blue-600 rounded-lg px-2"
              type="button"
              onClick={incrementPartySize}
            >
              <PlusIcon className="h-6 w-6" />
            </button>
          </div>
        </fieldset>
      </div>
      <fieldset className="space-y-1">
        <label htmlFor="quote-time">Quote Time</label>
        <div className="flex space-x-2">
          <input
            type="text"
            className="form-input w-full rounded-lg bg-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
            onChange={(e) => setGuest({ ...guest, quoteVal: e.target.value })}
            value={guest.quoteVal}
          />
          <select
            name="quote-unit"
            id="quote-unit"
            className="form-select text-center w-full rounded-lg bg-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
            onChange={(e) => setGuest({ ...guest, quoteUnit: e.target.value })}
            value={guest.quoteUnit}
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
          </select>
          <button
            className=" bg-gray-600 rounded-lg px-2"
            type="button"
            onClick={decrementQuote}
          >
            <MinusIcon className="h-6 w-6" />
          </button>
          <button
            className=" bg-blue-600 rounded-lg px-2"
            type="button"
            onClick={incrementQuote}
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
      </fieldset>
      <fieldset className="flex space-x-2 pt-2">
        <button className="bg-gray-600 rounded-lg p-2" onClick={resetGuest}>
          <RefreshIcon className="h-6 w-6" />
        </button>
        <button
          type="button"
          className="bg-blue-600 rounded-lg p-2 w-full flex items-center justify-center space-x-2 text-sm"
          disabled={isLoading}
          onClick={postGuest}
        >
          <FileIcon className="h-6 w-6" />
          <span>Save</span>
        </button>
      </fieldset>
    </form>
  );
};

const Guest = (props) => {
  let now = new Date();
  return (
    <div
      className={`w-full p-4 rounded-lg flex space-x-4 ${
        props.index % 2 === 1 ? "bg-gray-900" : ""
      }`}
    >
      <button className="p-1 rounded-lg border-2 border-blue-600 hover:bg-blue-600">
        <GridIcon />
      </button>
      <p className="w-1/2 flex items-center space-x-2">
        <span className="px-3 py-1 block bg-gray-600 rounded-lg font-bold">
          {props.guest.partySize}
        </span>
        <span className="whitespace-nowrap font-bold tracking-wide">
          {props.guest.customerName}
        </span>

        <span>
          {props.guest.status === "WAITING" ? (
            <ClockIcon />
          ) : (
            <SmartphoneIcon />
          )}
        </span>
      </p>
      <p
        className={`w-full flex items-center justify-end whitespace-nowrap ${
          parseISO(props.guest.quoteTime) < now ? "text-red-700" : ""
        }`}
      >
        {format(props.guest.quoteTime, "p")}
      </p>
      <button className="p-1 rounded-lg border-2 border-green-600 hover:bg-green-600 focus:ring-green-600">
        <MessageIcon />
      </button>
    </div>
  );
};

const Waitlist = () => {
  const [showTableGrid, setShowTableGrid] = useState(false);
  const [showTableList, setShowTableList] = useState(false);
  const [waitlist, setWaitlist] = useState([]);
  const settings = useRecoilValue(settingsState);

  useEffect(async () => {
    let waitlistRes = await fetch(
      `http://${settings.api.host}:${settings.api.port}/waitlist/`
    );
    let waitlistArray = await waitlistRes.json();
    waitlistArray = waitlistArray.map((guest) => {
      console.log(guest.quoteTime);
      return { ...guest, quoteTime: parseISO(guest.quoteTime) };
    });
    console.log(waitlistArray);
    waitlistArray.sort((a, b) => compareAsc(a.quoteTime, b.quoteTime));
    console.log(waitlistArray);
    setWaitlist(waitlistArray);
  }, []);

  const addGuest = (guest) => {
    console.log("added", guest);
    setWaitlist([
      ...waitlist,
      { ...guest, quoteTime: parseISO(guest.quoteTime) },
    ]);
  };

  return (
    <div className="flex h-screen w-full">
      <TableGrid
        isOpen={showTableGrid}
        onClose={() => setShowTableGrid(false)}
      />
      <TableList
        isOpen={showTableList}
        onClose={() => setShowTableList(false)}
      />
      <div className="w-1/2 p-4 flex flex-col space-y-4">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold tracking-wide">
            Currently Waiting
          </h1>
          <div className="flex space-x-2">
            <button
              type="button"
              className="p-2 rounded-lg"
              onClick={() => setShowTableGrid(true)}
            >
              <GridIcon className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="p-2 rounded-lg"
              onClick={() => setShowTableList(true)}
            >
              <TableRowsIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
        <div className="p-2 bg-gray-800 rounded-xl flex-grow overflow-y-auto hide-scroll">
          {waitlist.map((guest, index) => (
            <Guest guest={guest} index={index} key={guest.id} />
          ))}
        </div>
        <div className="p-2 space-y-2 bg-gray-800 rounded-xl overflow-y-auto hide-scroll">
          <div className="flex items-center justify-between font-bold tracking-wide text-lg">
            <h2>Avg Wait Time</h2>
            <h2>14m</h2>
          </div>
          <div className="flex items-center justify-between font-bold tracking-wide text-lg">
            <h2>Open Tables</h2>
            <h2>14 / 28</h2>
          </div>
          <div className="flex items-center justify-between font-bold tracking-wide text-lg">
            <h2>Messaged Guests</h2>
            <h2>4 / 20</h2>
          </div>
        </div>
      </div>
      <div className="w-1/2 p-4 flex flex-col space-y-4">
        <h1 className="text-2xl font-bold tracking-wide">New Guest</h1>
        <div className="p-4 bg-gray-800 rounded-xl overflow-y-auto hide-scroll">
          <NewGuest onAdd={addGuest} />
        </div>
        <h1 className="text-2xl font-bold tracking-wide">Recently Seated</h1>
        <div className="p-2 bg-gray-800 rounded-xl flex-grow overflow-y-auto hide-scroll"></div>
      </div>
    </div>
  );
};

export default Waitlist;
