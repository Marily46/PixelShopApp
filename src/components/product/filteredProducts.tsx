import React from "react";
import { useDispatch } from "react-redux";
import { setFilters, setSort } from "../../app/redux/productsSlice";

export const FilteredProducts = () => {
  const dispatch = useDispatch();

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ min: Number(e.target.value) || undefined }));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ max: Number(e.target.value) || undefined }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSort({ by: e.target.value as "price" | "name", order: "asc" }));
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSort({ by: "price", order: e.target.value as "asc" | "desc" }));
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 divide-y divide-gray-200">
      <h2 className="text-lg font-semibold mb-3">Filters</h2>
      <div className="pt-4">
        <div className="mb-4">
          <label
            htmlFor="minPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Min Price:
          </label>
          <input
            type="number"
            id="minPrice"
            placeholder="0"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleMinPriceChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="maxPrice"
            className="block text-sm font-medium text-gray-700"
          >
            Max Price:
          </label>
          <input
            type="number"
            id="maxPrice"
            placeholder="0"
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleMaxPriceChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="sortBy"
            className="block text-sm font-medium text-gray-700"
          >
            Sort by:
          </label>
          <select
            id="sortBy"
            className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleSortChange}
          >
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="order"
            className="block text-sm font-medium text-gray-700"
          >
            Order:
          </label>
          <select
            id="order"
            className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            onChange={handleOrderChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
};
