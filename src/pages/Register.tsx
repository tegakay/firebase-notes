import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {addDoc,collection,doc, setDoc } from "firebase/firestore"
import {db} from "../config/firebase"
import { Error } from "../components/Error";

interface formData {
  email?: string;
  password?: string;
  checkPassword? : string;
}

export const Register = () => {
  const [form, setForm] = useState<formData>({});
  const [formError, setFormError] = useState(false)

  const userCollection = collection(db,"users")
  const navigate = useNavigate();

  //firebase lgic
  const updateForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const email = form?.email
    const password = form?.password
    const checkPassword = form?.checkPassword

  //  // console.log("dddz",password,checkPassword)
  //   console.log(form)

  //   if(password != checkPassword){
  //     setFormError(true)
  //   }
  //   if(password === checkPassword){
  //     console.log("here")
  //     setFormError(false)
  //   }
    setForm({ ...form, [name]: [value] });

    //setForm({ ...form, name:value } as formData);
  };
  const signIn = async () => {
    //console.log(form)
    const email = form?.email
    const password = form?.password
    const checkPassword = form?.checkPassword
    try {
      
      const created = await createUserWithEmailAndPassword(auth,email![0],password![0]);
      const userCreated = {name:"daryl",uid:created.user.uid,Notes:[]}
      // await  addDoc(userCollection,userCreated);
      await setDoc(doc(db, "users",created.user.uid ), userCreated);
      navigate("/");
    } catch (error) { 
      console.log(error);
    }


  };

  //end
  return (
    <div className="container mx-auto md:w-72">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="email"
            onChange={updateForm}
            value={form?.email}
            name="email"
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
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            onChange={updateForm}
            value={form?.password}
            name="password"
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            //id="password"
            type="password"
            name ="checkPassword"
            id ="checkPassword"
            value={form?.checkPassword}
            onChange={updateForm}
          />
        </div>

        {formError && <Error/>}
        <div>
          <button
            onClick={signIn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
