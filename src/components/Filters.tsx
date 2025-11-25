// app/components/Filters.tsx
"use client";

import { useMemo, useState } from "react";
import { type Recipe, TAG_OPTIONS } from "@/helpers/types";
import { CloseIcon } from "./icons/close";
import { FiltersIcon } from "./icons/filters";

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
    <div className="py-4 px-6">
      {/* Top Row */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex">
          {/* Filters Toggle */}
          <button
            type="button"
            onClick={() => activeCategories.length > 0 ? setIsOpen(!isOpen) : setIsOpen(false)}
            className="cursor-pointer flex gap-2 items-center text-lg font-semibold tracking-wide capitalize"
          >
            {isOpen ? <CloseIcon/> : <FiltersIcon/>}
            Filters
            {selectedTags.length > 0 && (
              <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {selectedTags.length}
              </span>
            )}
          </button>
          {selectedTags.length > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-lg font-bold"
            >
              &nbsp;&mdash;&nbsp; Clear All
            </button>
          )}
        </div>

        {/* Category Buttons */}
        <div className="flex gap-3 flex-wrap">
          {Object.keys(TAG_OPTIONS).map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => toggleCategory(category)}
              className={`flex gap-2 items-center text-lg font-semibold tracking-wide capitalize px-4 py-2 rounded-full border-2 border-black w-fit transition-colors ${
                activeCategories.includes(category)
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-light"
              }`}
            >
              {category}
            </button>
          ))}
          
        </div>
      </div>

      {/* Expanded Tag Options */}
      {isOpen && activeCategories.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-end gap-2">
          {activeCategories.map((category) => (
            <>
                {TAG_OPTIONS[category].map((tag) => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`flex gap-2 items-center text-lg font-semibold tracking-wide capitalize px-4 py-2 rounded-full border-2 border-black w-fit transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-gray-light"
                        : "bg-white"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
            </>
          ))}
        </div>
      )}

      {/* Active Filters Display */}
      {/* {selectedTags.length > 0 && (
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
      )} */}
    </div>
  );
}
