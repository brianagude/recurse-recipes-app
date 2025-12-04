// app/api/recipes/toggle-published/route.ts
import { NextResponse } from "next/server";
import { toggleRecipePublished } from "@/helpers/queries";

export async function POST(request: Request) {
  try {
    const { recipeId, userId, isPublished } = await request.json();

    const result = await toggleRecipePublished(recipeId, userId, isPublished);

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Recipe not found or unauthorized" },
        { status: 404 },
      );
    }

    return NextResponse.json({ recipe: result[0] });
  } catch (error) {
    console.error("Error toggling published status:", error);
    return NextResponse.json(
      { error: "Failed to toggle published status" },
      { status: 500 },
    );
  }
}
