import React, { useState } from 'react'
import type { RecipeInput } from '../types/recipe'

interface RecipeFormProps {
  onSubmit: (recipe: RecipeInput) => void
  initialData?: Partial<RecipeInput>
  isEditing?: boolean
}

export const RecipeForm: React.FC<RecipeFormProps> = ({
  onSubmit,
  initialData = {},
  isEditing = false
}) => {
  const [name, setName] = useState(initialData.name || '')
  const [url, setUrl] = useState(initialData.url || '')
  const [comment, setComment] = useState(initialData.comment || '')
  const [rating, setRating] = useState(initialData.rating || 1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && url.trim()) {
      onSubmit({
        name: name.trim(),
        url: url.trim(),
        comment: comment.trim(),
        rating
      })
      if (!isEditing) {
        setName('')
        setUrl('')
        setComment('')
        setRating(1)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="recipe-form">
      <h2>{isEditing ? 'レシピを編集' : 'レシピを追加'}</h2>
      <div className="form-group">
        <label htmlFor="name">レシピ名</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="レシピ名を入力してください"
        />
      </div>
      <div className="form-group">
        <label htmlFor="url">URL</label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          placeholder="https://example.com/recipe"
        />
      </div>
      <div className="form-group">
        <label htmlFor="comment">コメント</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="レシピについてのコメントを入力してください"
          rows={3}
        />
      </div>
      <div className="form-group">
        <label htmlFor="rating">評価</label>
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          <option value={1}>★☆☆☆☆ (1)</option>
          <option value={2}>★★☆☆☆ (2)</option>
          <option value={3}>★★★☆☆ (3)</option>
          <option value={4}>★★★★☆ (4)</option>
          <option value={5}>★★★★★ (5)</option>
        </select>
      </div>
      <button type="submit" className="submit-btn">
        {isEditing ? '更新' : '追加'}
      </button>
    </form>
  )
}