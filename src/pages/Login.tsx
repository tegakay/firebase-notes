import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Error } from "../components/Error";

interface formData {
  email?: string;
  password?: string;
}
export const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<formData>();
  const [error, setError] = useState(false);

  const updateForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: [value] });
  };
  const signIn = async () => {
    try {
      setError(false)
      const email = form?.email?.toString();
      const password = form?.password?.toString();
      await signInWithEmailAndPassword(auth, email!, password!);
      navigate("/Dashboard");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };
  return (
    <div className="container mx-auto md:w-72 ">
      {error && <Error />}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            onChange={updateForm}
            name="email"
            value={form?.email}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            name="password"
            value={form?.password}
            onChange={updateForm}
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
          {/* <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p> */}
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={signIn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
        <div>
          <a
            onClick={() => {
              navigate("/Register");
            }}
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Create An Account
          </a>
        </div>
      </form>
    </div>
  );
};
