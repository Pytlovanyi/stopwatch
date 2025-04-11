import React, { useState } from "react";

const ToDoList2 = () => {
  const [yourProducts, setYourProducts] = useState([]);
  const [productFromInput, setProductFromInput] = useState("");
  const [boughtProduct, setBoughtProduct] = useState(0);
  const [allCountProduct, setAllCountProduct] = useState(0);

  const hanleChangeInput = (e) => {
    setProductFromInput(e.target.value);
  };
  const addProduct = () => {
    if (productFromInput.trim() === "") return;
    const newList = [
      ...yourProducts,
      { name: productFromInput, bought: false },
    ];
    setYourProducts(newList);
    setProductFromInput("");
    countProduct(newList);
  };
  const deleteItem = (index) => {
    const newProductList = yourProducts.filter((_, i) => i !== index);
    setYourProducts(newProductList);
    countProduct(newProductList);
  };
  const countProduct = (list = yourProducts) => {
    let boughtProduct1 = 0;
    let total = list.length;
    list.map((element) => {
      if (element.bought) boughtProduct1++;
    });
    setBoughtProduct(boughtProduct1);
    setAllCountProduct(total);
  };
  const changeStatusProduct = (index) => {
    const updatedProducts = yourProducts.map((item, i) => {
      if (i === index) {
        return { ...item, bought: !item.bought };
      }
      return item;
    });
    setYourProducts(updatedProducts);
    countProduct(updatedProducts); // передаємо новий список
  };
  const moveUpParent = (index) => {
    if (index === 0) return;
    const prevList = [...yourProducts];
    [prevList[index - 1], prevList[index]] = [
      prevList[index],
      prevList[index - 1],
    ];
    setYourProducts(prevList);
  };
  const moveDownParent = (index) => {
    if (index === yourProducts.length - 1) return;
    const prevList = [...yourProducts];
    [prevList[index], prevList[index + 1]] = [
      prevList[index + 1],
      prevList[index],
    ];
    setYourProducts(prevList);
  };
  return (
    <>
      <h1>Your Product List</h1>
      <p>
        You have bought <b>{boughtProduct} </b>out of <b>{allCountProduct} </b>
        items.
      </p>
      <div>
        <input
          value={productFromInput}
          type="text"
          placeholder="text your product"
          onChange={hanleChangeInput}
        />
        <button onClick={addProduct}>add </button>
        <ul>
          <ItemList
            yourProducts={yourProducts}
            onDelete={deleteItem}
            onChangeStatus={changeStatusProduct}
            onMoveUp={moveUpParent}
            onMoveDown={moveDownParent}
          />
        </ul>
      </div>
    </>
  );
};

const ItemList = (props) => {
  const deleteProduct = (index) => {
    props.onDelete(index);
  };
  const changeStatus = (index) => {
    props.onChangeStatus(index);
  };
  const moveUp = (index) => {
    props.onMoveUp(index);
  };
  const moveDown = (index) => {
    props.onMoveDown(index);
  };
  return (
    <>
      {props.yourProducts.map((element, index) => (
        <li
          key={index}
          onClick={() => changeStatus(index)}
          style={{
            textDecoration: element.bought ? "line-through" : "none",
          }}
        >
          {element.name}
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteProduct(index);
            }}
          >
            x
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              moveUp(index);
            }}
          >
            up
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              moveDown(index);
            }}
          >
            down
          </button>
        </li>
      ))}
    </>
  );
};
export default ToDoList2;
