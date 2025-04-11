import { element } from "prop-types";
import React, { useState } from "react";

const Cars = () => {
  const [car, setCar] = useState([]);
  const [carYear, setCarYear] = useState();
  const [carModel, setCarModel] = useState();
  const [carBrand, setCarBrand] = useState();

  const handleCarYear = (e) => {
    setCarYear(e.target.value);
  };
  const handleCarModel = (e) => {
    setCarModel(e.target.value);
  };
  const handleCarBrand = (e) => {
    setCarBrand(e.target.value);
  };
  const addCar = () => {
    setCar([...car, { year: carYear, model: carModel, brand: carBrand }]);
    setCarYear("");
    setCarModel("");
    setCarBrand("");
    console.log(car);
  };
  const remove = (index) => {
    let newList = car.filter((_, i) => i != index);
    setCar(newList);
  };

  return (
    <>
      <h1>Add cars</h1>
      <input
        onChange={handleCarYear}
        value={carYear}
        type="text"
        placeholder="add year"
      />
      <input
        value={carModel}
        onChange={handleCarModel}
        type="text"
        placeholder="add model"
      />
      <input
        value={carBrand}
        onChange={handleCarBrand}
        type="text"
        placeholder="add brand"
      />
      <button onClick={addCar}>add</button>
      <h2>Your cars</h2>
      <ul>
        <ItemCar allCar={car} removeFunc={remove} />
      </ul>
    </>
  );
};
const ItemCar = (props) => {
  const remove = (index) => {
    props.removeFunc(index);
  };
  return (
    <>
      {props.allCar.map((element, index) => (
        <li key={index}>
          Year: {element.year}, brand: {element.brand}, model:
          {element.model}
          <button onClick={() => remove(index)}>remove</button>
        </li>
      ))}
    </>
  );
};
export default Cars;
