function FilterSidebar({ filters, setFilters }) {
  return (
    <div className="bg-white p-4 shadow rounded-md space-y-4">
      <h3 className="text-lg font-semibold">Filters</h3>

      {/* Price Filter */}
      <div>
        <label className="block text-sm mb-1 font-medium text-gray-700">Price Range</label>
        <input
          type="range"
          min={0}
          max={100}
          value={filters.price}
          onChange={(e) => setFilters({ ...filters, price: Number(e.target.value) })}
          className="w-full"
        />
        <div className="text-sm mt-1 text-gray-600">Up to ₹{filters.price}</div>
      </div>
    </div>
  );
}

export default FilterSidebar;
