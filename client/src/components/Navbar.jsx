import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex  flex-row items-center justify-between h-16">
          <p className="text-xl font-medium leading-6 text-gray-900 sm:truncate">
            Shopping Items
          </p>
          <div className="flex flex-row justify-center">
            <h1 className="capitalize mr-5">Hello, {user?.username}</h1>
            <IoIosLogOut className="my-1 mx-2" />
            <button
              className=" px-2 hover:bg-red-600 hover:text-white  hover:px-2 hover:rounded"
              onClick={handleClick}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
