"use client";

import Link from "next/link";
import { useState } from "react";
import { AddIcon } from "@/components/icons/add";
import { ClockIcon } from "@/components/icons/clock";
import { DeleteIcon } from "@/components/icons/delete";
import { EditIcon } from "@/components/icons/edit";
import { OutboundIcon } from "@/components/icons/outbound";
import { RemoveIcon } from "@/components/icons/remove";
import { StarIcon } from "@/components/icons/star";
import type { Recipe } from "@/helpers/types";
import Filters from "./Filters";
import MyRecipes from "./MyRecipes";
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

  // const handleToggleVisibility = async (
  //   recipeId: number,
  //   currentHidden: boolean,
  // ) => {
  //   const res = await fetch("/api/recipes/toggle-visibility", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ recipeId, userId, isHidden: !currentHidden }),
  //   });

  //   if (res.ok) {
  //     const data = await res.json();
  //     setMyRecipes(myRecipes.map((r) => (r.id === recipeId ? data.recipe : r)));
  //   }
  // };

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
        <h6 className="text-xl font-bold leading-snug">Your Recipes</h6>
        <button
          type="button"
          onClick={() => setIsCreating(true)}
          aria-label="Create new recipe"
          className="cursor-pointer"
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
                      <p className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize">
                        <ClockIcon />{" "}
                        {(recipe.prep_time || 0) + (recipe.cook_time || 0)} min
                      </p>
                      <p className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize">
                        <StarIcon /> 180 ratings
                      </p>
                    </div>
                  )}

                  <div className="grid gap-2 grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setEditingId(recipe.id)}
                      aria-label={`Edit recipe ${recipe.title}`}
                      className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize pr-4 py-2 pl-3 rounded-full border-2 border-black"
                    >
                      <EditIcon />
                      Edit
                    </button>
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize pr-4 py-2 pl-3 rounded-full border-2 border-black"
                    >
                      <OutboundIcon />
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
                      className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize pr-4 py-2 pl-3 rounded-full border-2 border-black"
                    >
                      {recipe.is_published ? <RemoveIcon /> : <AddIcon/>}
                      {recipe.is_published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(recipe.id)}
                      aria-label={`Delete recipe ${recipe.title}`}
                      className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize pr-4 py-2 pl-3 rounded-full border-2 border-black"
                    >
                      <DeleteIcon />
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
        <h6 className="text-xl font-bold leading-snug">Saved Recipes</h6>
      </div>
    </main>
  );
}
