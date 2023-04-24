import React from "react";
import { AddNote } from "../components/AddNote";
import { Notes } from "../components/Notes";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { NoteList } from "../components/NoteList";

interface user_data {
  Notes?: [];
  name?: string;
  uid?: string;
}
export const Dashboard = () => {
  const [user, setUser] = useState("");
  const [userData, setUserData] = useState<user_data>();

  const data = async () => {
    if (user) {
      const docRef = doc(db, "users", user);
      const docSnap = await getDoc(docRef);
      console.log("whyyy", docSnap);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        const userdeets = docSnap.data();
        setUserData(userdeets)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUser(uid);
      } else {
        //  setUser(null);
        console.log("pleb");
      }
    });

    //run data
    data();
  }, []);
//Notes Logic


  return (
    <>
      <div className="mt-0 mb-2 text-4xl font-medium leading-tight text-primary">
        Notes
      </div>
      <AddNote uid={user} />
      <div>
        <Notes/>
      </div>
    </>
  );
};
