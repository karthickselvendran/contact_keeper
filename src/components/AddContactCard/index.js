import React from "react";
import Button from "../Button";
import Input from "../Input";
import "./addContactCard.css";

const AddContactCard = ({
  contactDetails = {},
  setContactDetails = {},
  addContactToList = {},
  updateId = "",
}) => {
  const handleChange = async (e) => {
    e.preventDefault();
    const { id = "", value = "" } = e.target;
    setContactDetails((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <form>
      <h2 className="mb10">Add Contact</h2>
      <Input
        id="name"
        placeholder="Enter name..."
        value={contactDetails.name}
        onChange={handleChange}
        autoFocus={true}
      />
      <Input
        id="mailid"
        placeholder="Enter mail id..."
        value={contactDetails.mailid}
        onChange={handleChange}
      />
      <Input
        id="phoneNumber"
        type="number"
        placeholder="Enter phone number..."
        value={contactDetails.phoneNumber}
        onChange={handleChange}
      />
      <b>Contact type</b>
      <br />

      <label htmlFor="personal">
        <input
          id="personal"
          name="contactType"
          type="radio"
          checked={contactDetails.contactType === "Personal"}
          value={contactDetails.contactType}
          onChange={() =>
            setContactDetails((prevData) => ({
              ...prevData,
              contactType: "Personal",
            }))
          }
        />
        Personal
      </label>

      <label htmlFor="professional">
        <input
          id="professional"
          name="contactType"
          type="radio"
          checked={contactDetails.contactType === "Professional"}
          value={contactDetails.contactType}
          onChange={() =>
            setContactDetails((prevData) => ({
              ...prevData,
              contactType: "Professional",
            }))
          }
        />
        Professional
      </label>

      <Button
        name={`${updateId ? "Update" : "Add"} Contact`}
        onClick={(e) => addContactToList(e)}
      />
    </form>
  );
};
export default AddContactCard;
