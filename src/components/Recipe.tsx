// /components/Recipe.tsx
"use client";

import {
  HeartIcon,
  PrinterIcon,
  ShareFatIcon,
  StarIcon,
} from "@phosphor-icons/react";
import type { Recipe as RecipeType } from "@/helpers/types";
import { buttons, typography } from "@/styles/design-tokens";

export function Recipe({ recipe }: { recipe: RecipeType }) {
  console.log(recipe.tags)

  return (
    <>
      <div>
        <h1 className={`${typography.h1}`}>{recipe.title}</h1>
        <p className={typography.p1}>{recipe.description}</p>
      </div>
      <div className="space-y-4">
        {recipe.tags && <div className="flex flex-wrap gap-1">
          {recipe.tags.map((tag) => (
            <div key={tag} className={buttons.tagIconSmall}>
              <span>{tag}</span>
            </div>
          ))}
        </div>}
        <div className="bg-gray-light rounded-2xl w-full aspect-5/3"></div>
      </div>

      <div className="flex gap-2 w-full">
        <div className={buttons.tagIcon}>
          <HeartIcon size={24} />
          <span>Save</span>
        </div>
        <div className={buttons.tagIcon}>
          <StarIcon size={24} />
          <span>Rate</span>
        </div>
        <div className={buttons.tagIcon}>
          <ShareFatIcon size={24} />
          <span>Share</span>
        </div>
        <div className={buttons.tagIcon}>
          <PrinterIcon size={24} />
          <span>Print</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <p className={typography.p2}>
          <span className="font-semibold">Prep Time:</span> {recipe.prep_time}{" "}
          mins
        </p>
        <p className={typography.p2}>
          <span className="font-semibold">Cook Time:</span> {recipe.cook_time}{" "}
          mins
        </p>
        <p className={typography.p2}>
          <span className="font-semibold">Total Time:</span>{" "}
          {recipe.cook_time + recipe.prep_time} mins
        </p>
        <p className={typography.p2}>
          <span className="font-semibold">Servings:</span> {recipe.servings}
        </p>
        <p className={typography.p2}>
          <span className="font-semibold">
            {recipe.likes_count === 1 ? "Save" : "Saves"}:
          </span>{" "}
          {recipe.likes_count}
        </p>
      </div>
      {recipe.ingredients && recipe.ingredients.length > 0 && (
        <ul className="list-decimal space-y-2 ml-4">
          {recipe.ingredients.map((ing) => (
            <li key={recipe.id} className={typography.p2}>
              {ing.quantity}
              {ing.unit} {ing.ingredient}
            </li>
          ))}
        </ul>
      )}
      <p className={typography.p2}>{recipe.instructions}</p>
      <div className="bg-gray-light rounded-2xl w-full aspect-5/3"></div>
    </>
  );
}
