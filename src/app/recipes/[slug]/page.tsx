// /recipes/[slug]/page.tsx

import { Recipe } from "@/components/Recipe";
import { getRecipeBySlug } from "@/helpers/queries";
import type { Recipe as RecipeType } from "@/helpers/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const result = await getRecipeBySlug(slug);
  const recipe = result?.[0] ? ({ ...result[0] } as RecipeType) : null;

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return <Recipe recipe={recipe} />;
}
