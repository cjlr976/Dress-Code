import React, { useState, useEffect } from 'react';
import type { ClothingItem } from '../types';
interface EditItemModalProps {
  item: ClothingItem;
  onSave: (item: ClothingItem) => void;
  onCancel: () => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    brand: item.brand || '',
    category: item.category || '',
    subcategory: item.subcategory || '',
    color: item.color || '',
    tags: item.tags?.join(', ') || '',
  });

  useEffect(() => {
    setFormData({
      brand: item.brand || '',
      category: item.category || '',
      subcategory: item.subcategory || '',
      color: item.color || '',
      tags: item.tags?.join(', ') || '',
    });
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...item,
      brand: formData.brand.trim() || undefined,
      category: formData.category.trim(),
      subcategory: formData.subcategory.trim(),
      color: formData.color.trim(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 transition-opacity duration-300" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
        <form onSubmit={handleSave}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Item Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <img src={item.processedImageUrl} alt="Clothing item" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex flex-col space-y-4">
                <div>
                  <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input type="text" name="brand" id="brand" value={formData.brand} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Nike, Zara" />
                </div>
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input type="text" name="category" id="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Tops, Bottoms" required />
                </div>
                <div>
                  <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700 mb-1">Type / Subcategory</label>
                  <input type="text" name="subcategory" id="subcategory" value={formData.subcategory} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., T-Shirt, Jeans" required />
                </div>
                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <input type="text" name="color" id="color" value={formData.color} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Blue, Red" required />
                </div>
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Style / Tags</label>
                  <input type="text" name="tags" id="tags" value={formData.tags} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" placeholder="e.g., Casual, Formal, Summer" />
                  <p className="text-xs text-gray-500 mt-1">Separate tags with a comma.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-white border border-gray-300 text-gray-800 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save to Wardrobe
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
            animation: fadeInScale 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default EditItemModal;
