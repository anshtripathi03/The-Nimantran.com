import { Link } from "react-router-dom";

function ProductCard({ card }) {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition duration-300 overflow-hidden">
      <Link to={`/card/${card._id}`}>
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-3">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{card.title}</h3>
          <p className="text-sm text-gray-500 truncate">{card.category}</p>
          <p className="text-pink-600 font-bold mt-1">₹{card.price}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
