import { Link } from "react-router-dom";

const Header = ({ searchText, setSearchText, handleSearch } = {}) => {
  return (
    <div className="flex justify-between items-center bg-rose-100 p-4 shadow-md">
      <div>
        <Link to="/home">
          <h2 className="text-2xl font-bold italic">
            A Hungry <span className="text-rose-500">Explorer</span>
          </h2>
        </Link>
      </div>

      {searchText !== undefined && (
        <div className="flex items-center flex-grow justify-center">
          <div className="search-bar">
            <input
              placeholder="Search recipe..."
              className="bg-white/75 p-3 px-8 lg:w-96 rounded-full outline-none shadow-lg"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <button
              className="px-4 py-1 bg-gray-200 m-4 rounded-lg hover:bg-gray-300"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center">
        <ul className="flex p-4 m-4 text-xl">
          <li className="px-4">
            <Link to="/home" className="hover:text-rose-500">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/favourites" className="hover:text-rose-500">Favourites</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
