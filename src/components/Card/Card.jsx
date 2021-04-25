import "./Card.css";

function Card({ id, title, description, onCardDrag, deleteCard }) {
  return (
    <div id={id} className="card" draggable onDragStart={onCardDrag}>
      <header className="card-header">
        <h3>{title}</h3>
        <div id={title} className="card-delete" onClick={deleteCard}>
          X
        </div>
      </header>
      <div className="card-description">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Card;
