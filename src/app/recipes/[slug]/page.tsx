import {
  HeartIcon,
} from "@phosphor-icons/react";
import { getRecipeBySlug } from "@/app/query/route";
import { buttons, typography } from "@/styles/design-tokens";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function RecipePage({ params }: PageProps) {
  const { slug } = await params;
  const [recipe] = await getRecipeBySlug(slug);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  console.log(recipe);

  return (
    <main className="min-h-screen flex p-10 gap-10">
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="bg-gray-light rounded-2xl w-full aspect-5/3"></div>
          <div className="flex flex-wrap gap-1">
            {
              recipe.tags.map((tag) => (
                <div key={recipe.id} className={buttons.tagIconSmall}>
                  <span>{tag}</span>
                </div>
              ))
            }
          </div>
        </div>
        <div>
          <h3 className={typography.h3}>{recipe.title}</h3>
          <p className={typography.p1}>{recipe.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className={buttons.tagIcon}>
            <span>Save</span>
          </div>
          <div className={buttons.tagIcon}>
            <span>Rate</span>
          </div>
          <div className={buttons.tagIcon}>
            <span>Share</span>
          </div>
          <div className={buttons.tagIcon}>
            <span>Print</span>
          </div>
        </div>
        
        
        <div className="flex flex-wrap gap-2">
          <div className={buttons.textIcon}>
            <span>Prep Time: {recipe.prep_time}</span>
          </div>
          <div className={buttons.textIcon}>
            <span>Cook Time: {recipe.cook_time}</span>
          </div>
          <div className={buttons.textIcon}>
            <span>Servings: {recipe.servings}</span>
          </div>
          <div className={buttons.textIcon}>
            <span>{recipe.likes_count === 1 ? 'save' : 'saves'}: {recipe.likes_count}</span>
          </div>
        </div>
        {
          recipe.ingredients && recipe.ingredients.length > 0 && 
          <ul className="list-decimal space-y-2 ml-4">
            {
              recipe.ingredients.map((ing) => (
              <li key={recipe.id} className={typography.p2}>
                {ing.quantity}{ing.unit} {ing.ingredient}
              </li>
          ))}           
          </ul>
        }
        <p className={typography.p2}>{recipe.instructions}</p>

        

        
      </div>

      <div>
        <h3 className={typography.h3}>{recipe.title}</h3>
        <p className={typography.p1}>{recipe.description}</p>
      </div>
    </main>
  );
}
