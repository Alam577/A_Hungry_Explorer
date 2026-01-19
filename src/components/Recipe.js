import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useFavorites } from "../FavoritesContext";

const Recipe = () => {
  const [recipe, setRecipe] = useState([]);
  const { recipeId } = useParams();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await fetch(
          "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + recipeId
        );
        const recipeJsonData = await recipeData.json();
        setRecipe(recipeJsonData.meals || []);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleFavoriteToggle = (res) => {
    if (isFavorite(res.idMeal)) {
      removeFromFavorites(res.idMeal);
    } else {
      addToFavorites(res);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-rose-50">
        {recipe.length === 0 ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto"></div>
            <p className="mt-4 text-xl">Loading recipe...</p>
          </div>
        ) : (
          recipe.map((res) => (
            <div key={res.idMeal} className="max-w-6xl mx-auto px-4 py-8">
              {/* Hero Section */}
              <div className="relative mb-8">
                <img
                  src={res.strMealThumb}
                  alt="Food"
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2">{res.strMeal}</h1>
                    <h2 className="text-xl md:text-2xl">{res.strArea} Cuisine</h2>
                    <h3 className="text-lg">Category: {res.strCategory}</h3>
                  </div>
                </div>
                <button
                  onClick={() => handleFavoriteToggle(res)}
                  className="absolute top-4 right-4 bg-white bg-opacity-80 p-3 rounded-full shadow-lg hover:bg-opacity-100 transition"
                >
                  <svg
                    className={`w-6 h-6 ${isFavorite(res.idMeal) ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Content Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Ingredients */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-rose-600 mb-4">INGREDIENTS</h2>
                  <ul className="space-y-2">
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((index) => {
                      const ingredient = res[`strIngredient${index}`];
                      const measure = res[`strMeasure${index}`];
                      if (ingredient && measure) {
                        return (
                          <li key={index} className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="font-medium">{ingredient}</span>
                            <span className="text-gray-600">{measure}</span>
                          </li>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </ul>
                </div>

                {/* Instructions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-rose-600 mb-4">INSTRUCTIONS</h2>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{res.strInstructions}</p>
                </div>
              </div>

              {/* Video Section */}
              {res.strYoutube && (
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-rose-600 mb-4">VIDEO TUTORIAL</h2>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      className="w-full h-64 md:h-96 rounded-lg"
                      title="recipeVideo"
                      src={`https://www.youtube.com/embed/${getVideoId(res.strYoutube)}`}
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

// Function to extract video ID from YouTube URL
const getVideoId = (youtubeUrl) => {
  const videoId = youtubeUrl.split("v=")[1]; // Extract video ID from URL
  const ampersandPosition = videoId.indexOf("&");
  if (ampersandPosition !== -1) {
    return videoId.substring(0, ampersandPosition);
  } else {
    return videoId;
  }
};

export default Recipe;
