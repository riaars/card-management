import type { JSX } from "react";
import {
  MdSchool,
  MdMovie,
  MdRestaurant,
  MdLocalGroceryStore,
  MdHealthAndSafety,
  MdHome,
  MdWork,
  MdPerson,
  MdBusinessCenter,
  MdShoppingBag,
  MdComputer,
  MdDirectionsCar,
  MdFlight,
  MdLightbulb,
  MdSpa,
} from "react-icons/md";

export const categoryIcons: Record<string, JSX.Element> = {
  education: <MdSchool />,
  entertainment: <MdMovie />,
  food: <MdRestaurant />,
  groceries: <MdLocalGroceryStore />,
  health: <MdHealthAndSafety />,
  home: <MdHome />,
  office: <MdWork />,
  personal: <MdPerson />,
  professional: <MdBusinessCenter />,
  shopping: <MdShoppingBag />,
  software: <MdComputer />,
  transport: <MdDirectionsCar />,
  travel: <MdFlight />,
  utilities: <MdLightbulb />,
  wellness: <MdSpa />,
};

export const getCategoryIcon = (category: string): JSX.Element => {
  const key = category.toLowerCase();
  return categoryIcons[key] ?? <MdShoppingBag />;
};
