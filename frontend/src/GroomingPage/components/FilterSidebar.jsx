// frontend/src/components/FilterSidebar.jsx
import React from 'react';

const FilterSidebar = ({ filters, setFilters }) => {
  const handleRadiusChange = (e) => {
    setFilters({ ...filters, radius: parseInt(e.target.value) });
  };

  const handleRatingChange = (rating) => {
    setFilters({ ...filters, rating });
  };

  const handleHomeVisitToggle = () => {
    setFilters({ ...filters, homeVisit: !filters.homeVisit });
  };

  const clearFilters = () => {
    setFilters({
      radius: 10,
      rating: 0,
      maxPrice: 2000,
      homeVisit: false,
      search: filters.search
    });
  };

  return (
    <div className="lg:w-80 bg-white rounded-lg shadow-md p-6 h-fit">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          Clear All
        </button>
      </div>

      {/* Distance Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Distance: {filters.radius} km
        </label>
        <input
          type="range"
          min="1"
          max="50"
          value={filters.radius}
          onChange={handleRadiusChange}
          className="w-full"
        />
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Rating</label>
        <div className="space-y-2">
          {[4, 3, 2, 1].map(rating => (
            <label key={rating} className="flex items-center space-x-2">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
                className="form-radio"
              />
              <span className="flex items-center">
                {rating}+ ★
              </span>
            </label>
          ))}
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="rating"
              checked={filters.rating === 0}
              onChange={() => handleRatingChange(0)}
              className="form-radio"
            />
            <span>Any Rating</span>
          </label>
        </div>
      </div>

      {/* Home Visit Filter */}
      <div className="mb-6">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={filters.homeVisit}
            onChange={handleHomeVisitToggle}
            className="form-checkbox"
          />
          <span className="text-sm">Home Visit Available</span>
        </label>
      </div>

      {/* Active Filters */}
      {(filters.rating > 0 || filters.homeVisit || filters.radius !== 10) && (
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600 mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters.rating > 0 && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {filters.rating}+ Stars
              </span>
            )}
            {filters.homeVisit && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Home Visit
              </span>
            )}
            {filters.radius !== 10 && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Within {filters.radius} km
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;