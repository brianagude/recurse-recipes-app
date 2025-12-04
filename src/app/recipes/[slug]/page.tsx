// /recipes/[slug]/page.tsx

import { getRecipeBySlug } from "@/app/query/route";
import { Recipe } from "@/components/Recipe";
import { typography } from "@/styles/design-tokens";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const [recipe] = await getRecipeBySlug(slug);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  // console.log(recipe);

  return (
    <main className="min-h-screen h-screen flex flex-row-reverse">
      <div className="p-6 space-y-6 basis-1/2 overflow-y-auto">
        <Recipe recipe={recipe} />
      </div>
      <div className="p-6 space-y-6 basis-1/2 overflow-y-auto">
        <Recipe recipe={recipe} />
      </div>
    </main>
  );
}
