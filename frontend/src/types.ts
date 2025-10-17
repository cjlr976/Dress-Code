export interface ClothingItem {
  id: string;
  originalImageUrl: string;
  processedImageUrl: string;
  category: string;
  subcategory: string;
  color: string;
  tags: string[];
  brand?: string;
}

export interface Filters {
  categories: string[];
  colors: string[];
}
