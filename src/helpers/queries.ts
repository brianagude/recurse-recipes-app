// app/query/route.ts
import postgres from "postgres";
import type { Recipe } from "@/helpers/types";

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const conn = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
});

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function selectAll() {
  return await conn`
    SELECT * FROM recipes 
    WHERE is_published = true
    ORDER BY created_at DESC
  `;
}

export async function selectUserRecipes(userId: string) {
  return await conn`
    SELECT * FROM recipes 
    WHERE user_id = ${userId} 
    ORDER BY created_at DESC
  `;
}

export async function createRecipe(
  userId: string,
  recipe: Omit<Recipe, 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'slug'>
) {
  const {
    title,
    description,
    blog_post,
    ingredients,
    instructions,
    prep_time,
    cook_time,
    servings,
    main_image_url,
    instruction_images,
    tags,
    is_published
  } = recipe;

  const baseSlug = generateSlug(title);

  // Insert without slug first to get the ID
  
  const result = await conn`
    INSERT INTO recipes (
      user_id, title, description, blog_post, ingredients, instructions, 
      prep_time, cook_time, servings, main_image_url, 
      instruction_images, tags, is_published
    )
    VALUES (
      ${userId},
      ${title},
      ${description},
      ${blog_post || null},
      // @ts-expect-error ignore JSONValue typing temporarily
      ${conn.json(ingredients || [])},
      ${instructions},
      ${prep_time || null},
      ${cook_time || null},
      ${servings || null},
      ${main_image_url || null},
      ${conn.json(instruction_images || [])},
      ${conn.json(tags || [])},
      ${is_published}
    )
    RETURNING *
  `;

  // Update with slug that includes the ID
  const recipeId = result[0].id;
  const slug = `${baseSlug}-${recipeId}`;

  const updated = await conn`
    UPDATE recipes 
    SET slug = ${slug}
    WHERE id = ${recipeId}
    RETURNING *
  `;

  return updated;
}

export async function updateRecipe(
  recipeId: number,
  userId: string,
  recipe: Partial<Omit<Recipe, 'id' | 'created_at' | 'updated_at' | 'likes_count' | 'slug'>>
) {
  const {
    title,
    description,
    blog_post,
    ingredients,
    instructions,
    prep_time,
    cook_time,
    servings,
    main_image_url,
    instruction_images,
    tags,
    is_published
  } = recipe;

  // Generate new slug if title is being updated
  const slug = title ? `${generateSlug(title)}-${recipeId}` : undefined;

  // Build update object dynamically to only update provided fields
  const updates: any = { updated_at: conn.unsafe("NOW()") };
  
  if (title !== undefined) updates.title = title;
  if (description !== undefined) updates.description = description;
  if (blog_post !== undefined) updates.blog_post = blog_post;
  if (ingredients !== undefined) updates.ingredients = ingredients;
  if (instructions !== undefined) updates.instructions = instructions;
  if (prep_time !== undefined) updates.prep_time = prep_time;
  if (cook_time !== undefined) updates.cook_time = cook_time;
  if (servings !== undefined) updates.servings = servings;
  if (main_image_url !== undefined) updates.main_image_url = main_image_url;
  if (instruction_images !== undefined) updates.instruction_images = conn.json(instruction_images);
  if (tags !== undefined) updates.tags = conn.json(tags);
  if (slug !== undefined) updates.slug = slug;
  if (is_published !== undefined) updates.is_published = is_published;

  return await conn`
    UPDATE recipes 
    SET ${conn(updates)}
    WHERE id = ${recipeId} AND user_id = ${userId}
    RETURNING *
  `;
}

export async function toggleRecipePublished(
  recipeId: number,
  userId: string,
  isPublished: boolean,
) {
  return await conn`
    UPDATE recipes 
    SET is_published = ${isPublished},
        updated_at = NOW()
    WHERE id = ${recipeId} AND user_id = ${userId}
    RETURNING *
  `;
}

export async function deleteRecipe(recipeId: number, userId: string) {
  return await conn`
    DELETE FROM recipes 
    WHERE id = ${recipeId} AND user_id = ${userId}
    RETURNING *
  `;
}

export async function getRecipeBySlug(slug: string) {
  return await conn`
    SELECT * FROM recipes 
    WHERE slug = ${slug} AND is_published = true
    LIMIT 1
  `;
}