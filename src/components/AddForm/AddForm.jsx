import "./AddForm.css";

function AddForm({
  newItem,
  handleOnChange,
  handleOnSubmit,
  isAddCard,
  errors,
}) {
  return (
    <div
      className={isAddCard ? "add-modal card-modal" : "add-modal list-modal"}
    >
      <form className="add-form">
        <div className="form-group">
          <label htmlFor="title">Title: </label>
          <input
            required
            id="title"
            type="text"
            name="title"
            value={newItem.title}
            onChange={handleOnChange}
          />
          {errors.title ? <div className="error">{errors.title}</div> : ""}
        </div>
        {isAddCard ? (
          <div className="form-group">
            <label htmlFor="desc">Desc: </label>
            <input
              required
              id="desc"
              type="text"
              name="desc"
              value={newItem.desc}
              onChange={handleOnChange}
            />

            {errors.desc ? <div className="error">{errors.desc}</div> : ""}
          </div>
        ) : (
          ""
        )}
        <button className="btn-submit" type="submit" onClick={handleOnSubmit}>
          Add
        </button>
      </form>
    </div>
  );
}

export default AddForm;
