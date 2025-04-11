const RestaurantMenu = () => {
  const menu = [
    {
      title: "Сніданки",
      items: [
        { name: "Скрембл з тостом", price: 95 },
        { name: "Овсянка з фруктами", price: 80 },
      ],
    },
    {
      title: "Напої",
      items: [
        { name: "Лате", price: 55 },
        { name: "Чай зелений", price: 35 },
      ],
    },
  ];

  return (
    <>
      <CategoryList menu={menu} />
    </>
  );
};
const CategoryList = (props) => {
  return (
    <>
      {props.menu.map((element, index) => (
        <div key={index}>
          <h3>{element.title}</h3>
          <ul>
            {element.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                {item.name} - {item.price} грн
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};
export default RestaurantMenu;
