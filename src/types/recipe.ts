export interface Recipe {
  id: string
  name: string
  url: string
  comment: string
  rating: number
  created_at: string
  updated_at: string
}

export interface RecipeInput {
  name: string
  url: string
  comment: string
  rating: number
}