import axios from "axios";

// const API_URL = "https://shopping-2.herokuapp.com/api/";
const API_URL = "http://localhost:5000/api/";

/**
 * Auth
 */

// Register User
const register = async (userData) => {
  const res = await axios.post(API_URL + "auth/signup", userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

// Login User
const login = async (userData) => {
  const res = await axios.post(API_URL + "auth/login", userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

// Logout User
const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("event");
  localStorage.removeItem("username");
  localStorage.removeItem("pin");
  localStorage.removeItem("raised");
  localStorage.setItem("connect", false);
};

// Get All  Items
const getAllItems = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL + "", config);

  return res.data;
};

// Get All  Items
const getItem = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.get(API_URL + `${id}/`, config);

  return res.data;
};

// Create Item
const createItem = async (token, { title, price, desc }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.post(API_URL + "", { title, price, desc }, config);

  return res.data;
};

const updateItem = async (token, { title, price, desc, id }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(
    API_URL + `${id}`,
    { title, price, desc },
    config
  );

  return res.data;
};

const updateStatus = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.put(API_URL + `status/${id}`, {}, config);

  return res.data;
};

// Delete item
const deleteItem = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await axios.delete(API_URL + `${id}`, config);

  return res.data;
};

const apiCalls = {
  register,
  login,
  logout,
  getAllItems,
  getItem,
  createItem,
  updateItem,
  updateStatus,
  deleteItem,
};

export default apiCalls;
