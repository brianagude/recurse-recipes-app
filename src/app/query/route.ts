// app/query/route.ts - Updated with all new columns
import postgres from "postgres";

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
    WHERE is_published = true AND is_hidden = false 
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
  title: string,
  description: string,
  ingredients: any[],
  instructions: string,
  prepTime?: number,
  cookTime?: number,
  servings?: number,
  mainImageUrl?: string,
  instructionImages?: any[],
  tags?: any[],
  isPublished: boolean = false,
) {
  const baseSlug = generateSlug(title);

  // Insert without slug first to get the ID
  const result = await conn`
    INSERT INTO recipes (
      user_id, title, description, ingredients, instructions, 
      prep_time, cook_time, servings, main_image_url, 
      instruction_images, tags, is_published, is_hidden
    )
    VALUES (
      ${userId}, ${title}, ${description}, ${conn.json(ingredients)}, ${instructions},
      ${prepTime || null}, ${cookTime || null}, ${servings || null}, ${mainImageUrl || null},
      ${conn.json(instructionImages || [])}, ${conn.json(tags || [])}, ${isPublished}, false
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
  title: string,
  description: string,
  ingredients: any[],
  instructions: string,
  prepTime?: number,
  cookTime?: number,
  servings?: number,
  mainImageUrl?: string,
  instructionImages?: any[],
  tags?: any[],
  isPublished?: boolean,
) {
  // Generate new slug based on updated title
  const baseSlug = generateSlug(title);
  const slug = `${baseSlug}-${recipeId}`;

  return await conn`
    UPDATE recipes 
    SET title = ${title}, 
        description = ${description}, 
        ingredients = ${conn.json(ingredients)}, 
        instructions = ${instructions},
        prep_time = ${prepTime || null},
        cook_time = ${cookTime || null},
        servings = ${servings || null},
        main_image_url = ${mainImageUrl || null},
        instruction_images = ${conn.json(instructionImages || [])},
        tags = ${conn.json(tags || [])},
        slug = ${slug},
        is_published = ${isPublished !== undefined ? isPublished : conn.unsafe("is_published")},
        updated_at = NOW()
    WHERE id = ${recipeId} AND user_id = ${userId}
    RETURNING *
  `;
}

export async function toggleRecipeVisibility(
  recipeId: number,
  userId: string,
  isHidden: boolean,
) {
  return await conn`
    UPDATE recipes 
    SET is_hidden = ${isHidden},
        updated_at = NOW()
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
    WHERE slug = ${slug} AND is_published = true AND is_hidden = false
    LIMIT 1
  `;
}
