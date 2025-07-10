import React from 'react'
import type { Recipe } from '../types/recipe'

interface RecipeCardProps {
  recipe: Recipe
  onEdit: (recipe: Recipe) => void
  onDelete: (id: string) => void
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onEdit, onDelete }) => {
  const getStarRating = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 5) return 'rating-excellent'
    if (rating >= 4) return 'rating-good'
    if (rating >= 3) return 'rating-average'
    if (rating >= 2) return 'rating-fair'
    return 'rating-poor'
  }

  return (
    <div className="recipe-card">
      <div className="recipe-card-header">
        <div className="recipe-title-section">
          <h3 className="recipe-name">{recipe.name}</h3>
          <div className={`recipe-rating ${getRatingColor(recipe.rating)}`}>
            <span className="stars">{getStarRating(recipe.rating)}</span>
            <span className="rating-text">{recipe.rating}.0</span>
          </div>
        </div>
      </div>
      
      <div className="recipe-card-body">
        {recipe.comment && (
          <div className="recipe-comment">
            <span className="comment-icon">💭</span>
            <p>{recipe.comment}</p>
          </div>
        )}
        
        <div className="recipe-meta">
          <div className="recipe-date">
            <span className="date-icon">📅</span>
            <span>{formatDate(recipe.created_at)}</span>
          </div>
          <a 
            href={recipe.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="recipe-link"
          >
            <span className="link-icon">🔗</span>
            レシピを見る
          </a>
        </div>
      </div>
      
      <div className="recipe-card-actions">
        <button
          className="action-btn edit-btn"
          onClick={() => onEdit(recipe)}
          title="レシピを編集"
        >
          <span className="btn-icon">✏️</span>
          編集
        </button>
        <button
          className="action-btn delete-btn"
          onClick={() => {
            if (window.confirm(`「${recipe.name}」を削除しますか？`)) {
              onDelete(recipe.id)
            }
          }}
          title="レシピを削除"
        >
          <span className="btn-icon">🗑️</span>
          削除
        </button>
      </div>
    </div>
  )
}