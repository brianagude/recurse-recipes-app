import Home from "@/components/Home";
import type { Recipe } from "@/helpers/types";
import { selectAll } from "../helpers/queries";

export default async function HomeWrapper() {
  const result = await selectAll();
  const recipes = [...result] as Recipe[];

  if (!recipes || recipes.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Sorry, no recipes to share yet.
          </h2>
          <p className="text-gray mt-2">Try reloading the page.</p>
        </div>
      </section>
    );
  }

  return <Home initialRecipes={recipes} />;
}
