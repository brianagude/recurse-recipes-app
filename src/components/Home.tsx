"use client";

import { useState } from "react";
import type { Recipe } from "@/helpers/types";
import Filters from "./Filters";
import RecipeList from "./RecipeList";

export default function Home({ initialRecipes }: { initialRecipes: Recipe[] }) {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(initialRecipes);

  return (
    <main className="min-h-screen">
      <Filters
        recipes={initialRecipes}
        onFilteredRecipesChange={setFilteredRecipes}
      />

      <RecipeList recipes={filteredRecipes} />
    </main>
  );
}
