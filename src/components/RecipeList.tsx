'use client';

import { useState } from 'react';

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: any[];
  instructions: string;
  prep_time?: number;
  cook_time?: number;
  servings?: number;
  main_image_url?: string;
  instruction_images?: any[];
  tags?: any[];
  is_hidden: boolean;
  is_published: boolean;
  likes_count: number;
  slug?: string;
  created_at: string;
  updated_at: string;
}

export default function RecipeList({ recipes: initialRecipes, userId }: { recipes: Recipe[], userId: string }) {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleDelete = async (recipeId: number) => {
    if (!confirm('Are you sure you want to delete this recipe?')) return;
    
    const res = await fetch('/api/recipes/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId, userId })
    });
    
    if (res.ok) {
      setRecipes(recipes.filter(r => r.id !== recipeId));
    }
  };

  const handleToggleVisibility = async (recipeId: number, currentHidden: boolean) => {
    const res = await fetch('/api/recipes/toggle-visibility', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId, userId, isHidden: !currentHidden })
    });
    
    if (res.ok) {
      const data = await res.json();
      setRecipes(recipes.map(r => r.id === recipeId ? data.recipe : r));
    }
  };

  const handleTogglePublished = async (recipeId: number, currentPublished: boolean) => {
    const res = await fetch('/api/recipes/toggle-published', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recipeId, userId, isPublished: !currentPublished })
    });
    
    if (res.ok) {
      const data = await res.json();
      setRecipes(recipes.map(r => r.id === recipeId ? data.recipe : r));
    }
  };

  return (
    <div className="space-y-4">
      <button 
        type='button'
        onClick={() => setIsCreating(true)}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-medium"
      >
        + New Recipe
      </button>

      {isCreating && (
        <RecipeForm 
          userId={userId}
          onSave={(newRecipe) => {
            setRecipes([newRecipe, ...recipes]);
            setIsCreating(false);
          }}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <div className="grid gap-6">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="border rounded-lg p-6 bg-white shadow-sm">
            {editingId === recipe.id ? (
              <RecipeForm 
                userId={userId}
                recipe={recipe}
                onSave={(updatedRecipe) => {
                  setRecipes(recipes.map(r => r.id === recipe.id ? updatedRecipe : r));
                  setEditingId(null);
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    {recipe.main_image_url && (
                      <img 
                        src={recipe.main_image_url} 
                        alt={recipe.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>
                    
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {!recipe.is_published && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-medium">
                          Draft
                        </span>
                      )}
                      {recipe.is_hidden && (
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded font-medium">
                          Hidden
                        </span>
                      )}
                      {recipe.is_published && !recipe.is_hidden && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
                          Published
                        </span>
                      )}
                    </div>

                    {recipe.tags && recipe.tags.length > 0 && (
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {recipe.tags.map((tag: string, i: number) => (
                          <span key={i} className="text-xs bg-gray-200 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col gap-2 ml-4">
                    <button 
                      onClick={() => setEditingId(recipe.id)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleTogglePublished(recipe.id, recipe.is_published)}
                      className="text-purple-600 hover:underline text-sm"
                    >
                      {recipe.is_published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button 
                      onClick={() => handleToggleVisibility(recipe.id, recipe.is_hidden)}
                      className="text-orange-600 hover:underline text-sm"
                    >
                      {recipe.is_hidden ? 'Unhide' : 'Hide'}
                    </button>
                    <button 
                      onClick={() => handleDelete(recipe.id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{recipe.description}</p>
                
                {(recipe.prep_time || recipe.cook_time || recipe.servings) && (
                  <div className="flex gap-4 mb-4 text-sm text-gray-600">
                    {recipe.prep_time && <span>⏱️ Prep: {recipe.prep_time} min</span>}
                    {recipe.cook_time && <span>🔥 Cook: {recipe.cook_time} min</span>}
                    {recipe.servings && <span>🍽️ Servings: {recipe.servings}</span>}
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Ingredients:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {recipe.ingredients.map((ingredient: any, i: number) => (
                      <li key={i} className="text-gray-700">
                        {typeof ingredient === 'string' ? ingredient : JSON.stringify(ingredient)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Instructions:</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">{recipe.instructions}</p>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Created: {new Date(recipe.created_at).toLocaleDateString()}</span>
                  {recipe.slug && (
                    <span className="text-blue-500">/{recipe.slug}</span>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RecipeForm({ userId, recipe, onSave, onCancel }: {
  userId: string;
  recipe?: Recipe;
  onSave: (recipe: Recipe) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: recipe?.title || '',
    description: recipe?.description || '',
    ingredients: recipe?.ingredients || [''],
    instructions: recipe?.instructions || '',
    prep_time: recipe?.prep_time || '',
    cook_time: recipe?.cook_time || '',
    servings: recipe?.servings || '',
    main_image_url: recipe?.main_image_url || '',
    tags: recipe?.tags || [],
    is_published: recipe?.is_published || false,
  });

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const removeIngredient = (index: number) => {
    setFormData({ 
      ...formData, 
      ingredients: formData.ingredients.filter((_, i) => i !== index) 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const endpoint = recipe ? '/api/recipes/update' : '/api/recipes/create';
    const body = {
      ...formData,
      userId,
      ...(recipe && { recipeId: recipe.id }),
      prep_time: formData.prep_time ? Number(formData.prep_time) : undefined,
      cook_time: formData.cook_time ? Number(formData.cook_time) : undefined,
      servings: formData.servings ? Number(formData.servings) : undefined,
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (res.ok) {
      const data = await res.json();
      onSave(data.recipe);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-gray-50 rounded-lg border-2 border-blue-200">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          id="is_published"
          checked={formData.is_published}
          onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
          className="w-4 h-4"
        />
        <label htmlFor="is_published" className="font-medium">
          Publish recipe (make visible to others)
        </label>
      </div>

      <input
        type="text"
        placeholder="Recipe Title *"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-3 border rounded"
        required
      />
      
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full p-3 border rounded"
        rows={3}
      />

      <div className="grid grid-cols-3 gap-4">
        <input
          type="number"
          placeholder="Prep time (min)"
          value={formData.prep_time}
          onChange={(e) => setFormData({ ...formData, prep_time: e.target.value })}
          className="p-3 border rounded"
        />
        <input
          type="number"
          placeholder="Cook time (min)"
          value={formData.cook_time}
          onChange={(e) => setFormData({ ...formData, cook_time: e.target.value })}
          className="p-3 border rounded"
        />
        <input
          type="number"
          placeholder="Servings"
          value={formData.servings}
          onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
          className="p-3 border rounded"
        />
      </div>

      <input
        type="text"
        placeholder="Main Image URL (optional)"
        value={formData.main_image_url}
        onChange={(e) => setFormData({ ...formData, main_image_url: e.target.value })}
        className="w-full p-3 border rounded"
      />
      
      <div>
        <label className="font-semibold mb-2 block">Ingredients: *</label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder={`Ingredient ${index + 1}`}
              value={ingredient}
              onChange={(e) => updateIngredient(index, e.target.value)}
              className="flex-1 p-3 border rounded"
            />
            {formData.ingredients.length > 1 && (
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="text-red-600 hover:text-red-800 px-3"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="text-blue-600 hover:underline text-sm mt-2"
        >
          + Add Ingredient
        </button>
      </div>

      <textarea
        placeholder="Instructions *"
        value={formData.instructions}
        onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
        className="w-full p-3 border rounded"
        rows={8}
        required
      />

      <div className="flex gap-2 pt-4">
        <button type="submit" className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 font-medium">
          {recipe ? 'Update Recipe' : 'Create Recipe'}
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 font-medium">
          Cancel
        </button>
      </div>
    </form>
  );
}