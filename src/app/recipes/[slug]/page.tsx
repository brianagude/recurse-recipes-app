import { getRecipeBySlug } from "@/app/query/route";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [recipe] = await getRecipeBySlug(slug);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  console.log(recipe)

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>Slug: {slug}</p>
    </div>
  );
}
