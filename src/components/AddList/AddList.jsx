import { useState } from "react";

import "./AddList.css";
import AddForm from "../AddForm/AddForm";

function AddList({ onAddList }) {
  const [isClicked, setIsClicked] = useState(false);

  const [list, setList] = useState({
    title: "",
    cards: [],
  });

  const [errors, setErrors] = useState({});

  function handleOnChange(event) {
    setList({ ...list, title: event.target.value });
  }

  function isFormValid() {
    const _errors = {};
    if (!list.title) _errors.title = "Title is required!";
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    if (!isFormValid()) return;
    onAddList(list);
    togglePopup();
  }

  function togglePopup() {
    setIsClicked((isClicked) => !isClicked);
    setList({ ...list, title: "" });
    setErrors({});
  }

  return (
    <div className="add-list">
      {isClicked ? (
        <AddForm
          newItem={list}
          handleOnChange={handleOnChange}
          handleOnSubmit={handleOnSubmit}
          errors={errors}
        />
      ) : (
        ""
      )}
      <button className="add-list-btn" onClick={togglePopup}>
        {isClicked ? "CLOSE" : "ADD LIST"}
      </button>
    </div>
  );
}

export default AddList;
