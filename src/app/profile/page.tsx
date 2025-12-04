import { redirect } from "next/navigation";
import Profile from "@/components/Profile";
import type { Recipe } from "@/helpers/types";
import { stackServerApp } from "@/stack/server";
import { selectUserRecipes } from "../query/route";

export default async function HomeWrapper() {
  const user = await stackServerApp.getUser();

  if (!user || !user.id) {
    redirect("/handler/sign-up");
  }

  const result = await selectUserRecipes(user.id);
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

  return <Profile initialRecipes={recipes} userId={user.id} />;
}
