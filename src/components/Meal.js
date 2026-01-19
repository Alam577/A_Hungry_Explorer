import { Link } from "react-router-dom";

const Meal = ({ meals }) => {
  return (
    <div className="flex flex-wrap gap-5">
      {meals.map((res) => {
        return (
          <div
            key={res.idMeal}
            className="m-4 p-4 w-[250px] rounded-lg bg-gray-200 hover:bg-slate-300"
          >
            <img src={res.strMealThumb} alt="Food Images" />
            <h1 className="font-bold">{res.strMeal}</h1>
            <h1>Category: {res.strCategory}</h1>
            <h1>Area: {res.strArea}</h1>
            <Link
              to={"/recipe/" + res.idMeal}
              className="bg-gradient-to-br from-rose-400 to-rose-600 text-rose-50 p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-2 inline-block shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300"
            >
              View Recipe
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Meal;
