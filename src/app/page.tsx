import Link from "next/link";
import { ClockIcon } from "@/components/icons/clock";
import { HeartIcon } from "@/components/icons/heart";
import { StarIcon } from "@/components/icons/star";
import { selectAll } from "./query/route";

export default async function Home() {
  const recipes = await selectAll();
  console.log(recipes[0].tags);

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
    <main className="min-h-screen">
      <div className="py-10">
        <div className="px-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {recipes.map((recipe) => (
            <Link key={recipe.id} href={`/recipes/${recipe.slug}`}>
              <div className="bg-gray-light rounded-2xl w-full aspect-5/3"></div>
              <div className="p-6 flex flex-col gap-3">
                <h2 className="text-2xl font-bold leading-snug">{recipe.title}</h2>

                <div className="flex gap-3">
                  <p className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize">
                    <ClockIcon/> 180 ratings
                  </p>
                  <p className="flex gap-2 items-center text-lg font-semibold tracking-wide capitalize">
                    <StarIcon/> {recipe.prep_time + recipe.cook_time} min
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
      </div>
    </main>
  );
}
