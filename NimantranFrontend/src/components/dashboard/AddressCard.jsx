const AddressCard = ({ address }) => {
  return (
    <div className="bg-white p-4 border rounded-lg shadow mb-3">
      <p>{address.name}</p>
      <p>{address.line1}, {address.city}, {address.state} - {address.pin}</p>
      <p>Phone: {address.phone}</p>
    </div>
  );
};

export default AddressCard;



