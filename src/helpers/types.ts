export interface IngredientItem {
  id: string;
  ingredient: string;
  quantity: string;
  unit: string;
}

export interface Recipe {
  id: number;
  title: string;
  description: string;
  blog_post?: string;
  ingredients: IngredientItem[];
  instructions: string;
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  main_image_url?: string;
  instruction_images?: string[];
  tags?: string[];
  is_published: boolean;
  likes_count: number;
  slug?: string;
  created_at: string;
  updated_at: string;
}

export const TAG_OPTIONS: Record<string, string[]> = {
  cuisine: [
    "American",
    "Italian",
    "Japanese",
    "Korean",
    "Mexican",
    "Mediterranean",
  ],
  diet: ["Vegan", "Vegetarian", "Pescatarian", "Gluten-Free", "Dairy-Free"],
  method: ["One-pot", "Air Fryer", "Slow Cooker", "Grill", "Bake", "Fry"],
  meal: ["Breakfast", "Lunch", "Dinner", "Snack", "Salad", "Side Dish"],
};
