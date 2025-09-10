import React from 'react';

const FilterBar = ({ filters, setFilters, genres }) => (
  <div className="flex flex-wrap gap-4 mb-4">
    <select value={filters.genre} onChange={e => setFilters(f => ({ ...f, genre: e.target.value }))} className="p-2 rounded">
      <option value="">All Genres</option>
      {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
    </select>
    <select value={filters.rating} onChange={e => setFilters(f => ({ ...f, rating: e.target.value }))} className="p-2 rounded">
      <option value="">All Ratings</option>
      {[...Array(10).keys()].map(n => <option key={n+1} value={n+1}>{n+1}+</option>)}
    </select>
    <select value={filters.language} onChange={e => setFilters(f => ({ ...f, language: e.target.value }))} className="p-2 rounded">
      <option value="">All Languages</option>
  <option value="en">English</option>
  <option value="hi">Hindi</option>
  <option value="es">Spanish</option>
  <option value="ja">Japanese</option>
      {/* Add more languages as needed */}
    </select>
  </div>
);

export default FilterBar;
