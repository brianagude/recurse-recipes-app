// app/api/recipes/toggle-visibility/route.ts
import { NextResponse } from "next/server";
import { toggleRecipeVisibility } from "@/app/query/route";

export async function POST(request: Request) {
  try {
    const { recipeId, userId, isHidden } = await request.json();

    const result = await toggleRecipeVisibility(recipeId, userId, isHidden);

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Recipe not found or unauthorized" },
        { status: 404 },
      );
    }

    return NextResponse.json({ recipe: result[0] });
  } catch (error) {
    console.error("Error toggling visibility:", error);
    return NextResponse.json(
      { error: "Failed to toggle visibility" },
      { status: 500 },
    );
  }
}
