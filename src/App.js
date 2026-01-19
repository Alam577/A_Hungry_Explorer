import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Favourites from "./components/Favourites";
import Body from "./components/Body";
import Recipe from "./components/Recipe";
import { FavoritesProvider } from "./FavoritesContext";

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/recipe/:recipeId" element={<Recipe />} />
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
