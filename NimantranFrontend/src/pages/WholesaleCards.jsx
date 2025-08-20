import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { FaStar, FaFilter, FaChevronLeft, FaChevronRight, FaTimes, FaSearch } from "react-icons/fa";

const PAGE_SIZE = 8;

const SkeletonCard = () => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse h-full">
    <div className="h-40 bg-gray-200" />
    <div className="p-3 space-y-2">
      <div className="h-4 bg-gray-200 w-3/4 rounded" />
      <div className="h-4 bg-gray-200 w-1/2 rounded" />
      <div className="h-8 bg-gray-200 w-full rounded mt-3" />
    </div>
  </div>
);

const Chip = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1 rounded-full border text-xs transition ${
      active
        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
        : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
    }`}
  >
    {label}
  </button>
);

const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", { 
    style: "currency", 
    currency: "INR", 
    maximumFractionDigits: 0 
  }).format(n || 0);

const WholesaleCards = () => {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState("");

  // UI state
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [sort, setSort] = useState("relevance");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minMOQ, setMinMOQ] = useState("");
  const [activeCats, setActiveCats] = useState([]);
  const [showOnlyPopular, setShowOnlyPopular] = useState(false);
  const [showOnlyTrending, setShowOnlyTrending] = useState(false);
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Debounce search query
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [q]);

  // Fetch data
  useEffect(() => {
    const fetchWholesale = async () => {
      try {
        setLoading(true);
        setError("");
        const retailerToken = localStorage.getItem("retailerToken");
        const res = await axios.get(`${API_BASE_URL}/api/wholesaler/wholesaleCards?isAvailableForWholesale=true`, {
          headers: {
            Authorization: retailerToken ? `Bearer ${retailerToken}` : undefined,
          },
          withCredentials: true,
        });
        const data = Array.isArray(res.data?.data) ? res.data.data : res.data || [];
        setCards(data);
      } catch (err) {
        console.error(err);
        setError(
          err?.response?.data?.message ||
            "Unable to load wholesale cards. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchWholesale();
  }, []);

  // Compute categories dynamically
  const categories = useMemo(() => {
    const set = new Set();
    cards.forEach((c) => c?.category && set.add(c.category));
    return Array.from(set).sort();
  }, [cards]);

  // Filter + sort
  const filtered = useMemo(() => {
    let list = [...cards];

    // Search
    if (debouncedQ) {
      list = list.filter((c) => {
        const hay =
          `${c?.name ?? ""} ${c?.category ?? ""} ${c?.description ?? ""} ${c?.specifications?.color ?? ""} ${c?.specifications?.material ?? ""}`.toLowerCase();
        return hay.includes(debouncedQ);
      });
    }

    // Category chips
    if (activeCats.length) {
      list = list.filter((c) => activeCats.includes(c?.category));
    }

    // Price range
    const min = Number(minPrice);
    const max = Number(maxPrice);
    list = list.filter((c) => {
      const base = c?.wholesalePrice ?? c?.price ?? 0;
      if (!isNaN(min) && minPrice !== "" && base < min) return false;
      if (!isNaN(max) && maxPrice !== "" && base > max) return false;
      return true;
    });

    // MOQ filter
    const moq = Number(minMOQ);
    if (!isNaN(moq) && minMOQ !== "") {
      list = list.filter((c) => (c?.moq ?? 1) >= moq);
    }

    // Popular/Trending toggles
    if (showOnlyPopular) list = list.filter((c) => c?.isPopular);
    if (showOnlyTrending) list = list.filter((c) => c?.isTrending);

    // Sorting
    list.sort((a, b) => {
      const aPrice = a?.wholesalePrice ?? a?.price ?? 0;
      const bPrice = b?.wholesalePrice ?? b?.price ?? 0;
      if (sort === "price-asc") return aPrice - bPrice;
      if (sort === "price-desc") return bPrice - aPrice;
      if (sort === "rating-desc") return (b?.rating ?? 0) - (a?.rating ?? 0);
      if (sort === "discount-desc") {
        const ad = a?.discount ?? 0;
        const bd = b?.discount ?? 0;
        return bd - ad;
      }
      // relevance default: trending/popular up
      const aScore = (a?.isTrending ? 2 : 0) + (a?.isPopular ? 1 : 0);
      const bScore = (b?.isTrending ? 2 : 0) + (b?.isPopular ? 1 : 0);
      return bScore - aScore;
    });

    return list;
  }, [
    cards,
    debouncedQ,
    activeCats,
    minPrice,
    maxPrice,
    minMOQ,
    showOnlyPopular,
    showOnlyTrending,
    sort,
  ]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageSafe = Math.min(page, totalPages);
  const pageSlice = filtered.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [debouncedQ, activeCats, minPrice, maxPrice, minMOQ, showOnlyPopular, showOnlyTrending, sort]);

  const toggleCat = (cat) =>
    setActiveCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const Sidebar = (
    <aside className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 space-y-4 h-full">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <FaFilter className="opacity-70" />
          Filters
        </h3>
        <button 
          onClick={() => setMobileFiltersOpen(false)}
          className="md:hidden text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={18} />
        </button>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700">Search</label>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search cards..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
          />
        </div>
      </div>

      {categories.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm font-medium text-gray-700">Categories</div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                active={activeCats.includes(cat)}
                onClick={() => toggleCat(cat)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Min Price</label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min="0"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Max Price</label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min={minPrice || "0"}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">Min MOQ</label>
        <input
          type="number"
          value={minMOQ}
          onChange={(e) => setMinMOQ(e.target.value)}
          min="1"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="popular-filter"
            checked={showOnlyPopular}
            onChange={(e) => setShowOnlyPopular(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-200 h-4 w-4"
          />
          <label htmlFor="popular-filter" className="text-sm text-gray-700">
            Popular Only
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="trending-filter"
            checked={showOnlyTrending}
            onChange={(e) => setShowOnlyTrending(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-200 h-4 w-4"
          />
          <label htmlFor="trending-filter" className="text-sm text-gray-700">
            Trending Only
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Sort By</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
        >
          <option value="relevance">Relevance</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="discount-desc">Discount: High to Low</option>
        </select>
      </div>

      <button
        onClick={() => {
          setQ("");
          setActiveCats([]);
          setMinPrice("");
          setMaxPrice("");
          setMinMOQ("");
          setShowOnlyPopular(false);
          setShowOnlyTrending(false);
          setSort("relevance");
        }}
        className="w-full rounded-lg border border-gray-300 py-2 hover:bg-gray-50 transition text-sm font-medium"
      >
        Clear All Filters
      </button>
    </aside>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Wholesale Cards
        </h2>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <div className="text-sm text-gray-500">
            {loading ? "Loading..." : `${filtered.length} ${filtered.length === 1 ? 'card' : 'cards'}`}
          </div>
          <button
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white flex items-center gap-1 hover:bg-gray-50 transition"
            onClick={() => setMobileFiltersOpen(true)}
            aria-label="Open filters"
          >
            <FaFilter className="text-sm" />
            <span className="hidden xs:inline">Filters</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0 sticky top-4 h-fit">
          {Sidebar}
        </div>

        {/* Content */}
        <div className="flex-1">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 border border-red-200 mb-4 text-sm">
              {error}
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {loading
              ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : pageSlice.map((c) => {
                  const base = c?.wholesalePrice ?? c?.price ?? 0;
                  const off = c?.discount ?? 0;
                  const finalPrice = Math.max(0, base - off);
                  const pctOff = base > 0 ? Math.round((off / base) * 100) : 0;

                  return (
                    <div
                      key={c?._id}
                      className="group bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition h-full flex flex-col"
                    >
                      <div className="relative aspect-square">
                        <img
                          src={c?.images?.primaryImage || "/fallback.jpg"}
                          alt={c?.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {(c?.isTrending || c?.isPopular || pctOff > 0) && (
                          <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                            {c?.isTrending && (
                              <span className="text-[10px] px-2 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-200 font-medium">
                                Trending
                              </span>
                            )}
                            {c?.isPopular && (
                              <span className="text-[10px] px-2 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 font-medium">
                                Popular
                              </span>
                            )}
                            {pctOff > 0 && (
                              <span className="text-[10px] px-2 py-1 rounded-full bg-green-100 text-green-800 border border-green-200 font-medium">
                                {pctOff}% OFF
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="p-3 flex-1 flex flex-col">
                        <h3 className="font-medium text-gray-900 line-clamp-2 text-sm mb-1">
                          {c?.name}
                        </h3>

                        <div className="flex items-center gap-0.5 mt-auto mb-2 text-xs text-amber-600">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar
                              key={i}
                              className={`${
                                i < Math.round(c?.rating || 0)
                                  ? "opacity-100"
                                  : "opacity-20"
                              }`}
                              size={12}
                            />
                          ))}
                          <span className="text-gray-500 ml-0.5 text-xs">
                            ({c?.reviewsCount || 0})
                          </span>
                        </div>

                        <div className="mt-1">
                          <div className="flex flex-wrap items-baseline gap-1">
                            <div className="text-sm font-bold text-gray-900">
                              {formatINR(finalPrice)}
                            </div>
                            {off > 0 && (
                              <>
                                <div className="text-xs line-through text-gray-400">
                                  {formatINR(base)}
                                </div>
                                <div className="text-[10px] text-green-600 font-semibold">
                                  Save {formatINR(off)}
                                </div>
                              </>
                            )}
                          </div>
                          <div className="text-[10px] text-gray-500 mt-1">
                            MOQ: {c?.moq ?? 1} • In stock: {c?.quantityAvailable ?? 0}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            alert("Added to wholesale cart");
                          }}
                          className="w-full mt-3 rounded-lg bg-blue-600 text-white py-2 text-sm font-medium hover:bg-blue-700 transition shadow-sm"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
          </div>

          {/* Empty state */}
          {!loading && filtered.length === 0 && !error && (
            <div className="text-center py-10">
              <div className="text-gray-400 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="font-medium text-gray-600 mb-1">No cards found</div>
              <div className="text-sm text-gray-500">
                Try adjusting your filters or search terms
              </div>
            </div>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-center gap-3 mt-8">
              <button
                className="px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 text-sm"
                disabled={pageSafe <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <FaChevronLeft size={12} /> Previous
              </button>
              <div className="text-sm text-gray-600">
                Page <span className="font-semibold">{pageSafe}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </div>
              <button
                className="px-3 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 text-sm"
                disabled={pageSafe >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next <FaChevronRight size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-xs bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="h-full overflow-y-auto p-4">
              {Sidebar}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WholesaleCards;