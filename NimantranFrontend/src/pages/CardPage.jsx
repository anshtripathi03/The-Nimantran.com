import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import axios from "axios";
import { API_BASE_URL } from "../config.js";
import Card from "../components/Card.jsx";

const CardPage = ({ category }) => {
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
      const res = await axios.get(`${API_BASE_URL}/api/user/card/getAllCards`);
      return res.data.data || [];
    } catch (error) {
      console.error("Issue while fetching products", error);
      return [];
    }
  }, []);

  useEffect(() => {
    const fetchAndFilter = async () => {
      const dbCards = await fetchProducts();
      if (!dbCards.length) {
        setFilteredCards([]);
        return;
      }

      const fuse = new Fuse(dbCards, {
        includeScore: true,
        threshold: 0.4,
        keys: ["name", "category", "description", "color", "dimensions"],
      });

      let results = [];
      if (query) {
        results = fuse.search(query.toLowerCase().trim());
      } else if (category) {
        results = fuse.search(category.toLowerCase().trim());
      }

      const matches = results.length
        ? Array.from(new Map(results.map(res => [res.item._id || res.item.id, res.item])).values())
        : !query && !category
        ? dbCards
        : [];

      const finalFiltered = matches.filter(
        card => !card.price || (card.price >= minPrice && card.price <= maxPrice)
      );

      setFilteredCards(finalFiltered);
      setCurrentPage(1);
    };

    fetchAndFilter();
  }, [query, category, minPrice, maxPrice, fetchProducts]);

  // Pagination logic
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
  const paginatedCards = filteredCards.slice(
    (currentPage - 1) * cardsPerPage,
    currentPage * cardsPerPage
  );

  return (
    <div className="px-2 py-4 md:p-6 bg-white font-serif max-w-screen-xl mx-auto">
      {/* Price Filter */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-center gap-2 sm:gap-4 mb-4 border-b pb-4">
        <div className="w-full sm:w-auto flex items-center gap-2">
          <label className="text-gray-700 text-sm sm:text-base font-medium whitespace-nowrap">
            Min Price:
          </label>
          <input
            type="number"
            className="border border-gray-300 rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            min="0"
          />
        </div>
        <div className="w-full sm:w-auto flex items-center gap-2">
          <label className="text-gray-700 text-sm sm:text-base font-medium whitespace-nowrap">
            Max Price:
          </label>
          <input
            type="number"
            className="border border-gray-300 rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            min={minPrice}
          />
        </div>
      </div>

      {/* Cards Grid */}
      {paginatedCards.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {paginatedCards.map((card, index) => (
            <div key={card._id || card.id || index} className="flex justify-center">
              <Card card={card} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-gray-600 text-center py-8 text-base sm:text-lg">
            No cards found matching your criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-6 gap-2">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 rounded border bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            >
              &larr; Prev
            </button>
          )}

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 rounded border transition-all duration-200 ${
                  currentPage === pageNum
                    ? "bg-yellow-500 text-white border-yellow-500 font-semibold"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 rounded border bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            >
              Next &rarr;
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CardPage;