import { useContext, useEffect, useState,useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import Fuse from "fuse.js";
import axios from "axios"
import dummyCards from "../Data.jsx";
import Card from "../components/Card";

const CardPage = ({category}) => {
  // const { category } = useParams()  ;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const [filteredCards, setFilteredCards] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 8;
  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get("/api/product/fetchProduct");
      return res.data.data || [];
    } catch (error) {
      console.error("Issue while fetching products", error);
      return [];
    }
  }, []);







useEffect(() => {
  const fetchAndFilter = async () => {
    const dbCards = await fetchProducts();  // <-- Wait for data

    if (!dbCards || dbCards.length === 0) {
      setFilteredCards([]);
      return;
    }

    const options = {
      includeScore: true,
      threshold: 0.4,
      findAllMatches: true,
      keys: [
        "name",
        "category",
        "description",
        "color",
        "dimensions",
      ],
    };

    const fuse = new Fuse(dbCards, options);

    let results = [];

    if (query) {
      results = fuse.search(query.toLowerCase().trim());
    } else if (category) {
      results = fuse.search(category.toLowerCase().trim());
    }

    const matches = results.length
      ? Array.from(new Map(results.map((res) => [res.item._id || res.item.id, res.item])).values())
      : !query && !category
        ? dbCards
        : [];

    const finalFiltered = matches.filter(
      (card) =>
        (!card.price || (card.price >= minPrice && card.price <= maxPrice))
    );

    setFilteredCards(finalFiltered);
    setCurrentPage(1);
  };

  fetchAndFilter();
}, [query, category, minPrice, maxPrice]);


  // Pagination logic
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  return (
    <div className="p-4 bg-white font-serif min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-[#c68b00]">
        {!category?   `Showing results for:`:"" }  
        <span className="text-[#b37700] italic">{query || category || "All"}</span>
      </h2>

      {/* Price Filter */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <label className="flex items-center gap-2 text-[#996600]">
          Min Price:
          <input
            type="number"
            className="border border-[#cc9900] px-2 py-1 w-24 bg-white text-black"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
        </label>
        <label className="flex items-center gap-2 text-[#996600]">
          Max Price:
          <input
            type="number"
            className="border border-[#cc9900] px-2 py-1 w-24 bg-white text-black"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
      </div>

      {/* Cards */}
      <div className="flex flex-wrap justify-start gap-3 sm:gap-4 md:gap-5">
  {paginatedCards.length > 0 ? (
    paginatedCards.map((card, index) => (
      <div key={card._id || card.id || index} className="w-[46%] sm:w-[31%] md:w-[23%]">
        <Card card={card} />
      </div>
    ))
  ) : (
    <p className="text-gray-600">No cards found.</p>
  )}
</div>


      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? "bg-gradient-to-r from-[#FFD700] to-[#FFAA00] text-white font-semibold"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardPage;
