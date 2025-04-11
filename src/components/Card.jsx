const RestaurantMenu = () => {
  return (
    <UserCard name="Іван" age={25} email="ivan@example.com" avatarUrl="..." />
  );
};
const UserCard = (props) => {
  return (
    <>
      <p>--------------</p>
      <img src={props.avatarUrl} alt="" />
      <h2>{props.name}</h2>
      <p>{props.age}</p>
      <p>{props.email}</p>
      <p>--------------</p>
    </>
  );
};
export default RestaurantMenu;
