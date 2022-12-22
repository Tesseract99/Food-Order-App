import cssClasses from "./styles/AvailableMeals.module.css";
import AvailableMealsCard from "./AvailableMealsCard";
import Meals from "./Meals";
import DUMMY_MEALS from "./DummyMeals";
import Card from "../UI/Card";
import { useState, useEffect } from "react";

const AvailableMeals = (props) => {
  const [mealsList, setMealsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHttpError(false);
    DUMMY_MEALS.then((data) => {
      setMealsList(data);
      return Promise.resolve();
    })
      .catch((error) => {
        setHttpError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  console.log("mealList", mealsList);
  const meals = mealsList.map((meal) => {
    return (
      <li>
        <AvailableMealsCard
          key={meal.id}
          id={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
        />
      </li>
    );
  });

  if (isLoading) {
    return (
      <section className={cssClasses.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={cssClasses.mealsLoading}>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <section className={cssClasses.meals}>
      <Card>
        <ul>{meals}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
