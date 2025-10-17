
import React from 'react';
import type { Filters } from '../types';

interface FilterSidebarProps {
  categories: string[];
  colors: string[];
  activeFilters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  colors,
  activeFilters,
  onFilterChange,
}) => {

  const handleCategoryChange = (category: string) => {
    const newCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter(c => c !== category)
      : [...activeFilters.categories, category];
    onFilterChange({ ...activeFilters, categories: newCategories });
  };

  const handleColorChange = (color: string) => {
    const newColors = activeFilters.colors.includes(color)
      ? activeFilters.colors.filter(c => c !== color)
      : [...activeFilters.colors, color];
    onFilterChange({ ...activeFilters, colors: newColors });
  };

  const clearFilters = () => {
    onFilterChange({ categories: [], colors: [] });
  }

  const hasActiveFilters = activeFilters.categories.length > 0 || activeFilters.colors.length > 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full mt-8">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
            Clear all
          </button>
        )}
      </div>

      {categories.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-700 mb-3">Category</h3>
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={activeFilters.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <span className="text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {colors.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-3">Color</h3>
          <div className="space-y-2">
            {colors.map(color => (
              <label key={color} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={activeFilters.colors.includes(color)}
                  onChange={() => handleColorChange(color)}
                />
                <span className="text-gray-700">{color}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;
