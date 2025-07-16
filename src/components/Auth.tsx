import React, { useState } from 'react'
import { supabase } from '../lib/supabase'

interface AuthProps {
  onAuthSuccess: () => void
}

export const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password
        })
        if (error) {
          setMessage(error.message)
        } else {
          if (data.user) {
            setMessage('アカウントが正常に作成されました。')
            setTimeout(() => {
              onAuthSuccess()
            }, 1000)
          } else {
            setMessage('アカウントが正常に作成されました。ログインしてください。')
          }
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) {
          setMessage(error.message)
        } else {
          onAuthSuccess()
        }
      }
    } catch (error) {
      setMessage('予期しないエラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>CookMemo</h2>
          <p>{isSignUp ? '新規アカウント作成' : 'ログイン'}</p>
        </div>

        <form onSubmit={handleAuth} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your-email@example.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="6文字以上"
              minLength={6}
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? '処理中...' : (isSignUp ? 'アカウント作成' : 'ログイン')}
          </button>

          {message && (
            <div className={`auth-message ${message.includes('エラー') || message.includes('error') ? 'error' : 'info'}`}>
              {message}
            </div>
          )}
        </form>

        <div className="auth-switch">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp)
              setMessage('')
            }}
            className="auth-switch-btn"
            disabled={loading}
          >
            {isSignUp ? 'すでにアカウントをお持ちですか？ログイン' : '初めてご利用ですか？アカウント作成'}
          </button>
        </div>

      </div>
    </div>
  )
}