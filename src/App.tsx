import { useState, useEffect } from 'react'
import type { Recipe, RecipeInput } from './types/recipe'
import { recipeService } from './services/recipeService'
import { RecipeForm } from './components/RecipeForm'
import { RecipeList } from './components/RecipeList'
import { Modal } from './components/Modal'
import { Auth } from './components/Auth'
import { supabase } from './lib/supabase'
import './App.css'

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    // 認証状態の確認
    const checkAuth = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
        if (user) {
          await loadRecipes()
        }
      } catch (error) {
        console.error('認証確認エラー:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // 認証状態の変更を監視
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        loadRecipes()
      } else {
        setRecipes([])
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const openModal = () => {
    setIsModalOpen(true)
    setEditingRecipe(null)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingRecipe(null)
  }

  const loadRecipes = async () => {
    try {
      const data = await recipeService.getRecipes()
      setRecipes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const handleSubmit = async (recipeData: RecipeInput) => {
    try {
      if (editingRecipe) {
        const updatedRecipe = await recipeService.updateRecipe(editingRecipe.id, recipeData)
        setRecipes(recipes.map(r => r.id === editingRecipe.id ? updatedRecipe : r))
        setEditingRecipe(null)
      } else {
        const newRecipe = await recipeService.createRecipe(recipeData)
        setRecipes([newRecipe, ...recipes])
      }
      closeModal()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }


  const handleEdit = (recipe: Recipe) => {
    setEditingRecipe(recipe)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await recipeService.deleteRecipe(id)
      setRecipes(recipes.filter(r => r.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }


  const handleAuthSuccess = () => {
    loadRecipes()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setRecipes([])
  }

  if (loading) {
    return <div className="loading">読み込み中...</div>
  }

  if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />
  }


  return (
    <div className="app">
      <header className="app-header">
        <h1>CookMemo</h1>
        <div className="header-actions">
          <span>ようこそ、{user.email}さん</span>
          <button onClick={toggleDarkMode} className="dark-mode-toggle">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button onClick={handleSignOut} className="sign-out-btn">
            ログアウト
          </button>
        </div>
      </header>
      
      {error && (
        <div className="error">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <div className="app-actions">
        <button onClick={openModal} className="add-recipe-btn">
          ➕ レシピを追加
        </button>
      </div>

      <main className="app-main">
        <RecipeList
          recipes={recipes}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title={editingRecipe ? 'レシピを編集' : 'レシピを追加'}
      >
        <RecipeForm 
          onSubmit={handleSubmit}
          initialData={editingRecipe || undefined}
          isEditing={!!editingRecipe}
        />
      </Modal>
    </div>
  )
}

export default App
