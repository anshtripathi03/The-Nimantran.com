import React, { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";

export default function DeliveryBoard() {

  const [status,setStatus]= useState(null);
  const location = useLocation();
  const order = location.state?.order;

  const orderStatus = async () =>{
    try {
      const res = await axios.get(`${API_BASE_URL}/api/user/....`,{withCredentials:true});
      console.log(res);
      setStatus(res.data.data.status);
    } catch (error) {
      
    }
  }

  useEffect(() => {
    // orderStatus();
    console.log("Returned Order:", order);
  }, [order]);

  if (!order) {
    return <p className="text-center py-10">No order data passed.</p>;
  }

  return (
    <div>
      <div className="w-[93%] mx-12 my-5 shadow-[10px_10px_20px_#000] rounded-xl">
      <div className="w-full p-6">
        <h1 className="text-3xl mb-5">{order.items[0].name}</h1>
        <div className="text-xl">
          <div className="grid grid-cols-3 gap-4">
            <h4>Name: {order.shippingAddress.name}</h4>
            <h5>Contact: {order.shippingAddress.phone}</h5>
            <h5>Alternate Contact: {order.shippingAddress.alternatePhone}</h5>
          </div>
            <h4 className="my-5">Shipping Address:-</h4>
          <div className="grid grid-rows-2 gap-3">
            <div className="grid grid-cols-3 gap-4">
              <h5>Road/Area/Colony: {order.shippingAddress.roadAreaColony}</h5>
              <h5>Landmark: {order.shippingAddress.landmark}</h5>
              <h5>Pincode: {order.shippingAddress.pincode}</h5>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <h5>City: {order.shippingAddress.city}</h5>
              <h5>State: {order.shippingAddress.state}</h5>
              <h5>Address Type: {order.shippingAddress.typeOfAddress}</h5>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
    <div className="mt-12 h-28 w-full flex items-center justify-center">
      <div className="bg-yellow-200 text-2xl p-5 rounded-2xl h-full w-[30%]">
        <h1>Order Status: </h1>
        {(status === null)?(
          <h3>Order Status Not Updated Yet!!!</h3>
        ):(
          <h3>{status}</h3>
        )}
      </div>
    </div>
    </div>
  );
}
