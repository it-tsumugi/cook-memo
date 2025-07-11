# GitHub Pages 設定手順

## 1. GitHub Repository Secrets設定

GitHub Pagesで正しく動作させるには、以下の環境変数をRepository Secretsに設定する必要があります。

### 設定手順
1. GitHubリポジトリのページに移動
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret**をクリック
4. 以下の2つのシークレットを追加：

```
Name: VITE_SUPABASE_URL
Value: https://hrcroaattvljixtmnwaw.supabase.co

Name: VITE_SUPABASE_ANON_KEY  
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyY3JvYWF0dHZsaml4dG1ud2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNjA1MTAsImV4cCI6MjA2NzczNjUxMH0.e8kqElZEjIf_RMJd0sw7at04Af1XO-_7jOuoPS7kXtg
```

## 2. GitHub Pages設定

1. **Settings** → **Pages**
2. **Source**: "GitHub Actions"を選択
3. **Save**をクリック

## 3. デプロイ確認

1. mainブランチにプッシュ
2. **Actions**タブでデプロイ状況を確認
3. 完了後、`https://USERNAME.github.io/cook-memo/`でアクセス

## 4. トラブルシューティング

### 白い画面が表示される場合
- [ ] Repository Secretsが正しく設定されているか確認
- [ ] GitHub ActionsのBuildステップでエラーが発生していないか確認
- [ ] ブラウザの開発者ツールでJavaScriptエラーをチェック
- [ ] コンソールログでSupabase環境変数の状態を確認

### よくあるエラー
1. **Environment variables not found**: Repository Secretsが未設定
2. **Supabase connection error**: 無効なURL/APIキー
3. **404 Error**: GitHub Pages設定が不完全
4. **White screen**: ベースパス設定やJavaScriptエラー

### デバッグ方法
1. **コンソールログ確認**: F12でデベロッパーツールを開く
2. **環境変数確認**: 「Missing Supabase environment variables」エラーをチェック
3. **ネットワークエラー**: Supabaseへの接続状況を確認

## 5. 確認用テストページ

デプロイ確認用の簡単なテストページ:
`https://USERNAME.github.io/cook-memo/test.html`

このページで"hello, world"が表示されれば、GitHub Pages自体は正常に動作しています。