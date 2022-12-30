import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import AddContactCard from "./components/AddContactCard";
import Header from "./components/Header";
import UserProfile from "./components/UserProfile";
import "./App.css";

const initialState = {
  name: "",
  mailid: "",
  phoneNumber: "",
  contactType: "Personal",
};

function App() {
  const [contactDetails, setContactDetails] = useState(initialState);
  const [contactList, setContactList] = useState([]);
  const [updateId, setUpdateId] = useState("");

  const addContactToList = (e) => {
    e.preventDefault();
    const { name = "", mailid = "", phoneNumber = "" } = contactDetails;
    if (!name.trim() || !mailid.trim() || !phoneNumber.trim()) {
      toast.error("All fields are required");
      return;
    }
    if (!mailid.match(/^[^ ]+@[^ ]+.[a-z]{2,3}$/)) {
      toast.error("Email id should be valid");
      return;
    }
    if (
      (phoneNumber.trim() && phoneNumber.length < 10) ||
      phoneNumber?.length > 10
    ) {
      toast.error("Enter a valid phone number");
      return;
    }
    if (updateId) {
      let temp = contactList.map((data) => {
        if (data.id === updateId) {
          return {
            ...data,
            ...contactDetails,
          };
        } else return data;
      });
      setContactList([...temp]);
      setUpdateId("");
      toast.success("Contact Updated Successfully");
    } else {
      setContactList((prevData) => [
        ...prevData,
        {
          id: uuid(),
          ...contactDetails,
        },
      ]);
      toast.success("Contact Added Successfully");
    }
    setContactDetails(initialState);
  };

  const deleteContact = (deleteId) => {
    let temp = contactList.filter((data) => data.id !== deleteId);
    setContactList([...temp]);
  };

  const editContact = (editId) => {
    setUpdateId(editId);
    let temp = contactList.find((data) => data.id === editId);
    setContactDetails({ ...temp });
  };

  console.log("contactDetails  :: ", contactDetails);
  console.log("contactList  :: ", contactList);
  return (
    <div>
      <ToastContainer autoClose={2000} />
      <Header title="Contact Keeper" />
      <div className="container">
        <div className="addContactCard">
          <AddContactCard
            contactDetails={contactDetails}
            setContactDetails={setContactDetails}
            addContactToList={addContactToList}
            updateId={updateId}
          />
        </div>
        <div className="cardsList">
          {contactList.length
            ? contactList.map((data) => (
              <UserProfile
                {...data}
                editContact={editContact}
                deleteContact={deleteContact}
              />
            ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default App;
