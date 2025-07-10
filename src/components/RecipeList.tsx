import React, { useState } from 'react'
import type { Recipe } from '../types/recipe'
import { RecipeCard } from './RecipeCard'

interface RecipeListProps {
  recipes: Recipe[]
  onEdit: (recipe: Recipe) => void
  onDelete: (id: string) => void
}

export const RecipeList: React.FC<RecipeListProps> = ({ recipes, onEdit, onDelete }) => {
  const [ratingFilter, setRatingFilter] = useState<number>(0)

  const filteredRecipes = ratingFilter > 0
    ? recipes.filter(recipe => recipe.rating === ratingFilter)
    : recipes

  return (
    <>
      <div className="filter-section">
        <div className="filter-wrapper">
          <label htmlFor="rating-filter">🌟 評価でフィルター:</label>
          <select
            id="rating-filter"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(Number(e.target.value))}
          >
            <option value={0}>すべて表示</option>
            <option value={5}>★★★★★ (5星)</option>
            <option value={4}>★★★★☆ (4星)</option>
            <option value={3}>★★★☆☆ (3星)</option>
            <option value={2}>★★☆☆☆ (2星)</option>
            <option value={1}>★☆☆☆☆ (1星)</option>
          </select>
          <div className="recipe-count">
            {filteredRecipes.length} 件のレシピ
          </div>
        </div>
      </div>
      
      {filteredRecipes.length === 0 ? (
        <div className="no-recipes">
          <div className="no-recipes-icon">🍽️</div>
          <p>レシピが見つかりません</p>
          <small>フィルターを変更するか、新しいレシピを追加してください</small>
        </div>
      ) : (
        <div className="recipes-grid">
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </>
  )
}