// app/api/recipes/update/route.ts
import { NextResponse } from "next/server";
import { updateRecipe } from "@/app/query/route";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      recipeId,
      userId,
      title,
      description,
      ingredients,
      instructions,
      prep_time,
      cook_time,
      servings,
      main_image_url,
      instruction_images,
      tags,
      is_published,
    } = body;

    const result = await updateRecipe(
      recipeId,
      userId,
      title,
      description,
      ingredients,
      instructions,
      prep_time,
      cook_time,
      servings,
      main_image_url,
      instruction_images,
      tags,
      is_published,
    );

    return NextResponse.json({ recipe: result[0] });
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 },
    );
  }
}
