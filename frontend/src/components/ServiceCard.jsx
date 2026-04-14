import React from 'react';
import { Link } from 'react-router-dom';

// small component to show star ratings
function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (

        // filled star if i <= rating, else empty
        <span key={i} className={`text-sm ${i <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
      ))}
      <span className="text-xs text-gray-500 ml-1">{rating}</span>
    </div>
  );
}

// reusable card component - used in Home and Services page
export default function ServiceCard({ service }) {

  // fallback img if service has no img
  const fallback = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400';

  return (
    <div className="card overflow-hidden group cursor-pointer">

      {/* service img */}
      <div className="relative overflow-hidden h-44">
        <img
          src={service.image_url || fallback}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => { e.target.src = fallback; }}     // if image fails to load use fallback
        />


        {/* category badge on the top of img*/}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-gray-700 flex items-center gap-1">
          <span>{service.category_icon}</span>
          <span>{service.category_name}</span>
        </div>
      </div>

      {/* card content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base mb-1 line-clamp-1" style={{fontFamily:'Syne,sans-serif'}}>
          {service.name}
        </h3>
        <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        <Stars rating={service.rating} />

        <div className="text-xs text-gray-400 mt-1">
          {service.total_bookings.toLocaleString()}+ bookings
        </div>

        {/* price and view details button */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div>
            <span className="text-xs text-gray-400">Starts at</span>
            <div className="text-orange-500 font-bold text-lg">₹{service.price}</div>
          </div>
          <Link
            to={`/services/${service.id}`}
            className="bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
