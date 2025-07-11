# GitHub Pages 白い画面問題の診断と解決

## 現在の状況
- URL: https://it-tsumugi.github.io/cook-memo/
- 症状: 白い画面が表示される
- 最新コミット: 環境変数設定とエラーログ強化済み

## 原因の可能性

### 1. Repository Secrets未設定 (最も可能性高)
GitHub Repository Secretsに以下が設定されていない：
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

### 2. GitHub Actions確認方法
1. https://github.com/it-tsumugi/cook-memo/actions にアクセス
2. 最新のデプロイを確認
3. ビルドログで環境変数エラーを確認

## 詳細診断手順

### Step 1: Repository Secrets確認
```
1. https://github.com/it-tsumugi/cook-memo/settings/secrets/actions にアクセス
2. 以下のSecretsがあるか確認：
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY
```

### Step 2: GitHub Actions ログ確認
```
1. https://github.com/it-tsumugi/cook-memo/actions
2. 最新の "Deploy to GitHub Pages" ワークフローをクリック
3. "build" ジョブをクリック
4. "Build" ステップのログを確認
5. エラーメッセージを探す
```

### Step 3: ブラウザデバッグ
```
1. https://it-tsumugi.github.io/cook-memo/ を開く
2. F12で開発者ツールを開く
3. Console タブを確認
4. 以下のメッセージがあるかチェック：
   - "Missing Supabase environment variables"
   - "Loading CookMemo..."
   - "Base URL:" と "Pathname:" のログ
```

## 解決手順

### Repository Secretsが未設定の場合

#### 1. GitHub Repository Secretsに移動
```
https://github.com/it-tsumugi/cook-memo/settings/secrets/actions
```

#### 2. 1つ目のSecret追加
```
Name: VITE_SUPABASE_URL
Secret: https://hrcroaattvljixtmnwaw.supabase.co
```

#### 3. 2つ目のSecret追加
```
Name: VITE_SUPABASE_ANON_KEY
Secret: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyY3JvYWF0dHZsaml4dG1ud2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNjA1MTAsImV4cCI6MjA2NzczNjUxMH0.e8kqElZEjIf_RMJd0sw7at04Af1XO-_7jOuoPS7kXtg
```

#### 4. 再デプロイ実行
```
1. https://github.com/it-tsumugi/cook-memo/actions
2. 最新の "Deploy to GitHub Pages" をクリック
3. "Re-run all jobs" をクリック
```

### GitHub Pages設定確認
```
1. https://github.com/it-tsumugi/cook-memo/settings/pages
2. Source: "GitHub Actions" になっているか確認
```

## 期待される結果

設定完了後：
1. GitHub Actionsが成功する
2. https://it-tsumugi.github.io/cook-memo/ でCookMemoのログイン画面が表示される
3. ブラウザコンソールに環境変数エラーが表示されない

## その他の可能性

### JavaScript/React エラー
- ブラウザコンソールでエラーメッセージをチェック
- TypeScript コンパイルエラーがないか確認

### ネットワークリソース読み込み失敗
- F12 → Network タブでリソースの読み込み状況を確認
- CSS/JSファイルが404になっていないかチェック