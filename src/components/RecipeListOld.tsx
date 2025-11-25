"use client";

import { useState } from "react";
import type { Recipe } from "@/helpers/types";
import RecipeForm from "./RecipeForm";

interface RecipeListProps {
  recipes: Recipe[];
  userId: string;
}

export default function RecipeList({
  recipes: initialRecipes,
  userId,
}: RecipeListProps) {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleDelete = async (recipeId: number) => {
    if (!confirm("Are you sure you want to delete this recipe?")) return;

    const res = await fetch("/api/recipes/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId, userId }),
    });

    if (res.ok) {
      setRecipes(recipes.filter((r) => r.id !== recipeId));
    }
  };

  const handleToggleVisibility = async (
    recipeId: number,
    currentHidden: boolean,
  ) => {
    const res = await fetch("/api/recipes/toggle-visibility", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId, userId, isHidden: !currentHidden }),
    });

    if (res.ok) {
      const data = await res.json();
      setRecipes(recipes.map((r) => (r.id === recipeId ? data.recipe : r)));
    }
  };

  const handleTogglePublished = async (
    recipeId: number,
    currentPublished: boolean,
  ) => {
    const res = await fetch("/api/recipes/toggle-published", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipeId,
        userId,
        isPublished: !currentPublished,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      setRecipes(recipes.map((r) => (r.id === recipeId ? data.recipe : r)));
    }
  };

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setIsCreating(true)}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 font-medium"
        aria-label="Create new recipe"
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
          <div
            key={recipe.id}
            className="border rounded-lg p-6 bg-white shadow-sm"
          >
            {editingId === recipe.id ? (
              <RecipeForm
                userId={userId}
                recipe={recipe}
                onSave={(updatedRecipe) => {
                  setRecipes(
                    recipes.map((r) =>
                      r.id === recipe.id ? updatedRecipe : r,
                    ),
                  );
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
                    <h2 className="text-2xl font-semibold mb-2">
                      {recipe.title}
                    </h2>
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
                        {recipe.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs bg-gray-200 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      type="button"
                      onClick={() => setEditingId(recipe.id)}
                      className="text-blue-600 hover:underline text-sm"
                      aria-label={`Edit recipe ${recipe.title}`}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleTogglePublished(recipe.id, recipe.is_published)
                      }
                      className="text-purple-600 hover:underline text-sm"
                      aria-label={
                        recipe.is_published
                          ? `Unpublish recipe ${recipe.title}`
                          : `Publish recipe ${recipe.title}`
                      }
                    >
                      {recipe.is_published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleToggleVisibility(recipe.id, recipe.is_hidden)
                      }
                      className="text-orange-600 hover:underline text-sm"
                      aria-label={
                        recipe.is_hidden
                          ? `Unhide recipe ${recipe.title}`
                          : `Hide recipe ${recipe.title}`
                      }
                    >
                      {recipe.is_hidden ? "Unhide" : "Hide"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(recipe.id)}
                      className="text-red-600 hover:underline text-sm"
                      aria-label={`Delete recipe ${recipe.title}`}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{recipe.description}</p>

                {(recipe.prep_time || recipe.cook_time || recipe.servings) && (
                  <div className="flex gap-4 mb-4 text-sm text-gray-600">
                    {recipe.prep_time && (
                      <span>⏱️ Prep: {recipe.prep_time} min</span>
                    )}
                    {recipe.cook_time && (
                      <span>🔥 Cook: {recipe.cook_time} min</span>
                    )}
                    {recipe.servings && (
                      <span>🍽️ Servings: {recipe.servings}</span>
                    )}
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Ingredients:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i} className="text-gray-700">
                        {typeof ingredient === "string"
                          ? ingredient
                          : `${ingredient.quantity ? ingredient.quantity + " " : ""}${ingredient.unit ? ingredient.unit + " " : ""}${ingredient.ingredient || JSON.stringify(ingredient)}`}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Instructions:</h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {recipe.instructions}
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>
                    Created: {new Date(recipe.created_at).toLocaleDateString()}
                  </span>
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
