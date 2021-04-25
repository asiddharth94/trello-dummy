function handleDelete(source, cardDetails, localListData) {
  const sourceIndex = localListData.findIndex((item) => item === source);
  const removeIndex = localListData[sourceIndex].cards.findIndex((item) => {
    return item.title === cardDetails.title;
  });
  localListData[sourceIndex].cards.splice(removeIndex, 1);
}

function updateLocalStorage(listData) {
  localStorage.setItem("listData", JSON.stringify(listData));
  return JSON.parse(localStorage.getItem("listData"));
}

export { handleDelete, updateLocalStorage };
