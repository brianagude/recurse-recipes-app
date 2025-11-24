export interface IngredientItem {
  ingredient: string;
  quantity: string;
  unit: string;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: any[]; // loose type for backwards compatibility
  instructions: string;
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  main_image_url?: string;
  instruction_images?: any[];
  tags?: string[];
  is_hidden: boolean;
  is_published: boolean;
  likes_count: number;
  slug?: string;
  created_at: string;
  updated_at: string;
}

export const TAG_OPTIONS: Record<string, string[]> = {
  cuisine: ["American", "Italian", "Japanese", "Korean", "Mexican", "Mediterranean"],
  diet: ["Vegan", "Vegetarian", "Pescatarian", "Gluten-Free", "Dairy-Free"],
  method: ["One-pot", "Air Fryer", "Slow Cooker", "Grill", "Bake", "Fry"],
  meal: ["Breakfast", "Lunch", "Dinner", "Snack", "Salad", "Side Dish"],
};
