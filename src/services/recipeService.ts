import { supabase } from '../lib/supabase'
import type { Recipe, RecipeInput } from '../types/recipe'

export const recipeService = {
  async getRecipes(ratingFilter?: number): Promise<Recipe[]> {
    console.log('=== getRecipes called ===')
    console.log('Rating filter:', ratingFilter)
    
    let query = supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false })

    if (ratingFilter && ratingFilter > 0) {
      query = query.eq('rating', ratingFilter)
    }

    const { data, error } = await query

    if (error) {
      console.error('Get recipes error:', error)
      throw new Error(error.message)
    }

    console.log('Recipes loaded:', data?.length || 0)
    return data || []
  },

  async createRecipe(recipe: RecipeInput): Promise<Recipe> {
    // 認証機能を一時的にオフ - デバッグ用のダミーuser_idを使用
    const debugUserId = '00000000-0000-0000-0000-000000000000'
    
    const { data, error } = await supabase
      .from('recipes')
      .insert([{ ...recipe, user_id: debugUserId }])
      .select()
      .single()

    if (error) {
      console.error('Create recipe error:', error)
      throw new Error(error.message)
    }

    return data
  },

  async updateRecipe(id: string, recipe: Partial<RecipeInput>): Promise<Recipe> {
    console.log('=== updateRecipe called ===')
    console.log('Recipe ID:', id)
    console.log('Recipe data:', recipe)
    
    const { data, error } = await supabase
      .from('recipes')
      .update({ ...recipe, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Update recipe error:', error)
      throw new Error(error.message)
    }

    console.log('Recipe updated:', data)
    return data
  },

  async deleteRecipe(id: string): Promise<void> {
    console.log('=== deleteRecipe called ===')
    console.log('Recipe ID:', id)
    
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Delete recipe error:', error)
      throw new Error(error.message)
    }
    
    console.log('Recipe deleted successfully')
  }
}