// app/components/RecipeList.tsx

import { ClockIcon, HeartIcon, StarIcon } from "@phosphor-icons/react";
import Link from "next/link";
import type { Recipe } from "@/helpers/types";
import { buttons } from "@/styles/design-tokens";

interface RecipeListProps {
  recipes: Recipe[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-600">
          No recipes found with the selected filters.
        </h2>
        <p className="text-gray-500 mt-2">
          Try adjusting your filters or clear them to see all recipes.
        </p>
      </div>
    );
  }

  return (
    <div className="px-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {recipes.map((recipe) => (
        <Link key={recipe.id} href={`/recipes/${recipe.slug}`}>
          <div className="bg-gray-light rounded-2xl w-full aspect-5/3"></div>
          <div className="p-6 flex flex-col gap-3">
            <h4 className="text-2xl font-bold leading-snug">{recipe.title}</h4>

            <div className="flex gap-3">
              <p className={buttons.textIcon}>
                <ClockIcon size={24} />{" "}
                {(recipe.prep_time || 0) + (recipe.cook_time || 0)} min
              </p>
              <p className={buttons.textIcon}>
                <StarIcon size={24} /> 180 ratings
              </p>
            </div>

            <button
              type="button"
              className={`${buttons.tagIcon} w-fit`}
            >
              <HeartIcon size={24} />
              Save
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}
