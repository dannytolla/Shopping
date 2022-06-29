import { Button } from "./Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";

import { deleteItem } from "../redux/itemSlice";

export const Dialog = ({ open, handleClose, id }) => {
  const dispatch = useDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(deleteItem(id));
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <p className="text-xl font-bold text-center my-5">
          Are you sure you want to delete this item?
        </p>
        <button
          className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded-xl shadow hover:shadow-lg outline-none focus:outline-none mr-5 ml-5 mb-1 ease-linear transition-all duration-150"
          onClick={(e) => handleClick(e)}
        >
          Yes, sure
        </button>
        <Button label="Cancel" click={handleClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};
