import type { IngredientItem } from "./types";

// Normalizes ingredient input, converting legacy strings to objects
export function normalizeIngredients(raw: any[]): IngredientItem[] {
  if (!raw || !Array.isArray(raw)) {
    return [{ ingredient: "", quantity: "", unit: "" }];
  }
  return raw.map((ing) => {
    if (typeof ing === "string") {
      const parts = ing.trim().split(/\s+/);
      if (parts.length >= 3 && /^[\d/.-]+$/.test(parts[0])) {
        return {
          quantity: parts[0],
          unit: parts[1] || "",
          ingredient: parts.slice(2).join(" "),
        };
      }
      return { ingredient: ing, quantity: "", unit: "" };
    }
    return {
      ingredient: ing.ingredient ?? ing.name ?? "",
      quantity: String(ing.quantity ?? ""),
      unit: ing.unit ?? "",
    };
  });
}
