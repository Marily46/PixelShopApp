import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilters, setSort } from '../app/redux/productsSlice';

export const FilteredProducts = () => {
  const dispatch = useDispatch();

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ min: Number(e.target.value) || undefined }));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ max: Number(e.target.value) || undefined }));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSort({ by: e.target.value as 'price' | 'name', order: 'asc' }));
  };

  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSort({ by: 'price', order: e.target.value as 'asc' | 'desc' }));
  };

  return (
    <div>
      <div>
        <label htmlFor="minPrice">Min Price:</label>
        <input type="number" id="minPrice" onChange={handleMinPriceChange} />
      </div>

      <div>
        <label htmlFor="maxPrice">Max Price:</label>
        <input type="number" id="maxPrice" onChange={handleMaxPriceChange} />
      </div>

      <div>
        <label htmlFor="sortBy">Sort by:</label>
        <select id="sortBy" onChange={handleSortChange}>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div>
        <label htmlFor="order">Order:</label>
        <select id="order" onChange={handleOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};