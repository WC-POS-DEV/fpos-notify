import React, { useEffect, useState } from "react";

import {
  FileIcon,
  MinusIcon,
  PlusIcon,
  PrintIcon,
  TrashIcon,
} from "@iconicicons/react";

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

const IngredientDetail = (props) => {
  const [ingredient, setIngredient] = useState(null);

  useEffect(() => {
    if (props.ing) {
      setIngredient({
        id: props.ing.id,
        name: props.ing.name,
        group: props.ing.group.id,
        storage_location: props.ing.storage_location.id,
        expiration_amount: props.ing.expiration_amount,
        expiration_unit: props.ing.expiration_unit,
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
      {ingredient && (
        <>
          <h1 className="text-2xl font-bold tracking-wide">
            {ingredient.name}
          </h1>
          <form
            onSubmit={(e) => e.preventDefault}
            className="flex flex-col flex-grow"
          >
            <fieldset className="mt-2">
              <label htmlFor="ing-name" className="block">
                Name
              </label>
              <input
                type="text"
                name="ing-name"
                id="ing-name"
                className="form-input w-full rounded-lg bg-gray-600 p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-600"
                value={ingredient.name}
                onChange={(e) =>
                  setIngredient({ ...ingredient, name: e.target.value })
                }
              />
            </fieldset>
            <fieldset className="mt-2">
              <label htmlFor="ing-exp-amount" className="block">
                Time until Expiration
              </label>
              <div className="flex space-x-2 mt-1">
                <input
                  type="number"
                  min="1"
                  name="ing-exp-amount"
                  id="ing-exp-amount"
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
                  name="ing-exp-unit"
                  id="ing-exp-unit"
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
                <label htmlFor="ing-group" className="block">
                  Group
                </label>
                <select
                  name="ing-group"
                  id="ing-group"
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
                    <option value={group.id}>{group.name}</option>
                  ))}
                </select>
              </div>
              <div className="w-1/2">
                <label htmlFor="ing-storage" className="block">
                  Storage
                </label>
                <select
                  name="ing-storage"
                  id="ing-storage"
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
                    <option value={storage.id}>{storage.name}</option>
                  ))}
                </select>
              </div>
            </fieldset>
            <fieldset className="flex space-x-2 mt-auto pt-2">
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
              >
                <PrintIcon className="h-6 w-6" />
                <span>Print</span>
              </button>
            </fieldset>
          </form>
        </>
      )}
    </>
  );
};

const IngredientList = () => {
  const [currentIng, setCurrentIng] = useState(null);
  const [groups, setGroups] = useState([]);
  const [simpleGroups, setSimpleGroups] = useState([]);
  const [storageLocations, setStorageLocations] = useState([]);

  const getGroups = async () => {
    let groupRes = await (
      await fetch("http://192.168.1.11:8000/ing/groups/")
    ).json();
    setGroups(groupRes);
    setSimpleGroups(
      groupRes.map((group) => {
        return { id: group.id, name: group.name };
      })
    );
  };

  const getStorageLocations = async () => {
    let storageRes = await (
      await fetch("http://192.168.1.11:8000/ing/storage/")
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
    console.log(groups);
  }, []);

  const deleteIngredient = async () => {
    try {
      await fetch(`http://192.168.1.11:8000/ing/items/${currentIng.id}/`, {
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
      let ingredient = await (
        await fetch(`http://192.168.1.11:8000/ing/items/${ing.id}/`, {
          method: "PUT",
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
      if (oldGroupIndex !== -1 && newGroupIndex !== -1) {
        let groupCopy = [...groups];
        groupCopy[oldGroupIndex].ingredients = groupCopy[
          oldGroupIndex
        ].ingredients.filter((oldIng) => oldIng.id !== ingredient.id);
        groupCopy[newGroupIndex].ingredients.push({
          ...ingredient,
          group: {
            id: groupCopy[newGroupIndex].id,
            name: groupCopy[newGroupIndex].name,
          },
          storage: {
            id: storageLocations[newStorageIndex].id,
            name: storageLocations[newStorageIndex].name,
          },
        });
        groupCopy[newGroupIndex].ingredients.sort((a, b) =>
          a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1
        );
        setGroups(groupCopy);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-start h-screen w-full">
      <div className="w-1/2 p-4 space-y-4 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-wide">Inventory</h1>
        </div>
        <div className="w-full p-4 flex-shrink-0 bg-gray-800 rounded-xl shadow-lg overflow-x-scroll flex items-center text-sm hide-scroll space-x-4">
          {groups.map((group) => (
            <a
              className="border-b-4 pb-2 border-gray-600 whitespace-nowrap focus:outline-none focus:border-blue-600"
              href={`#group-${group.id}`}
            >
              {group.name}
            </a>
          ))}
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
        <div className="h-1/2 w-full p-2 rounded-xl flex flex-col overflow-y-auto bg-gray-800">
          <IngredientDetail
            ing={currentIng}
            groups={simpleGroups}
            storage={storageLocations}
            save={saveIngredient}
            onDelete={deleteIngredient}
          />
        </div>
        <div className="h-1/2 w-full p-2 rounded-xl bg-gray-800"></div>
      </div>
    </div>
  );
};

export default IngredientList;
