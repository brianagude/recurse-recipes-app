// app/components/RecipeList.tsx
import Link from "next/link";
import { ClockIcon } from "@/components/icons/clock";
import { HeartIcon } from "@/components/icons/heart";
import { StarIcon } from "@/components/icons/star";
import type { Recipe } from "@/helpers/types";

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
              <p className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize">
                <ClockIcon /> {(recipe.prep_time || 0) + (recipe.cook_time || 0)}{" "}
                min
              </p>
              <p className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize">
                <StarIcon /> 180 ratings
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
