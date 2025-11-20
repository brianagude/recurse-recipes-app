// app/api/recipes/create/route.ts
import { NextResponse } from 'next/server';
import { createRecipe } from '@/app/query/route';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
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
      is_published
    } = body;

    const result = await createRecipe(
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
      is_published
    );

    return NextResponse.json({ recipe: result[0] });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json({ error: 'Failed to create recipe' }, { status: 500 });
  }
}