import React, { useState } from "react";
import AddItemModal from "./AddItemModal";
import { Dialog } from "./Dialog";

const CheckboxList = ({ item, onCheckboxChange }) => {
  const [showDialogEdit, setShowDialogEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleEditOpen = () => setShowDialogEdit(true);
  const handleEditClose = () => setShowDialogEdit(false);

  return (
    <>
      <tr className="border-b odd:bg-white even:bg-gray-100 border-gray-50">
        <td className="py-4 px-6 text-sm font-semibold">
          <div className="flex items-center h-5">
            <input
              checked={item.status}
              aria-describedby={`todo-${item._id}-description`}
              name={`item-${item._id}`}
              type="checkbox"
              className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
              onChange={() => onCheckboxChange(item._id)}
            />
          </div>
        </td>
        <td
          className={`py-4 px-6 text-sm font-semibold ${
            item.status && "line-through"
          }`}
        >
          {item.title}
        </td>
        <td className="py-4 px-6 text-sm whitespace-nowrap text-blue-600">
          $ {item.price}
        </td>
        <td className="py-4 px-6 text-sm whitespace-nowrap text-center">
          {}
          {item.desc.substring(0, 60)} {item.desc.length >= 60 && "..."}
        </td>
        <td className="py-4 px-6 text-sm whitespace-nowrap">
          {item.status ? (
            <div className="bg-green-400 text-white text-center p-1 rounded-lg">
              Complete
            </div>
          ) : (
            <div className="bg-red-500 text-white text-center py-1 rounded-lg">
              Incomplete
            </div>
          )}
        </td>
        <td className="py-4 px-6 text-sm whitespace-nowrap space-x-3 text-center">
          <button
            onClick={() => setShowDialogEdit(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-xl"
          >
            ✏️
          </button>
          <button
            className="bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-3 rounded-xl"
            onClick={handleOpen}
          >
            🚫
          </button>
        </td>
      </tr>
      {open && <Dialog open={open} handleClose={handleClose} id={item._id} />}
      {showDialogEdit && (
        <AddItemModal
          isEdit
          item={item}
          open={showDialogEdit}
          handleClose={handleEditClose}
        />
      )}
    </>
  );
};

export default CheckboxList;
