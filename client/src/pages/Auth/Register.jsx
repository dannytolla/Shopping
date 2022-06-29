import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { register, reset } from "../../redux/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const { user, isLoading, isError, isAuthenticated, errorMessage } =
    useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
    }

    if (isAuthenticated || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isAuthenticated, user, dispatch, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    dispatch(register(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center m-auto p-2">
      <div className="max-w-md w-full m-auto mt-28 p-5 bg-white border rounded shadow-2xl">
        <h2 className="font-medium text-center p-4 text-4xl">Register</h2>
        <form className="pt-5  w-full mb-8" onSubmit={onSubmit}>
          <label className="my-4 py-3 mb-10 text-gray-500">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            required
            onChange={onChange}
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 mb-6"
          />
          <label className="my-4 py-3 mb-10 text-gray-500">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            value={email}
            onChange={onChange}
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 mb-6"
          />
          <label className="my-4 py-3 text-gray-500">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200 mb-6"
          />
          <p className="text-sm py-4">
            <Link to="/login" className="text-blue-500 underline">
              Have an account
            </Link>
          </p>
          <button
            type="submit"
            className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 active:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
