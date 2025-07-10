import { supabase } from '../lib/supabase'
import type { Recipe, RecipeInput } from '../types/recipe'

export const recipeService = {
  async getRecipes(ratingFilter?: number): Promise<Recipe[]> {
    let query = supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false })

    if (ratingFilter && ratingFilter > 0) {
      query = query.eq('rating', ratingFilter)
    }

    const { data, error } = await query

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  },

  async createRecipe(recipe: RecipeInput): Promise<Recipe> {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      throw new Error('認証が必要です')
    }

    const { data, error } = await supabase
      .from('recipes')
      .insert([{ ...recipe, user_id: user.id }])
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return data
  },

  async updateRecipe(id: string, recipe: Partial<RecipeInput>): Promise<Recipe> {
    const { data, error } = await supabase
      .from('recipes')
      .update({ ...recipe, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return data
  },

  async deleteRecipe(id: string): Promise<void> {
    const { error } = await supabase
      .from('recipes')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
  }
}