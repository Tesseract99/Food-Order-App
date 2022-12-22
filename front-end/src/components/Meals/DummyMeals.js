import axios from "axios";

const url = "http://localhost:5000/";

const getMeals = () => {
  const req = axios
    .get(url)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      throw Error(err);
    });
  return req;
};

const DUMMY_MEALS = getMeals();
export default DUMMY_MEALS;
