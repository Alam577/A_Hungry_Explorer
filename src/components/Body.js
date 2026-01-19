import FryingPan from "./FryingPan";
import { useState, useEffect } from "react";
import Meal from "./Meal";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useFavorites } from "../FavoritesContext";

const Body = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [meals, setMeals] = useState([]);
  const { isFavorite } = useFavorites();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.themealdb.com/api/json/v1/1/search.php?s="
    );
    const jsonData = await data.json();
    setFoodItems(jsonData.meals);
  };

  const handleSearch = async () => {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    );
    const jsonData = await data.json();
    setMeals(jsonData.meals);
  };

  return (
    <>
      <Header searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch} />
      <div className="min-h-screen">
        {meals === null ? (
          <div className="text-2xl lg:text-4xl text-center font-semibold p-20">
            Nothing to show, please search something else!
            <FryingPan />
          </div>
        ) : meals && meals.length > 0 ? (
          <Meal meals={meals} />
        ) : (
          <div className="flex flex-wrap gap-5 bg-rose-100 justify-center p-8">
            {foodItems.map((res) => {
              const favorite = isFavorite(res.idMeal);
              return (
                <div
                  key={res.idMeal}
                  className="m-4 p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-lg bg-gray-200 hover:bg-slate-300 transition duration-300 shadow-lg relative"
                >
                  {favorite && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                      <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                    </div>
                  )}
                  <img src={res.strMealThumb} alt="Food Images" className="w-full h-48 object-cover rounded" />
                  <h1 className="font-bold text-lg mt-2">{res.strMeal}</h1>
                  <h1 className="text-sm">Category: {res.strCategory}</h1>
                  <h1 className="text-sm">Area: {res.strArea}</h1>
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
        )}
      </div>
      <Footer />
    </>
  );
};

export default Body;
