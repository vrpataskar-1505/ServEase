import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api';
import ServiceCard from '../components/ServiceCard';

export default function Services() {
  const [services, setServices]     = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get('category') || '';
  const searchQuery      = searchParams.get('search') || '';
  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    API.get('/services/categories/').then(r => setCategories(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = '/services/?';
    if (selectedCategory) url += `category=${selectedCategory}&`;
    if (searchQuery)      url += `search=${searchQuery}&`;

    API.get(url)
      .then(r => setServices(r.data))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, [selectedCategory, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const p = {};
    if (searchInput.trim()) p.search = searchInput.trim();
    if (selectedCategory)   p.category = selectedCategory;
    setSearchParams(p);
  };

  const selectCategory = (id) => {
    const p = {};
    if (id) p.category = id;
    if (searchQuery) p.search = searchQuery;
    setSearchParams(p);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-1">All Services</h1>
      <p className="text-gray-500 mb-8">Find the right professional for every job</p>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-8 max-w-lg">
        <input
          type="text"
          placeholder="Search services..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="flex-1 input-field"
        />
        <button type="submit" className="btn-primary py-2 px-5">Search</button>
        {(searchQuery || selectedCategory) && (
          <button type="button"
            onClick={() => { setSearchInput(''); setSearchParams({}); }}
            className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-100 transition">
            Clear
          </button>
        )}
      </form>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => selectCategory('')}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            !selectedCategory
              ? 'bg-orange-500 text-white border-orange-500'
              : 'bg-white text-gray-600 border-gray-200 hover:border-orange-400 hover:text-orange-500'
          }`}>
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => selectCategory(String(cat.id))}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all flex items-center gap-1.5 ${
              selectedCategory === String(cat.id)
                ? 'bg-orange-500 text-white border-orange-500'
                : 'bg-white text-gray-600 border-gray-200 hover:border-orange-400 hover:text-orange-500'
            }`}>
            <span>{cat.icon}</span> {cat.name}
          </button>
        ))}
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="card h-72 animate-pulse bg-gray-100 rounded-2xl"></div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">No services found</h3>
          <p className="text-gray-400">Try a different search or clear the filters.</p>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-500 mb-4">{services.length} service{services.length !== 1 ? 's' : ''} found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => <ServiceCard key={s.id} service={s} />)}
          </div>
        </>
      )}
    </div>
  );
}
