import type { Recipe, RecipeInput } from '../types/recipe'

let mockRecipes: Recipe[] = [
  {
    id: '1',
    name: '鶏の照り焼き',
    url: 'https://cookpad.com/recipe/1',
    comment: '簡単で美味しい定番料理',
    rating: 5,
    created_at: new Date('2024-01-01').toISOString(),
    updated_at: new Date('2024-01-01').toISOString()
  },
  {
    id: '2',
    name: 'パスタ カルボナーラ',
    url: 'https://cookpad.com/recipe/2',
    comment: '濃厚でクリーミー',
    rating: 4,
    created_at: new Date('2024-01-02').toISOString(),
    updated_at: new Date('2024-01-02').toISOString()
  },
  {
    id: '3',
    name: 'ハンバーグ',
    url: 'https://cookpad.com/recipe/3',
    comment: '子供も大好き',
    rating: 3,
    created_at: new Date('2024-01-03').toISOString(),
    updated_at: new Date('2024-01-03').toISOString()
  }
]

export const mockRecipeService = {
  async getRecipes(ratingFilter?: number): Promise<Recipe[]> {
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let filteredRecipes = [...mockRecipes]
    
    if (ratingFilter && ratingFilter > 0) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.rating === ratingFilter)
    }
    
    return filteredRecipes.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  },

  async createRecipe(recipe: RecipeInput): Promise<Recipe> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const newRecipe: Recipe = {
      id: String(mockRecipes.length + 1),
      ...recipe,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
    
    mockRecipes.push(newRecipe)
    return newRecipe
  },

  async updateRecipe(id: string, recipe: Partial<RecipeInput>): Promise<Recipe> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = mockRecipes.findIndex(r => r.id === id)
    if (index === -1) {
      throw new Error('Recipe not found')
    }
    
    const updatedRecipe = {
      ...mockRecipes[index],
      ...recipe,
      updated_at: new Date().toISOString()
    }
    
    mockRecipes[index] = updatedRecipe
    return updatedRecipe
  },

  async deleteRecipe(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
    
    const index = mockRecipes.findIndex(r => r.id === id)
    if (index === -1) {
      throw new Error('Recipe not found')
    }
    
    mockRecipes.splice(index, 1)
  }
}