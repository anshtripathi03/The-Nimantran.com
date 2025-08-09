import { useParams,useNavigate } from "react-router-dom";
import { useRef, useState ,useContext,useEffect,useCallback} from "react";
import {Link} from "react-router-dom"
import dummyCards from "../Data.jsx"
import {CartContext} from "../context/CartContext";
import axios from "axios"
const CardDetail = () => {

  const fetchProducts = useCallback(async () => {
    try {
      const res = await axios.get("/api/product/fetchProduct");
      return res.data.data || [];
    } catch (error) {
      console.error("Issue while fetching products", error);
      return [];
    }
  }, []);

  
 





    const navigate = useNavigate();
const [data, setData] = useState([]);

useEffect(() => {
  const getData = async () => {
    const res = await fetchProducts();
    setData(res || []);
  };

  getData();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, []);


  const { id } = useParams();
  const {addToCart,addedItemId,handleAddToCart,handleBuyNow} = useContext(CartContext)

 
  console.log(data)
  const card = data.find((card) => card._id == id)|| {
    id,
    title: "Luxury Golden Floral Wedding Invitation Card",
    price: 199,
    category: "Wedding",
    brand: "TheNimantran",
    availability: "In Stock",
    rating: 4.6,
    reviewsCount: 127,
    deliveryInfo: "Get it by Aug 8 - Aug 10",
    returnPolicy: "7-day return policy for unused and undamaged items.",
    highlights: [
      "Premium quality textured card stock",
      "Elegant golden floral mandala design",
      "Front and back printing included",
      "Envelope included for each card",
      "Customizable names and date (upon request)",
    ],
    description: `This premium golden floral wedding invitation card is designed to make your special day even more memorable. Featuring intricate mandala artwork and elegant fonts, it brings a touch of royalty to your wedding. Printed on high-quality textured paper, both the front and back are artistically designed. Ideal for traditional and modern ceremonies alike.`,
    images: {
      front:
        "https://static.vecteezy.com/system/resources/previews/000/196/918/original/beautiful-golden-invitation-background-with-mandala-decoration-vector.jpg",
      back:
        "https://static.vecteezy.com/system/resources/previews/000/254/814/original/vector-abstract-beautiful-wedding-invitation-card-design.jpg",
    },
    specifications: {
      material: "Premium Textured Cardstock",
      dimensions: "7 x 5 inches (Folded)",
      printing: "High-quality digital print",
      weight: "30g per card",
      color: "Gold with Cream base",
      envelopeIncluded: true,
      customizable: true,
      minimumOrderQuantity: 25,
    },
  };



  if (!card) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Error: Card not found.
      </div>
    );
  }
  const imageRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(card.images.primaryImage);
  const [zoomStyle, setZoomStyle] = useState({ backgroundPosition: "0% 0%" });
  const [showZoom, setShowZoom] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomStyle({
      backgroundImage: `url(${currentImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%",
    });

    const card = imageRef.current;
    const centerX = width / 2;
    const centerY = height / 2;
    const rotateX = ((e.clientY - top - centerY) / centerY) * 10;
    const rotateY = ((e.clientX - left - centerX) / centerX) * -10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
    imageRef.current.style.transform = `rotateX(0deg) rotateY(0deg)`;
  };

  return (<>
    <div className="min-h-screen bg-[#f9f1e7] text-gray-800 flex flex-col md:flex-row p-6 gap-8">
      {/* Image & Zoom Section */}
      <div
        className="w-full md:w-1/2 flex flex-row items-start gap-4"
        onMouseLeave={handleMouseLeave}
      >
        {/* Thumbnails */}
        <div className="flex flex-col gap-3">
          <img
            src={card.images.primaryImage}
            onClick={() => setCurrentImage(card.images.primaryImage)}
            className={`w-20 h-24 rounded-md border cursor-pointer hover:border-orange-500 ${currentImage === card.images.front ? "border-orange-500" : "border-gray-300"
              }`}
            alt="Front View"
          />
          <img
            src={card.images.secondaryImage || " "}
            onClick={() => setCurrentImage(card.images.secondaryImage)}
            className={`w-20 h-24 rounded-md border cursor-pointer hover:border-orange-500 ${currentImage === card.images.back ? "border-orange-500" : "border-gray-300"
              }`}
            alt="Back View"
          />
        </div>

        
        <div
          ref={imageRef}
          className="w-[300px] h-[400px] bg-white rounded-xl shadow-xl overflow-hidden transform transition duration-200 ease-in-out"
          onMouseMove={(e) => {
            handleMouseMove(e);
            setShowZoom(true);
          }}
          style={{
            backgroundImage: `url(${currentImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Zoom Preview */}
        {showZoom && (
          <div
            className="hidden md:block w-[300px] h-[400px] rounded-xl border-2 border-orange-400 shadow-md ml-6"
            style={{
              ...zoomStyle,
              backgroundRepeat: "no-repeat",
            }}
          />
        )}
      </div>

      {/* card Info */}
      <div className="w-full md:w-1/2 space-y-4 px-2">
        <h2 className="text-3xl font-serif font-bold">{card.title}</h2>
        <div className="flex items-center gap-3">
          <p className="text-xl text-orange-600 font-semibold">₹{card.price}</p>
          <span className="text-sm text-green-600 font-medium">{card.availability}</span>
        </div>
        <p className="text-gray-600 text-sm">Brand: {card.brand}</p>
        <p className="text-sm text-gray-600">
          Rating: ⭐ {card.rating} ({card.reviewsCount} reviews)
        </p>
        <p className="text-gray-700">{card.description}</p>

        <ul className="list-disc pl-5 text-sm text-gray-800">
          {card.highlights?.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>

        <div className="mt-4">


          <details>
          
            <summary>
              <h4 className="text-lg font-semibold mb-1">Specifications:</h4>

            </summary>
            <table className="text-sm text-gray-700 w-full">
              <tbody>
                {Object.entries(card.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td className="pr-4 py-1 font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</td>
                    <td className="py-1">{value === true ? "Yes" : value === false ? "No" : value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </div>

        <p className="text-sm mt-3 text-gray-700">📦 {card.deliveryInfo}</p>
        <p className="text-sm text-gray-700">↩️ {card.returnPolicy}</p>

        <div className="flex gap-4 mt-5">
          <button className={`${addedItemId ? 'bg-green-500':'bg-orange-500' } text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition`} onClick={(e)=>{handleAddToCart(card?._id,1,e)}}>
          {   addedItemId ? "Added":" Add to Cart"  }  
          </button>
          <button className="bg-green-600 text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition" onClick={(e)=>{handleBuyNow(card,e,navigate)}}>
            Buy Now
          </button>
        </div>
      </div>

    </div>
          
{/* Similar Cards Section */}
<div className="mt-10">
  <h2 className="text-2xl font-semibold mb-4">Similar Cards</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {dummyCards
      .filter(
        (item) => item.category === card.category && item._id !== card._id
      )
      .slice(0, 4)
      .map((similarCard) => (
        <div key={similarCard._id} className="bg-white rounded-lg shadow-md p-4">
          <img
            src={similarCard.image}
            alt={similarCard.title}
            className="w-full h-52 object-cover rounded"
          />
          <h3 className="text-lg font-semibold mt-2 line-clamp-1">{similarCard.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{similarCard.description}</p>
          <p className="text-[#c28800] font-bold mt-1">₹{similarCard.price}</p>
          <Link
            to={`/card/${similarCard._id}`}
            className="inline-block mt-2 text-blue-500 hover:underline"
          >
            View Details
          </Link>
        </div>
      ))}
  </div>
</div>
</>
  );
};

export default CardDetail;
