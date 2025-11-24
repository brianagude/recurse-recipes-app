"use client";

import type React from "react";
import { useState } from "react";
import { type IngredientItem, type Recipe, TAG_OPTIONS } from "@/helpers/types";
import { normalizeIngredients } from "@/helpers/utils";

const UNITS = [
  "",
  "cup",
  "tbsp",
  "tsp",
  "g",
  "kg",
  "ml",
  "l",
  "oz",
  "lb",
  "whole",
];
const hourOptions = Array.from({ length: 13 }, (_, i) => i);
const minuteOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

interface RecipeFormProps {
  userId: string;
  recipe?: Recipe;
  onSave: (recipe: Recipe) => void;
  onCancel: () => void;
}

export default function RecipeForm({
  userId,
  recipe,
  onSave,
  onCancel,
}: RecipeFormProps) {
  const [formData, setFormData] = useState({
    title: recipe?.title || "",
    description: recipe?.description || "",
    ingredients: normalizeIngredients(recipe?.ingredients ?? []),
    instructions: recipe?.instructions || "",
    prep_time_hours: recipe?.prep_time ? Math.floor(recipe.prep_time / 60) : 0,
    prep_time_minutes: recipe?.prep_time ? recipe.prep_time % 60 : 0,
    cook_time_hours: recipe?.cook_time ? Math.floor(recipe.cook_time / 60) : 0,
    cook_time_minutes: recipe?.cook_time ? recipe.cook_time % 60 : 0,
    servings: recipe?.servings ?? "",
    main_image_url: recipe?.main_image_url || "",
    tags: recipe?.tags || ([] as string[]),
    is_published: recipe?.is_published || false,
  });

  // Ingredient handlers
  const addIngredient = () =>
    setFormData({
      ...formData,
      ingredients: [
        ...formData.ingredients,
        { ingredient: "", quantity: "", unit: "" },
      ],
    });

  const updateIngredient = (
    index: number,
    field: keyof IngredientItem,
    value: string,
  ) => {
    const newIngredients = formData.ingredients.map((it, i) =>
      i === index ? { ...it, [field]: value } : it,
    );
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const removeIngredient = (index: number) => {
    const next = formData.ingredients.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      ingredients: next.length
        ? next
        : [{ ingredient: "", quantity: "", unit: "" }],
    });
  };

  // Tag handlers
  const toggleTag = (tag: string) =>
    setFormData({
      ...formData,
      tags: formData.tags.includes(tag)
        ? formData.tags.filter((t) => t !== tag)
        : [...formData.tags, tag],
    });

  const isTagSelected = (tag: string) => formData.tags.includes(tag);

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payloadIngredients = formData.ingredients.map((i) => ({
      ingredient: i.ingredient,
      quantity: i.quantity,
      unit: i.unit,
    }));

    const endpoint = recipe ? "/api/recipes/update" : "/api/recipes/create";
    const body = {
      title: formData.title,
      description: formData.description,
      ingredients: payloadIngredients,
      instructions: formData.instructions,
      prep_time: formData.prep_time_hours * 60 + formData.prep_time_minutes,
      cook_time: formData.cook_time_hours * 60 + formData.cook_time_minutes,
      servings: formData.servings ? Number(formData.servings) : null,
      main_image_url: formData.main_image_url || null,
      tags: formData.tags,
      is_published: !!formData.is_published,
      userId,
      ...(recipe && { recipeId: recipe.id }),
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = await res.json();
      onSave(data.recipe);
    } else {
      const txt = await res.text();
      console.error("Recipe save error", txt);
      alert("Failed to save recipe. See console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-gray-50 rounded-lg border-2 border-blue-200"
    >
      {/* Publish */}
      <div className="flex items-center gap-2 mb-2">
        <input
          id="is_published"
          type="checkbox"
          checked={formData.is_published}
          onChange={(e) =>
            setFormData({ ...formData, is_published: e.target.checked })
          }
          className="w-4 h-4"
          aria-label="Publish recipe"
        />
        <label htmlFor="is_published" className="font-medium">
          Publish recipe (make visible to others)
        </label>
      </div>

      {/* Title */}
      <input
        type="text"
        placeholder="Recipe Title *"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-3 border rounded"
        required
        aria-required="true"
      />

      {/* Description */}
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="w-full p-3 border rounded"
        rows={3}
      />

      {/* Tags */}
      <div className="space-y-2">
        <label className="font-semibold block">Tags</label>
        {Object.entries(TAG_OPTIONS).map(([category, tags]) => (
          <div key={category}>
            <p className="font-medium capitalize mb-1">{category}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => toggleTag(t)}
                  className={`px-3 py-1 border rounded-full text-sm ${
                    isTagSelected(t)
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                  aria-pressed={isTagSelected(t)}
                  aria-label={`Toggle tag ${t}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Times and Servings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Prep Time */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="prep_time_hours">
            Prep Time
          </label>
          <div className="flex gap-2">
            <select
              id="prep_time_hours"
              value={formData.prep_time_hours}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  prep_time_hours: Number(e.target.value),
                })
              }
              className="p-3 border rounded w-full"
              aria-label="Preparation time hours"
            >
              {hourOptions.map((h) => (
                <option key={h} value={h}>
                  {h} hr
                </option>
              ))}
            </select>

            <select
              id="prep_time_minutes"
              value={formData.prep_time_minutes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  prep_time_minutes: Number(e.target.value),
                })
              }
              className="p-3 border rounded w-full"
              aria-label="Preparation time minutes"
            >
              {minuteOptions.map((m) => (
                <option key={m} value={m}>
                  {m} min
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cook Time */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="cook_time_hours">
            Cook Time
          </label>
          <div className="flex gap-2">
            <select
              id="cook_time_hours"
              value={formData.cook_time_hours}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cook_time_hours: Number(e.target.value),
                })
              }
              className="p-3 border rounded w-full"
              aria-label="Cooking time hours"
            >
              {hourOptions.map((h) => (
                <option key={h} value={h}>
                  {h} hr
                </option>
              ))}
            </select>

            <select
              id="cook_time_minutes"
              value={formData.cook_time_minutes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cook_time_minutes: Number(e.target.value),
                })
              }
              className="p-3 border rounded w-full"
              aria-label="Cooking time minutes"
            >
              {minuteOptions.map((m) => (
                <option key={m} value={m}>
                  {m} min
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Servings */}
        <div>
          <label htmlFor="servings" className="block font-semibold mb-1">
            Servings
          </label>
          <input
            id="servings"
            type="number"
            min={1}
            placeholder="Servings"
            value={formData.servings ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, servings: e.target.value })
            }
            className="p-3 border rounded w-full"
            aria-label="Number of servings"
          />
        </div>
      </div>

      {/* Main Image URL */}
      <input
        type="text"
        placeholder="Main Image URL (optional)"
        value={formData.main_image_url}
        onChange={(e) =>
          setFormData({ ...formData, main_image_url: e.target.value })
        }
        className="w-full p-3 border rounded"
        aria-label="Main image URL"
      />

      {/* Ingredients */}
      <div>
        <label className="font-semibold mb-2 block">Ingredients *</label>
        {formData.ingredients.map((item, index) => (
          <div key={index} className="flex gap-3 mb-3">
            <input
              type="text"
              placeholder="Ingredient (e.g., sugar)"
              value={item.ingredient}
              onChange={(e) =>
                updateIngredient(index, "ingredient", e.target.value)
              }
              className="flex-1 p-3 border rounded"
              aria-label={`Ingredient ${index + 1}`}
              required
            />
            <input
              type="text"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) =>
                updateIngredient(index, "quantity", e.target.value)
              }
              className="w-24 p-3 border rounded"
              aria-label={`Quantity for ingredient ${index + 1}`}
            />
            <select
              value={item.unit}
              onChange={(e) => updateIngredient(index, "unit", e.target.value)}
              className="w-32 p-3 border rounded"
              aria-label={`Unit for ingredient ${index + 1}`}
            >
              {UNITS.map((u) => (
                <option key={u} value={u}>
                  {u || "Unit"}
                </option>
              ))}
            </select>
            {formData.ingredients.length > 1 && (
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="text-red-600 hover:text-red-800 px-2"
                aria-label={`Remove ingredient ${index + 1}`}
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="text-blue-600 hover:underline text-sm mt-2"
        >
          + Add Ingredient
        </button>
      </div>

      {/* Instructions */}
      <textarea
        placeholder="Instructions *"
        value={formData.instructions}
        onChange={(e) =>
          setFormData({ ...formData, instructions: e.target.value })
        }
        className="w-full p-3 border rounded"
        rows={8}
        required
        aria-required="true"
      />

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 font-medium"
        >
          {recipe ? "Update Recipe" : "Create Recipe"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
