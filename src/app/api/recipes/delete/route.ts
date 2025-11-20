// app/api/recipes/delete/route.ts
import { NextResponse } from 'next/server';
import { deleteRecipe } from '@/app/query/route';

export async function POST(request: Request) {
  try {
    const { recipeId, userId } = await request.json();

    const result = await deleteRecipe(recipeId, userId);

    if (result.length === 0) {
      return NextResponse.json({ error: 'Recipe not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return NextResponse.json({ error: 'Failed to delete recipe' }, { status: 500 });
  }
}