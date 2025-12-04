// app/api/recipes/create/route.ts
import { NextResponse } from "next/server";
import { createRecipe } from "@/helpers/queries";
import type { Recipe } from "@/helpers/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, ...recipe } = body as { 
      userId: string;
    } & Omit<Recipe, 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'slug'>;

    const result = await createRecipe(userId, recipe);

    return NextResponse.json({ recipe: result[0] });
  } catch (error) {
    console.error("Error creating recipe:", error);
    return NextResponse.json(
      { error: "Failed to create recipe" },
      { status: 500 },
    );
  }
}