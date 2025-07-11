import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Debug logging
console.log('=== CookMemo Main Debug ===')
console.log('Environment:', import.meta.env.MODE)
console.log('Base URL:', import.meta.env.BASE_URL)
console.log('Supabase URL defined:', !!import.meta.env.VITE_SUPABASE_URL)
console.log('Supabase Key defined:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)

const rootElement = document.getElementById('root')
if (!rootElement) {
  console.error('Root element not found!')
  document.body.innerHTML = '<h1>Error: Root element not found</h1>'
} else {
  console.log('Root element found, rendering app...')
  
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    console.log('App rendered successfully')
  } catch (error) {
    console.error('Error rendering app:', error)
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: red;">CookMemo レンダリングエラー</h1>
        <p>アプリケーションの読み込みに失敗しました。</p>
        <details>
          <summary>エラー詳細</summary>
          <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${error}</pre>
        </details>
        <p>ブラウザのコンソール（F12）で詳細なエラーを確認してください。</p>
      </div>
    `
  }
}
