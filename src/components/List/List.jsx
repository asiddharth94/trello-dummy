import { useState } from "react";

import AddForm from "../AddForm/AddForm";
import Card from "../Card/Card";
import "./List.css";

function List({
  id,
  listTitle,
  cards,
  updateOnDrop,
  addCard,
  deleteCard,
  deleteAllCards,
}) {
  const [isClicked, setIsClicked] = useState(false);

  const [newCard, setNewCard] = useState({
    title: "",
    desc: "",
  });

  const [errors, setErrors] = useState({});

  function cancelDragEvents(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  function onCardDrop(event) {
    cancelDragEvents(event);

    const cardId = event.dataTransfer.getData("text/plain");
    const targetListId = event.currentTarget.id;

    updateOnDrop(cardId, targetListId);
  }

  function onCardDrag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
  }

  function togglePopup() {
    setIsClicked((isClicked) => !isClicked);
    setNewCard({ ...newCard, title: "", desc: "" });
    setErrors({});
  }

  function handleOnChange({ target }) {
    setNewCard({ ...newCard, [target.name]: target.value });
  }

  function isFormValid() {
    const _errors = {};
    if (!newCard.title) _errors.title = "Title is required!";
    if (!newCard.desc) _errors.desc = "Desc is required!";
    setErrors(_errors);
    return Object.keys(_errors).length === 0;
  }

  function handleOnSubmit(event) {
    event.preventDefault();
    if (!isFormValid()) return;
    addCard(newCard, listTitle);
    togglePopup();
  }

  return (
    <div
      id={id}
      className="list"
      data-role="drag-drop-target"
      onDrop={onCardDrop}
      onDragEnter={cancelDragEvents}
      onDragOver={cancelDragEvents}
    >
      <header className="list-header">
        <h2>{listTitle}</h2>
        <div id={listTitle} className="list-delete" onClick={deleteAllCards}>
          X
        </div>
      </header>
      <div className="list-content">
        {cards.map((card) => {
          return (
            <Card
              id={card.title}
              key={card.title}
              title={card.title}
              description={card.desc}
              onCardDrag={onCardDrag}
              deleteCard={deleteCard}
            />
          );
        })}
      </div>
      <div className="list-footer">
        {isClicked ? (
          <AddForm
            newItem={newCard}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
            isAddCard="true"
            errors={errors}
          />
        ) : (
          ""
        )}
        <div className="list-add-card" onClick={togglePopup}>
          {isClicked ? "-" : "+"}
        </div>
      </div>
    </div>
  );
}

export default List;
