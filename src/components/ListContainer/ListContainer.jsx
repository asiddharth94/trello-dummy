import { useState } from "react";

import "./ListContainer.css";
import List from "../List/List";
import AddList from "../AddList/AddList";
import { mockData } from "../../utility/mockData";
import { handleDelete, updateLocalStorage } from "../../utility/util";

function ListContainer() {
  const localListData =
    JSON.parse(localStorage.getItem("listData")) || mockData;

  const [listdata, setListdata] = useState(localListData);

  function onAddList(list) {
    localListData.push(list);
    const updatedData = updateLocalStorage(localListData);
    setListdata(updatedData);
  }

  function getSourceInfo(cardId) {
    let source, cardDetails;

    for (let i = 0; i < localListData.length; i++) {
      for (let j = 0; j < localListData[i].cards.length; j++) {
        if (localListData[i].cards[j].title === cardId) {
          source = localListData[i];
          cardDetails = localListData[i].cards[j];
          return { source, cardDetails };
        }
      }
    }
    return false;
  }

  function getTargetInfo(list) {
    const target = localListData.filter((item) => {
      return item.title === list;
    });

    return target;
  }

  function addCard(newCard, listTitle) {
    const activeListIndex = localListData.findIndex(
      (item) => item.title === listTitle
    );
    localListData[activeListIndex].cards.push(newCard);
    const updatedData = updateLocalStorage(localListData);
    setListdata(updatedData);
  }

  function deleteCard(event) {
    const { source, cardDetails } = getSourceInfo(event.target.id);
    handleDelete(source, cardDetails, localListData);
    const updatedData = updateLocalStorage(localListData);
    setListdata(updatedData);
  }

  function deleteAllCards({ target }) {
    const index = localListData.findIndex((item) => {
      return item.title === target.id;
    });
    localListData[index].cards = [];
    const updatedData = updateLocalStorage(localListData);
    setListdata(updatedData);
  }

  function updateOnDrop(cardInfo, targetListInfo) {
    const { source, cardDetails } = getSourceInfo(cardInfo);
    const targetList = getTargetInfo(targetListInfo);

    const addIndex = localListData.findIndex((item) => {
      return item.title === targetList[0].title;
    });
    localListData[addIndex].cards.unshift(cardDetails);
    handleDelete(source, cardDetails, localListData);
    const updatedData = updateLocalStorage(localListData);
    setListdata(updatedData);
  }

  return (
    <div className="app-list-container">
      <AddList onAddList={onAddList} />
      <div className="app-list">
        {listdata.map((list) => {
          return (
            <List
              id={list.title}
              key={list.title}
              listTitle={list.title}
              cards={list.cards}
              updateOnDrop={updateOnDrop}
              addCard={addCard}
              deleteCard={deleteCard}
              deleteAllCards={deleteAllCards}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ListContainer;
