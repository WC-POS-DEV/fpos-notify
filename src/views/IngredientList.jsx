import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { add, format } from "date-fns";
import {
  BuildingStoreIcon,
  CloseIcon,
  EditIcon,
  FolderIcon,
  FileIcon,
  MinusIcon,
  PlusIcon,
  PrintIcon,
  TagIcon,
  TrashIcon,
  RefreshIcon,
} from "@iconicicons/react";

const AddMenu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (menu) => {
    props.open(menu);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-1 rounded-lg ${isOpen ? "bg-gray-800" : ""}`}
      >
        <PlusIcon className="h-6 w-6" />
      </button>
      {isOpen && (
        <div className="absolute top-0 right-0 mt-10 bg-gray-900 rounded-xl shadow-lg p-2 space-y-1">
          <button
            className="py-1 px-2 text-base rounded-lg w-full text-left flex items-center space-x-2"
            onClick={() => handleClick("Ingredient")}
          >
            <TagIcon />
            <span>Ingredient</span>
          </button>
          <button
            className="py-1 px-2 text-base rounded-lg w-full text-left flex items-center space-x-2"
            onClick={() => handleClick("Group")}
          >
            <FolderIcon />
            <span>Group</span>
          </button>
          <button
            className="py-1 px-2 text-base rounded-lg w-full text-left flex items-center space-x-2"
            onClick={() => handleClick("Storage")}
          >
            <BuildingStoreIcon />
            <span>Storage</span>
          </button>
          <button
            className="py-1 px-2 text-base rounded-lg w-full flex items-center space-x-2"
            onClick={() => setIsOpen(false)}
          >
            <CloseIcon />
            <span>Close</span>
          </button>
        </div>
      )}
    </div>
  );
};

const ManageMenu = (props) => {
  const [currentMenu, setCurrentMenu] = useState("Groups");
  const [currentEdit, setCurrentEdit] = useState(null);
  const [editName, setEditName] = useState("");
  const [promptDelete, setPromptDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    reset();
  }, [currentMenu]);

  useEffect(() => {
    setShowEdit(false);
  }, [promptDelete]);

  const openDelete = (id) => {
    setCurrentEdit(id);
    setPromptDelete(true);
  };

  const openEdit = (id, index) => {
    setCurrentEdit(id);
    setShowEdit(true);
    if (currentMenu === "Groups") {
      setEditName(props.groups[index].name);
    } else {
      setEditName(props.storage[index].name);
    }
  };

  const reset = () => {
    setCurrentEdit(null);
    setPromptDelete(false);
    setShowEdit(false);
    setEditName("");
  };

  const saveEdit = (index) => {
    props.save(currentMenu, index, editName);
    reset();
  };

  const deleteItem = (index) => {
    props.deleteItem(currentMenu, index);
    reset();
  };

  return (
    <div className="space-y-2 flex flex-col h-full">
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className={`w-full py-1 text-center rounded-lg text-base ${
            currentMenu === "Groups" ? "bg-blue-600" : "bg-gray-800"
          }`}
          onClick={() => setCurrentMenu("Groups")}
        >
          Groups
        </button>
        <button
          type="button"
          className="w-full py-1 text-center rounded-lg text-base"
          className={`w-full py-1 text-center rounded-lg text-base ${
            currentMenu === "Storage" ? "bg-blue-600" : "bg-gray-800"
          }`}
          onClick={() => setCurrentMenu("Storage")}
        >
          Storage
        </button>
        <button className="p-1 rounded-lg" onClick={props.close}>
          <CloseIcon />
        </button>
      </div>
      {currentMenu === "Groups" && (
        <div className="space-y-2 flex-grow overflow-y-auto hide-scroll">
          {props.groups.map((group, index) => (
            <div
              className="flex items-center justify-between space-x-2 py-2 px-4 rounded-lg bg-gray-900"
              key={`div-${group.id}`}
            >
              <div className="flex items-center space-x-4">
                <button
                  className="p-1 rounded-lg"
                  onClick={() => openEdit(group.id, index)}
                >
                  <EditIcon className="h-4 w-4" />
                </button>
                {showEdit && currentEdit === group.id ? (
                  <>
                    <input
                      className="form-input w-full rounded-lg bg-gray-600 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />

                    <button
                      className="p-1 w-full flex items-center justify-center space-x-2 text-sm rounded-lg bg-blue-600"
                      onClick={() => saveEdit(index)}
                    >
                      <FileIcon className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      className="p-1 rounded-lg"
                      onClick={() => setCurrentEdit(null)}
                    >
                      <CloseIcon className="h-4 w-4" />{" "}
                    </button>
                  </>
                ) : (
                  <h3 className="whitespace-nowrap">{group.name}</h3>
                )}
              </div>
              {promptDelete && currentEdit === group.id && (
                <>
                  <button
                    className="py-1 w-full bg-gray-600 text-sm rounded-lg"
                    onClick={reset}
                  >
                    Cancel
                  </button>
                  <button
                    className="py-1 w-full bg-red-600 text-sm rounded-lg focus:ring-red-600"
                    onClick={() => deleteItem(index)}
                  >
                    Delete
                  </button>
                </>
              )}
              <button
                className="p-1 rounded-lg focus:ring-red-400"
                onClick={() => openDelete(group.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      {currentMenu === "Storage" && (
        <div className="space-y-2 flex-grow overflow-y-auto hide-scroll">
          {props.storage.map((storage, index) => (
            <div className="flex items-center justify-between space-x-2 py-2 px-4 rounded-lg bg-gray-900">
              <div className="flex items-center space-x-4">
                <button
                  className="p-1 rounded-lg"
                  onClick={() => openEdit(storage.id, index)}
                >
                  <EditIcon className="h-4 w-4" />
                </button>
                {showEdit && currentEdit === storage.id ? (
                  <>
                    <input
                      className="form-input w-full rounded-lg bg-gray-600 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />

                    <button
                      className="p-1 w-full flex items-center justify-center space-x-2 text-sm rounded-lg bg-blue-600"
                      onClick={() => saveEdit(index)}
                    >
                      <FileIcon className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      className="p-1 rounded-lg"
                      onClick={() => setCurrentEdit(null)}
                    >
                      <CloseIcon className="h-4 w-4" />{" "}
                    </button>
                  </>
                ) : (
                  <h3 className="whitespace-nowrap">{storage.name}</h3>
                )}
              </div>
              {promptDelete && currentEdit === storage.id && (
                <>
                  <button
                    className="py-1 w-full bg-gray-600 text-sm rounded-lg"
                    onClick={reset}
                  >
                    Cancel
                  </button>
                  <button
                    className="py-1 w-full bg-red-600 text-sm rounded-lg focus:ring-red-600"
                    onClick={() => deleteItem(index)}
                  >
                    Delete
                  </button>
                </>
              )}
              <button
                className="p-1 rounded-lg focus:ring-red-400"
                onClick={() => openDelete(storage.id)}
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const DeleteConfirm = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        className="bg-gray-600 rounded-lg p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <TrashIcon className="h-6 w-6" />
      </button>
      {isOpen && (
        <div className="absolute bottom-0 mb-12 bg-gray-700 rounded-lg shadow-lg p-2 flex items-center space-x-2">
          <button
            type="button"
            className="w-full bg-gray-600 rounded-lg px-2 py-1 text-base"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="w-full bg-red-600 rounded-lg px-2 py-1 text-base"
            onClick={props.onConfirm}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

const GroupItem = (props) => {
  return (
    <>
      {props.group ? (
        <>
          <div
            className="p-2 bg-gray-900 rounded-lg"
            id={"group-" + props.group.id.toString()}
          >
            {props.group.name}
          </div>
          {props.group.ingredients.map((ing) => (
            <div
              className="px-2 py-1 rounded-lg cursor-pointer"
              key={ing.id}
              onClick={() => props.handleClick(ing)}
            >
              {ing.name}
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const IngredientPrintPreview = (props) => {
  const [formattedDate, setFormattedDate] = useState(null);
  const [formattedToday, setFormattedToday] = useState(null);
  const [storageName, setStorageName] = useState(null);

  useEffect(() => {
    if (props.ing) {
      let dateAdd = {};
      dateAdd[props.ing.expiration_unit.toLowerCase()] =
        props.ing.expiration_amount;
      let futureDate = add(new Date(), dateAdd);
      setFormattedDate(format(futureDate, "PPpp"));
      setFormattedToday(format(new Date(), "PPpp"));
      let location = props.storage.find(
        (location) => location.id === props.ing.storage_location
      );
      location !== -1 ? setStorageName(location.name) : "";
    } else {
      setFormattedDate(null);
      setFormattedToday(null);
    }
  }, [props.ing]);
  const previewRoot = document.getElementById("ing-print-root");
  return ReactDOM.createPortal(
    <>
      {props.ing && (
        <>
          <h1 className="text-xl font-bold tracking-wide">{props.ing.name}</h1>
          <div className="flex items-center space-x-4">
            <h2>{formattedDate}</h2>
            <h2 className="text-gray-700">
              {props.ing.expiration_amount} {props.ing.expiration_unit}
            </h2>
          </div>
          <h3 className="text-xs text-gray-700">{formattedToday}</h3>
          <div className="flex items-center jusitfy-between w-full">
            {storageName}
          </div>
        </>
      )}
    </>,
    previewRoot
  );
};

const IngredientDetail = (props) => {
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    if (props.ing) {
      setIngredient({
        id: props.ing.id,
        name: props.ing.name,
        group: props.ing.group.id,
        storage_location:
          props.ing.storage_location === -1
            ? props.ing.storage_location.id
            : props.storage[0].id,
        expiration_amount: props.ing.expiration_amount,
        expiration_unit: props.ing.expiration_unit,
      });
    } else if (props.createNew) {
      setIngredient({
        id: "",
        name: "",
        group: props.groups[0] ? props.groups[0].id : null,
        storage_location: props.storage[0] ? props.storage[0].id : null,
        expiration_amount: 6,
        expiration_unit: "Hours",
      });
    } else {
      setIngredient(null);
    }
  }, [props.ing]);

  const decrement = () => {
    if (ingredient.expiration_amount > 1) {
      setIngredient({
        ...ingredient,
        expiration_amount: ingredient.expiration_amount - 1,
      });
    }
  };

  const increment = () => {
    setIngredient({
      ...ingredient,
      expiration_amount: ingredient.expiration_amount + 1,
    });
  };

  const validate = () => {
    return ingredient.name && ingredient.expiration_amount > 0;
  };

  const save = () => {
    if (!validate()) {
      return;
    }

    props.save(ingredient);
  };

  return (
    <>
      <IngredientPrintPreview ing={ingredient} storage={props.storage} />

      {ingredient && (
        <>
          {!props.createNew && (
            <h1 className="text-2xl font-bold tracking-wide">
              {ingredient.name}
            </h1>
          )}

          <form
            onSubmit={(e) => e.preventDefault}
            className="flex flex-col flex-grow"
          >
            <fieldset className="mt-2">
              <label
                htmlFor={`${props.createNew ? "new-" : ""}ing-name`}
                className="block"
              >
                Name
              </label>
              <input
                type="text"
                name={`${props.createNew ? "new-" : ""}ing-name`}
                id={`${props.createNew ? "new-" : ""}ing-name`}
                placeholder={`${props.createNew ? "New Ingredient" : ""}`}
                className="form-input w-full rounded-lg bg-gray-600 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
                value={ingredient.name}
                onChange={(e) =>
                  setIngredient({ ...ingredient, name: e.target.value })
                }
              />
            </fieldset>
            <fieldset className="mt-2">
              <label
                htmlFor={`${props.createNew ? "new-" : ""}ing-exp-amount`}
                className="block"
              >
                Time until Expiration
              </label>
              <div className="flex space-x-2 mt-1">
                <input
                  type="number"
                  min="1"
                  name={`${props.createNew ? "new-" : ""}ing-exp-amount`}
                  id={`${props.createNew ? "new-" : ""}ing-exp-amount`}
                  className="form-input text-center w-full rounded-lg bg-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
                  value={ingredient.expiration_amount}
                  onChange={(e) =>
                    setIngredient({
                      ...ingredient,
                      expiration_amount: e.target.value,
                    })
                  }
                />
                <select
                  name={`${props.createNew ? "new-" : ""}ing-exp-unit`}
                  id={`${props.createNew ? "new-" : ""}ing-exp-unit`}
                  value={ingredient.expiration_unit}
                  onChange={(e) =>
                    setIngredient({
                      ...ingredient,
                      expiration_unit: e.target.value,
                    })
                  }
                  className="form-select text-center w-full rounded-lg bg-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
                >
                  <option value="Minutes">Minutes</option>
                  <option value="Hours">Hours</option>
                  <option value="Days">Days</option>
                </select>
                <button
                  className=" bg-gray-600 rounded-lg px-2"
                  type="button"
                  onClick={decrement}
                >
                  <MinusIcon className="h-6 w-6" />
                </button>
                <button
                  className=" bg-blue-600 rounded-lg px-2"
                  type="button"
                  onClick={increment}
                >
                  <PlusIcon className="h-6 w-6" />
                </button>
              </div>
            </fieldset>
            <fieldset className="mt-2 flex items-center space-x-2">
              <div className="w-1/2">
                <label
                  htmlFor={`${props.createNew ? "new-" : ""}ing-group`}
                  className="block"
                >
                  Group
                </label>
                <select
                  name={`${props.createNew ? "new-" : ""}ing-group`}
                  id={`${props.createNew ? "new-" : ""}ing-group`}
                  className="form-select text-center w-full rounded-lg bg-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
                  value={ingredient.group}
                  onChange={(e) =>
                    setIngredient({
                      ...ingredient,
                      group: Number(e.target.value),
                    })
                  }
                >
                  {props.groups.map((group) => (
                    <option value={group.id} key={group.id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label
                  htmlFor={`${props.createNew ? "new-" : ""}ing-storage`}
                  className="block"
                >
                  Storage
                </label>
                <select
                  name={`${props.createNew ? "new-" : ""}ing-storage`}
                  id={`${props.createNew ? "new-" : ""}ing-storage`}
                  className="form-select text-center w-full rounded-lg bg-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
                  value={ingredient.storage_location}
                  onChange={(e) =>
                    setIngredient({
                      ...ingredient,
                      storage_location: Number(e.target.value),
                    })
                  }
                >
                  {props.storage.map((storage) => (
                    <option value={storage.id} key={storage.id}>
                      {storage.name}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>
            <fieldset className="flex space-x-2 mt-auto pt-2">
              {props.createNew ? (
                <>
                  <button type="reset" className="bg-gray-600 rounded-lg p-2">
                    <RefreshIcon className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 rounded-lg p-2 w-full flex items-center justify-center space-x-2 text-sm"
                    onClick={save}
                  >
                    <FileIcon className="h-6 w-6" />
                    <span>Save</span>
                  </button>
                </>
              ) : (
                <>
                  <DeleteConfirm onConfirm={props.onDelete} />
                  <button
                    type="button"
                    className="bg-gray-600 rounded-lg p-2"
                    onClick={save}
                  >
                    <FileIcon className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    className="bg-blue-600 rounded-lg p-2 w-full flex items-center justify-center space-x-2 text-sm"
                    onClick={print}
                  >
                    <PrintIcon className="h-6 w-6" />
                    <span>Print</span>
                  </button>
                </>
              )}
            </fieldset>
          </form>
        </>
      )}
    </>
  );
};

const NewGroup = (props) => {
  const [name, setName] = useState(null);

  const save = (e) => {
    e.preventDefault();
    if (name) {
      props.onSave(name);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <FolderIcon className="h-8 w-8" />
        <h1 className="text-2xl font-bold tracking-wide">New Group</h1>
      </div>
      <form onSubmit={save} className="flex-grow flex flex-col justify-between">
        <fieldset className="space-y-2">
          <label htmlFor="group-name" className="block">
            Name
          </label>
          <input
            type="text"
            name="group-name"
            id="group-name"
            className="form-input w-full rounded-lg bg-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
            placeholder="Group Name"
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex items-center space-x-2">
          <button type="reset" className="bg-gray-600 rounded-lg p-2">
            <RefreshIcon className="h-6 w-6" />
          </button>
          <button
            type="submit"
            className="bg-blue-600 rounded-lg p-2 w-full flex items-center justify-center space-x-2 text-sm"
          >
            <FileIcon className="h-6 w-6" />
            <span>Save</span>
          </button>
        </fieldset>
      </form>
    </>
  );
};

const NewStorage = (props) => {
  const [name, setName] = useState(null);

  const save = (e) => {
    e.preventDefault();
    if (name) {
      props.onSave(name);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <BuildingStoreIcon className="h-8 w-8" />
        <h1 className="text-2xl font-bold tracking-wide">
          New Storage Location
        </h1>
      </div>
      <form onSubmit={save} className="flex-grow flex flex-col justify-between">
        <fieldset className="space-y-2">
          <label htmlFor="storage-name" className="block">
            Name
          </label>
          <input
            type="text"
            name="storage-name"
            id="storage-name"
            className="form-input w-full rounded-lg bg-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
            placeholder="Storage Location Name"
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset className="flex items-center space-x-2">
          <button type="reset" className="bg-gray-600 rounded-lg p-2">
            <RefreshIcon className="h-6 w-6" />
          </button>
          <button
            type="submit"
            className="bg-blue-600 rounded-lg p-2 w-full flex items-center justify-center space-x-2 text-sm"
          >
            <FileIcon className="h-6 w-6" />
            <span>Save</span>
          </button>
        </fieldset>
      </form>
    </>
  );
};

const IngredientList = () => {
  const [currentIng, setCurrentIng] = useState(null);
  const [groups, setGroups] = useState([]);
  const [simpleGroups, setSimpleGroups] = useState([]);
  const [storageLocations, setStorageLocations] = useState([]);
  const [newMenu, setNewMenu] = useState(null);
  const [manageMenuOpen, setManageMenuOpen] = useState(false);

  const getGroups = async () => {
    let groupRes = await (
      await fetch("http://192.168.1.86:8000/ing/groups/")
    ).json();
    setGroups(groupRes);
    setSimpleGroups(
      groupRes.map((group) => {
        return { id: group.id, name: group.name };
      })
    );
  };

  useEffect(() => {
    setSimpleGroups(
      groups.map((group) => {
        return { id: group.id, name: group.name };
      })
    );
  }, [groups]);

  const getStorageLocations = async () => {
    let storageRes = await (
      await fetch("http://192.168.1.86:8000/ing/storage/")
    ).json();
    setStorageLocations(
      storageRes.map((storage) => {
        return { id: storage.id, name: storage.name };
      })
    );
  };

  useEffect(async () => {
    try {
      await Promise.all([getGroups(), getStorageLocations()]);
    } catch (err) {
      console.error(err);
      setGroups([]);
    }
  }, []);

  useEffect(() => {
    if (newMenu) {
      setManageMenuOpen(false);
    }
  }, [newMenu]);

  const deleteIngredient = async () => {
    try {
      await fetch(`http://192.168.1.86:8000/ing/items/${currentIng.id}/`, {
        method: "DELETE",
      });
      let groupIndex = groups.findIndex(
        (group) => group.id === currentIng.group.id
      );
      let groupCopy = [...groups];
      groupCopy[groupIndex].ingredients = groupCopy[
        groupIndex
      ].ingredients.filter((ingredient) => ingredient.id !== currentIng.id);
      setGroups(groupCopy);
      setCurrentIng(null);
    } catch (err) {
      console.error(err);
    }
  };

  const saveIngredient = async (ing) => {
    try {
      let saveURL;
      let method;
      if (ing.id) {
        saveURL = `http://192.168.1.86:8000/ing/items/${ing.id}/`;
        method = "PUT";
      } else {
        saveURL = `http://192.168.1.86:8000/ing/items/`;
        method = "POST";
      }
      let ingredient = await (
        await fetch(saveURL, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ing),
        })
      ).json();
      let oldGroupIndex = groups.findIndex((group) => {
        let oldIngIndex = group.ingredients.findIndex(
          (oldIng) => oldIng.id === ingredient.id
        );
        return oldIngIndex !== -1;
      });
      let newGroupIndex = groups.findIndex(
        (group) => group.id === ingredient.group
      );
      let newStorageIndex = storageLocations.findIndex(
        (storage) => storage.id === ingredient.storage_location
      );
      console.log(newStorageIndex);
      let groupCopy = [...groups];
      if (oldGroupIndex !== -1) {
        groupCopy[oldGroupIndex].ingredients = groupCopy[
          oldGroupIndex
        ].ingredients.filter((oldIng) => oldIng.id !== ingredient.id);
      }
      if (newGroupIndex !== -1) {
        groupCopy[newGroupIndex].ingredients.push({
          ...ingredient,
          group: {
            id: groupCopy[newGroupIndex].id,
            name: groupCopy[newGroupIndex].name,
          },
          storage_location: {
            id: storageLocations[newStorageIndex].id,
            name: storageLocations[newStorageIndex].name,
          },
        });
        groupCopy[newGroupIndex].ingredients.sort((a, b) =>
          a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1
        );
      }

      setGroups(groupCopy);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGroupSave = async (name) => {
    let newGroupRes = await fetch("http://192.168.1.86:8000/ing/groups/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    let groupCopy = [...groups, await newGroupRes.json()];
    groupCopy.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase());
    setGroups(groupCopy);
    setNewMenu(null);
  };

  const handleStorageSave = async (name) => {
    let newStorageRes = await fetch("http://192.168.1.86:8000/ing/storage/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    let newStorageObj = await newStorageRes.json();
    setStorageLocations([
      ...storageLocations,
      { id: newStorageObj.id, name: newStorageObj.name },
    ]);
    setNewMenu(null);
  };

  const toggleManageMenu = () => {
    if (!manageMenuOpen) {
      setNewMenu(null);
    }
    setManageMenuOpen(!manageMenuOpen);
  };

  const manageDeleteItem = async (type, index) => {
    if (type === "Groups") {
      await fetch(
        `http://192.168.1.86:8000/ing/groups/${simpleGroups[index].id}/`,
        {
          method: "DELETE",
        }
      );
      let groupsCopy = [...groups];
      groupsCopy.splice(index, 1);
      groupsCopy.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase());
      setGroups(groupsCopy);
    } else {
      await fetch(
        `http://192.168.1.86:8000/ing/storage/${storageLocations[index].id}/`,
        {
          method: "DELETE",
        }
      );
      let locationsCopy = [...storageLocations];
      locationsCopy.splice(index, 1);
      locationsCopy.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase());
      setStorageLocations(locationsCopy);
    }
  };

  const saveManageEdit = async (type, index, name) => {
    if (type === "Groups") {
      await fetch(
        `http://192.168.1.86:8000/ing/groups/${simpleGroups[index].id}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: simpleGroups[index], name }),
        }
      );
      let groupsCopy = [...groups];
      groupsCopy[index].name = name;
      groupsCopy.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase());
      setGroups(groupsCopy);
    } else {
      await fetch(
        `http://192.168.1.86:8000/ing/storage/${storageLocations[index].id}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: storageLocations[index], name }),
        }
      );
      let locationsCopy = [...storageLocations];
      locationsCopy[index].name = name;
      locationsCopy.sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase());
      setStorageLocations(locationsCopy);
    }
  };

  return (
    <div className="flex items-start h-screen w-full">
      <div className="w-1/2 p-4 space-y-4 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">Inventory</h1>
          <div className="flex items-center space-x-2">
            <button type="button" className="p-1 rounded-lg">
              <EditIcon className="h-6 w-6" onClick={toggleManageMenu} />
            </button>
            <select
              name="group-nav-select"
              id="group-nav-select"
              className="form-select text-center w-full rounded-lg bg-gray-600 p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
              onChange={(e) => (location.href = e.target.value)}
            >
              {groups.map((group) => (
                <>
                  <option value={`#group-${group.id}`} key={group.id}>
                    {group.name}
                  </option>
                </>
              ))}
            </select>
            <AddMenu open={setNewMenu} />
          </div>
        </div>

        <div className="p-2 bg-gray-800 overflow-y-auto hide-scroll rounded-xl flex-grow space-y-2">
          {groups.map((group) => (
            <GroupItem
              group={group}
              key={group.id}
              handleClick={(ing) => setCurrentIng(ing)}
            />
          ))}
        </div>
      </div>
      <div className="w-1/2 p-4 h-full flex flex-col items-center space-y-4">
        <div
          className={`${
            manageMenuOpen ? "" : "hidden"
          } h-1/2 relative w-full p-2 rounded-xl bg-gray-800`}
        >
          <ManageMenu
            groups={simpleGroups}
            storage={storageLocations}
            close={() => setManageMenuOpen(false)}
            save={saveManageEdit}
            deleteItem={manageDeleteItem}
          />
        </div>
        <div
          className={`${
            newMenu || manageMenuOpen ? "h-1/2" : "h-full"
          } w-full p-2 rounded-xl flex flex-col overflow-y-auto bg-gray-800 relative`}
        >
          <IngredientDetail
            ing={currentIng}
            groups={simpleGroups}
            storage={storageLocations}
            save={saveIngredient}
            onDelete={deleteIngredient}
            createNew={false}
          />
          {currentIng && (
            <button
              className="p-1 rounded-lg absolute top-2 right-2"
              onClick={() => setCurrentIng(null)}
            >
              <CloseIcon />
            </button>
          )}
        </div>
        <div
          className={`${
            newMenu ? "" : "hidden"
          } h-1/2 relative w-full p-2 rounded-xl bg-gray-800 flex flex-col overflow-y-auto hide-scroll`}
        >
          {newMenu === "Group" && <NewGroup onSave={handleGroupSave} />}
          {newMenu === "Storage" && <NewStorage onSave={handleStorageSave} />}
          {newMenu === "Ingredient" && (
            <>
              <div className="flex items-center space-x-2">
                <TagIcon className="h-8 w-8" />
                <h1 className="text-2xl font-bold tracking-wide">
                  New Ingredient
                </h1>
              </div>
              <IngredientDetail
                ing={null}
                groups={simpleGroups}
                storage={storageLocations}
                save={saveIngredient}
                onDelete={deleteIngredient}
                createNew={true}
              />
            </>
          )}
          {newMenu && (
            <button
              className="p-1 rounded-lg absolute top-2 right-2"
              onClick={() => setNewMenu(null)}
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientList;
