// app/components/MyRecipes.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { ClockIcon } from "@/components/icons/clock";
import { HeartIcon } from "@/components/icons/heart";
import { StarIcon } from "@/components/icons/star";
import type { Recipe } from "@/helpers/types";
import RecipeForm from "./RecipeForm";

interface MyRecipesProps {
  recipes: Recipe[];
  userId: string;
}

export default function MyRecipes({ initialRecipes, userId }: MyRecipesProps) {
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


  // if (!recipes || recipes.length === 0) {
  //   return (
  //     <div className="text-center py-20">
  //       <h2 className="text-2xl font-bold text-gray-600">
  //         No recipes found with the selected filters.
  //       </h2>
  //       <p className="text-gray-500 mt-2">
  //         Try adjusting your filters or clear them to see all recipes.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="px-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {recipes.map((recipe) => (
        <Link key={recipe.id} href={`/recipes/${recipe.slug}`}>
          <div className="bg-gray-light rounded-2xl w-full aspect-5/3"></div>
          <div className="p-6 flex flex-col gap-3">
            <h2 className="text-2xl font-bold leading-snug">{recipe.title}</h2>

            <div className="flex gap-3">
              <p className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize">
                <ClockIcon /> 180 ratings
              </p>
              <p className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize">
                <StarIcon /> {(recipe.prep_time || 0) + (recipe.cook_time || 0)}{" "}
                min
              </p>
            </div>

            <button
              type="button"
              className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize pr-4 py-2 pl-3 rounded-full border-2 border-black w-fit"
            >
              <HeartIcon />
              Save
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
