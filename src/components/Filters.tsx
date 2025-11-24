// app/components/Filters.tsx
"use client";

import { useMemo, useState } from "react";
import { type Recipe, TAG_OPTIONS } from "@/types";

interface FiltersProps {
  recipes: Recipe[];
  onFilteredRecipesChange: (filtered: Recipe[]) => void;
}

export default function Filters({
  recipes,
  onFilteredRecipesChange,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Filter recipes based on selected tags
  const filteredRecipes = useMemo(() => {
    if (selectedTags.length === 0) {
      return recipes;
    }

    return recipes.filter((recipe) => {
      if (!recipe.tags || recipe.tags.length === 0) return false;
      // Recipe must have at least one of the selected tags
      return selectedTags.some((tag) => recipe.tags?.includes(tag));
    });
  }, [recipes, selectedTags]);

  // Update parent component whenever filtered recipes change
  useMemo(() => {
    onFilteredRecipesChange(filteredRecipes);
  }, [filteredRecipes, onFilteredRecipesChange]);

  const toggleCategory = (category: string) => {
    if (activeCategories.includes(category)) {
      setActiveCategories(activeCategories.filter((c) => c !== category));
    } else {
      setActiveCategories([...activeCategories, category]);
    }
    setIsOpen(true);
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearAllFilters = () => {
    setSelectedTags([]);
    setActiveCategories([]);
    setIsOpen(false);
  };

  return (
    <div className="bg-white border-2 border-black rounded-2xl p-6 mb-8">
      {/* Top Row */}
      <div className="flex items-center justify-between gap-4">
        {/* Filters Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 border-black font-semibold transition-colors ${
            isOpen ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          Filters
          <span className="text-sm">{isOpen ? "▲" : "▼"}</span>
          {selectedTags.length > 0 && (
            <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {selectedTags.length}
            </span>
          )}
        </button>

        {/* Category Buttons */}
        <div className="flex gap-3 flex-wrap">
          {Object.keys(TAG_OPTIONS).map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-4 py-2 rounded-full border-2 border-black font-semibold capitalize transition-colors ${
                activeCategories.includes(category)
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
          {selectedTags.length > 0 && (
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 rounded-full border-2 border-red-500 text-red-500 font-semibold hover:bg-red-50"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Expanded Tag Options */}
      {isOpen && activeCategories.length > 0 && (
        <div className="mt-6 space-y-4">
          {activeCategories.map((category) => (
            <div key={category} className="space-y-2">
              <h3 className="font-bold text-lg capitalize">{category}</h3>
              <div className="flex gap-2 flex-wrap">
                {TAG_OPTIONS[category].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full border-2 text-sm font-medium transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-black text-white border-black"
                        : "bg-white text-black border-gray-300 hover:border-black"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Active Filters Display */}
      {selectedTags.length > 0 && (
        <div className="mt-4 pt-4 border-t-2 border-gray-200">
          <p className="text-sm font-semibold mb-2">
            Active Filters ({filteredRecipes.length} recipes):
          </p>
          <div className="flex gap-2 flex-wrap">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-black text-white rounded-full text-sm font-medium flex items-center gap-2"
              >
                {tag}
                <button
                  onClick={() => toggleTag(tag)}
                  className="hover:text-gray-300"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
