import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="text-center  text-white p-10 mt-28">
        <h1 className="text-4xl">Page Not Found</h1>
        <Link to="/">
          <button className="border rounded-sm bg-green-400 text-gray-700 p-2 my-4">
            Back Home
          </button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
