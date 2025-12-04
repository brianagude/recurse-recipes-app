// app/api/recipes/update/route.ts
import { NextResponse } from "next/server";
import { updateRecipe } from "@/app/api/query/route";
import type { Recipe } from "@/helpers/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { recipeId, userId, ...recipe } = body as {
      recipeId: number;
      userId: string;
    } & Partial<Omit<Recipe, 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'slug'>>;

    const result = await updateRecipe(recipeId, userId, recipe);

    return NextResponse.json({ recipe: result[0] });
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.json(
      { error: "Failed to update recipe" },
      { status: 500 },
    );
  }
}