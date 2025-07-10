# デプロイメントガイド

## Supabaseプロジェクトのセットアップ

### 1. Supabaseプロジェクト作成
1. [Supabase](https://supabase.com)にアクセス
2. 新しいプロジェクトを作成
3. プロジェクトURL（`https://xxx.supabase.co`）とanon keyを取得

### 2. データベーススキーマ作成
1. Supabaseダッシュボードの「SQL Editor」を開く
2. `supabase-schema.sql`の内容をコピー&ペースト
3. 実行してテーブルを作成

### 3. 環境変数設定
1. `.env`ファイルを編集:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key
```

### 4. 本番サービス切り替え
`src/App.tsx`を編集:
```typescript
// モックサービス（開発用）
import { mockRecipeService as recipeService } from './services/mockRecipeService'

// 本番サービス（Supabase）
import { recipeService } from './services/recipeService'
```

## GitHub Pagesデプロイ

### 自動デプロイ設定
1. GitHubリポジトリの設定で「Pages」を開く
2. Source: 「GitHub Actions」を選択
3. `.github/workflows/deploy.yml`が自動デプロイを実行

### 手動デプロイ
```bash
npm run build
# distフォルダの内容をGitHub Pagesにアップロード
```

## 注意事項

### セキュリティ
- Row Level Security (RLS) を有効にする
- 本番環境では適切な認証を実装する
- 環境変数を安全に管理する

### パフォーマンス
- Supabase接続時は適切なエラーハンドリングを実装
- レスポンス時間を監視する
- 必要に応じてキャッシュを実装する