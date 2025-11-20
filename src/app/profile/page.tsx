import { redirect } from "next/navigation";
import RecipeList from "@/components/RecipeList";
import { stackServerApp } from "@/stack/server";
import { selectUserRecipes } from "../query/route";

export default async function ProfilePage() {
  const user = await stackServerApp.getUser();

  if (!user) {
    redirect("/handler/sign-up");
  }

  const recipes = await selectUserRecipes(user.id);

  // if (!recipes) {
  //   return (
  //     <main className="min-h-screen p-8 bg-gray-50">
  //       <div className="max-w-6xl mx-auto">
  //         <h1 className="text-4xl font-bold mb-2">My Recipes</h1>
  //         <p className="text-gray-600 mb-8">
  //           Create, edit, and manage your recipe collection
  //         </p>
  //       </div>
  //     </main>
  //   )
  // }

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">My Recipes</h1>
        <p className="text-gray-600 mb-8">
          Create, edit, and manage your recipe collection
        </p>

        <RecipeList recipes={recipes} userId={user.id} />
      </div>
    </main>
  );
}
