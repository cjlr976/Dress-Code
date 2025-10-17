import React from 'react';
import type { ClothingItem } from '../types';

interface ClothingItemCardProps {
  item: ClothingItem;
}

const ClothingItemCard: React.FC<ClothingItemCardProps> = ({ item }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
      <div className="w-full aspect-square bg-gray-200 flex items-center justify-center overflow-hidden">
        <img
          src={item.processedImageUrl}
          alt={`${item.color} ${item.subcategory}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 truncate" title={item.subcategory}>
          {item.subcategory}
        </h3>
        <p className="text-sm text-gray-500 truncate">
          {item.brand ? `${item.brand} | ${item.category}` : item.category}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
            <span
                className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
            >
                {item.color}
            </span>
            {item.tags.map(tag => (
                 <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                >
                    {tag}
                </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ClothingItemCard;
