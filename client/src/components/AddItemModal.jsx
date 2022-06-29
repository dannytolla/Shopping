import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addItem, reset, updateItem } from "../redux/itemSlice";

const AddItemModal = ({ open, handleClose, isEdit, item }) => {
  const [title, setTitle] = useState(isEdit ? item?.title : "");
  const [price, setPrice] = useState(isEdit ? item?.price : "");
  const [desc, setDesc] = useState(isEdit ? item?.desc : "");

  const { isError, errorMessage } = useSelector((state) => state.item);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }

    dispatch(reset());
  }, [isError, reset]);

  const style = {
    position: "absolute",
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleSubmit = () => {
    const data = { title, price, desc };
    dispatch(addItem(data));
    setTitle("");
    setPrice("");
    setDesc("");
    handleClose();
  };

  const handleEdit = (e) => {
    e.preventDefault();

    let id = item?._id;

    const data = { title, price, desc, id };
    dispatch(updateItem(data));
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="mt-16 rounded-xl"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {isEdit ? "Edit" : "Add"} Item
        </Typography>
        <form onSubmit={isEdit ? handleEdit : handleSubmit}>
          <label htmlFor="text">Title: </label>
          <input
            type="text"
            name="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="pt-3 pb-2 block w-full px-2 mt-4 bg-transparent border appearance-none rounded-lg focus:outline-none focus:ring-0 focus:border-black border-gray-200 mb-6 "
          />
          <label htmlFor="Number">Price: </label>
          <input
            type="number"
            name="price"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
            className="pt-3 pb-2 block w-full px-2 mt-4 bg-transparent border appearance-none rounded-lg focus:outline-none focus:ring-0 focus:border-black border-gray-200 mb-6 "
          />
          <label htmlFor="Number">Description: </label>
          <input
            type="text"
            name="desc"
            value={desc}
            required
            onChange={(e) => setDesc(e.target.value)}
            className="pt-3 pb-2 block w-full px-2 mt-4 bg-transparent border appearance-none rounded-lg focus:outline-none focus:ring-0 focus:border-black border-gray-200 mb-6 "
          />
          <button
            className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 active:bg-blue-700"
            type="submit"
          >
            Save
          </button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddItemModal;
