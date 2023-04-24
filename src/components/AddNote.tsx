import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import {db} from '../config/firebase'

type Inputs = {
  title: string;
  content: string;
};

type NoteProps = {
  uid?: string;
  content?: string;
};
 
export const AddNote= (props:NoteProps) => {
  const uids = props.uid
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();


  const onSubmit: SubmitHandler<Inputs> = async(data) =>{


  try {
      const new_data = doc(db, "users", uids!);
  
      await updateDoc(new_data, {
        Notes: arrayUnion(data.content)
    });
  } catch (error) {
    console.log(error)
  }
    console.log(data.content,uids);
  }


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto">
        <div>
          <input
            placeholder="Take a Note"
            {...register("title")}
            className=" shadow mb-2 appearance-none border border-b-0  center focus:outline-none focus:shadow-outline"
          />
        </div>

        <div>
          <input
            {...register("content", { required: true })}
            className="mb-4 shadow appearance-none  border border-t-0 focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* {errors.content && <span>The Content is required</span>}
        {errors.title && <span>The Title is required</span>} */}

        <input
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        />
      </form>
    </div>
  );
};
