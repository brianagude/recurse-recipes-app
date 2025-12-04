"use client";

import {
  ClockIcon,
  EyeClosedIcon,
  EyeIcon,
  LinkIcon,
  PencilCircleIcon,
  StarIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import type { Recipe } from "@/helpers/types";
import { buttons, typography } from "@/styles/design-tokens";
import Filters from "./Filters";
import RecipeForm from "./RecipeForm";

export default function Profile({
  initialRecipes,
  userId,
}: {
  initialRecipes: Recipe[];
  userId: string;
}) {
  const [filteredRecipes, setFilteredRecipes] =
    useState<Recipe[]>(initialRecipes);
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
      setFilteredRecipes(filteredRecipes.filter((r) => r.id !== recipeId));
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
      setFilteredRecipes(
        filteredRecipes.map((r) => (r.id === recipeId ? data.recipe : r)),
      );
    }
  };

  return (
    <main className="min-h-screen">
      <Filters
        recipes={initialRecipes}
        onFilteredRecipesChange={setFilteredRecipes}
      />

      {isCreating && (
        <RecipeForm
          userId={userId}
          onSave={(newRecipe) => {
            setFilteredRecipes([newRecipe, ...filteredRecipes]);
            setIsCreating(false);
          }}
          onCancel={() => setIsCreating(false)}
        />
      )}

      <div className="bg-black text-white py-3 px-6 flex justify-between">
        <h6 className={typography.h5}>Your Recipes</h6>
        <button
          type="button"
          onClick={() => setIsCreating(true)}
          aria-label="Create new recipe"
          className={buttons.text}
        >
          + New Recipe
        </button>
      </div>

      <div className="p-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id}>
            {editingId === recipe.id ? (
              <RecipeForm
                userId={userId}
                recipe={recipe}
                onSave={(updatedRecipe) => {
                  setFilteredRecipes(
                    filteredRecipes.map((r) =>
                      r.id === recipe.id ? updatedRecipe : r,
                    ),
                  );
                  setEditingId(null);
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div>
                <div className="bg-gray-light rounded-2xl w-full aspect-5/3"></div>
                <div className="p-6 flex flex-col gap-3">
                  <h4 className="text-2xl font-bold leading-snug">
                    {recipe.title}
                  </h4>

                  {(recipe.prep_time || recipe.cook_time) && (
                    <div className="flex gap-3">
                      <p className={buttons.textIcon}>
                        <ClockIcon size={24} />{" "}
                        {(recipe.prep_time || 0) + (recipe.cook_time || 0)} min
                      </p>
                      <p className={buttons.textIcon}>
                        <StarIcon size={24} /> 180 ratings
                      </p>
                    </div>
                  )}

                  <div className="grid gap-2 grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setEditingId(recipe.id)}
                      aria-label={`Edit recipe ${recipe.title}`}
                      className={buttons.tagIcon}
                    >
                      <PencilCircleIcon size={24} />
                      Edit
                    </button>
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      className={buttons.tagIcon}
                    >
                      <LinkIcon size={24} />
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        handleTogglePublished(recipe.id, recipe.is_published)
                      }
                      aria-label={
                        recipe.is_published
                          ? `Unpublish recipe ${recipe.title}`
                          : `Publish recipe ${recipe.title}`
                      }
                      className={buttons.tagIcon}
                    >
                      {recipe.is_published ? (
                        <>
                          <EyeClosedIcon size={24} />
                          <span>Unpublish</span>
                        </>
                      ) : (
                        <>
                          <EyeIcon size={24} />
                          <span>Publish</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(recipe.id)}
                      aria-label={`Delete recipe ${recipe.title}`}
                      className={buttons.tagIcon}
                    >
                      <TrashIcon size={24} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-black text-white py-3 px-6">
        <h6 className={typography.h5}>Saved Recipes</h6>
      </div>
    </main>
  );
}
