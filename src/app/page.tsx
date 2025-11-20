import Link from "next/link";
import { selectAll } from "./query/route";

export default async function Home() {
  const recipes = await selectAll();
  console.log(recipes);

  if (!recipes || recipes.length === 0) {
    return (
      <section>
        <div>
          <h2>Sorry, no recipes to share yet. Try reloading. </h2>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">All Recipes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <Link key={recipe.id} href={`/recipes/${recipe.slug}`}>
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <div className="text-sm text-gray-500">
              <p>Prep time: {recipe.prep_time} min</p>
              <p>Cook time: {recipe.cook_time} min</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
