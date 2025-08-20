import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import CardForm from "../components/CardForm.jsx";

const ManageCards = () => {
  const [cards, setCards] = useState([]);
  const [initialForm, setInitialForm] = useState({
    name: "",
    category: "marriage",
    price: "",
    discount: "",
    quantityAvailable: "",
    rating: "",
    description: "",
    reviewsCount: "",
    isPopular: false,
    isTrending: false,
    isAvailableForWholesale: false,
    wholesalePrice: "",
    specifications: {
      material: "",
      dimensions: "",
      printing: "",
      weight: "",
      color: "",
      customizable: false,
    },
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [cardId, setCardId] = useState(null);

  // Fetch all cards
  const fetchCards = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/user/card/getAllCards`, {
        withCredentials: true,
      });
      setCards(res.data.data);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  // Handle delete card
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this card?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/deleteCard/${id}`, {
        withCredentials: true,
      });
      setCards(cards.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  // Handle update card
  const handleUpdate = async (id) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/admin/getCard/${id}`, {
        withCredentials: true,
      });
      setInitialForm(res.data.data); // pre-fill form
      setCardId(id);
      setIsUpdating(true);
      window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to form
    } catch (error) {
      console.error("Error fetching card for update:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Cards</h1>

      {/* Card Form */}
   <CardForm
  initialForm={initialForm}
  cardId={cardId}
  isUpdating={isUpdating}
  fetchCards={fetchCards}
  setIsUpdating={setIsUpdating}
/>


      {/* Cards Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Title</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Discount(Rs)</th>
              <th className="py-2 px-4">Quantity Available</th>
              <th className="py-2 px-4">Description</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card._id} className="border-b">
                <td className="py-2 px-4">{card.name}</td>
                <td className="py-2 px-4">{card.category}</td>
                <td className="py-2 px-4">{card.price}</td>
                <td className="py-2 px-4">{card.discount}</td>
                <td className="py-2 px-4">{card.quantityAvailable}</td>
                <td className="py-2 px-4">{card.description}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleDelete(card._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleUpdate(card._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-800"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCards;
