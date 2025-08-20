import React, { useEffect, useState } from "react";
import axios from "axios";
const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("/admin/getAllReviews",{
        withCredentials:true
      });
      setReviews(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await del(`/admin/deleteReview/${id}`);
      setReviews(reviews.filter(r => r._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Reviews</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">User</th>
              <th className="py-2 px-4">Product</th>
              <th className="py-2 px-4">Rating</th>
              <th className="py-2 px-4">Comment</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews?.map(r => (
              <tr key={r._id} className="border-b">
                <td className="py-2 px-4">{r.userName}</td>
                <td className="py-2 px-4">{r.productTitle}</td>
                <td className="py-2 px-4">{r.rating}</td>
                <td className="py-2 px-4">{r.comment}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleDelete(r._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800">
                    Delete
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

export default Reviews;
