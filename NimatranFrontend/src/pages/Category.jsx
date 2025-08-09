import { useParams } from "react-router-dom";
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";

// Sample card data
const allCards = [
  {
    _id: "1",
    title: "Royal Wedding Invite",
    category: "marriage",
    price: 40,
    image: "https://via.placeholder.com/300x200?text=Wedding+Card",
  },
  {
    _id: "2",
    title: "Simple Birthday Invite",
    category: "birthday",
    price: 20,
    image: "https://via.placeholder.com/300x200?text=Birthday+Card",
  },
  {
    _id: "3",
    title: "Luxury Marriage Card",
    category: "marriage",
    price: 60,
    image: "https://via.placeholder.com/300x200?text=Luxury+Card",
  },
];

function Category() {
  const { type } = useParams(); // category type from URL
  const [filters, setFilters] = useState({ price: 100 });

  const filteredCards = allCards.filter(
    (card) => card.category === type && card.price <= filters.price
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Filters Sidebar */}
      <div className="md:col-span-1">
        <FilterSidebar filters={filters} setFilters={setFilters} />
      </div>

      {/* Product Grid */}
      <div className="md:col-span-3">
        <h2 className="text-2xl font-bold capitalize mb-4">{type} Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => <ProductCard key={card._id} card={card} />)
          ) : (
            <p className="text-gray-500 col-span-full">No cards found for selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
