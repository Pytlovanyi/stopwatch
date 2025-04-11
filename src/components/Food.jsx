const Food = () => {
  const food = ["banana", "watermelon", "cucumber", "garlic"];
  return (
    <>
      <ul>
        {food.map((el) => (
          <li>{el}</li>
        ))}
      </ul>
    </>
  );
};
export default Food;
