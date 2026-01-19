import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useFavorites } from "../FavoritesContext";

const Favourites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-rose-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-rose-600 text-center mb-8">Your Favourite Recipes</h1>
          {favorites.length === 0 ? (
            <div className="text-center">
              <p className="text-xl text-gray-600 mb-4">No favourite recipes yet. Start exploring!</p>
              <Link
                to="/home"
                className="bg-gradient-to-br from-rose-400 to-rose-600 text-rose-50 p-3 px-8 rounded-lg text-lg uppercase font-medium tracking-wider inline-block shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300"
              >
                Explore Recipes
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((recipe) => (
                <div
                  key={recipe.idMeal}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
                >
                  <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="font-bold text-lg mb-2">{recipe.strMeal}</h2>
                    <p className="text-sm text-gray-600 mb-2">{recipe.strCategory} • {recipe.strArea}</p>
                    <div className="flex justify-between items-center">
                      <Link
                        to={`/recipe/${recipe.idMeal}`}
                        className="bg-gradient-to-br from-rose-400 to-rose-600 text-rose-50 p-2 px-4 rounded text-sm uppercase font-medium tracking-wider shadow-md shadow-rose-200 hover:shadow-lg hover:shadow-rose-300 duration-300"
                      >
                        View Recipe
                      </Link>
                      <button
                        onClick={() => removeFromFavorites(recipe.idMeal)}
                        className="text-red-500 hover:text-red-700 p-2"
                        title="Remove from favorites"
                      >
                        <svg
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Favourites;
