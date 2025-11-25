// import { redirect } from "next/navigation";
// import RecipeList from "@/components/RecipeList";
// import { stackServerApp } from "@/stack/server";
// import { selectUserRecipes } from "../query/route";

// export default async function ProfilePage() {
//   const user = await stackServerApp.getUser();

// if (!user) {
//   redirect("/handler/sign-up");
// }

//   const recipes = await selectUserRecipes(user.id);

//   return (
//     <main className="min-h-screen p-8 bg-gray-50">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-4xl font-bold mb-2">My Recipes</h1>
//         <p className="text-gray-600 mb-8">
//           Create, edit, and manage your recipe collection
//         </p>

//         <RecipeList recipes={recipes} userId={user.id} />
//       </div>
//     </main>
//   );
// }

import { redirect } from "next/navigation";
import Profile from "@/components/Profile";
import { stackServerApp } from "@/stack/server";
import { selectUserRecipes } from "../query/route";

export default async function HomeWrapper() {
  const user = await stackServerApp.getUser();

  if (!user || !user.id) {
    redirect("/handler/sign-up");
  }

  const recipes = await selectUserRecipes(user.id);

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
