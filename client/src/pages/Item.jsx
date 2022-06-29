import React, { useState } from "react";
import AddItemModal from "../components/AddItemModal";
import ItemList from "../components/ItemList";
import Navbar from "../components/Navbar";

const Item = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="py-10">
          <div className="mx-auto max-w-7xl">
            <header>
              <div className="px-4 sm:px-6 lg:px-8 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <h1 className="text-3xl font-bold leading-tight text-gray-900">
                    Items To Buy
                  </h1>
                </div>
                <div className="flex mt-4 md:mt-0 md:ml-4">
                  <button
                    type="button"
                    className={
                      "inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 disabled:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    }
                    onClick={handleOpen}
                  >
                    Add Item
                  </button>
                </div>
              </div>
            </header>
            <ItemList />
          </div>
        </div>
      </div>
      <AddItemModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default Item;
