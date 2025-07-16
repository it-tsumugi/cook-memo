# 料理レシピ管理アプリ

料理レシピを管理するWebアプリケーションです。React TypeScriptとSupabaseを使用して構築されています。

## 機能

- ✅ レシピの追加・編集・削除
- ✅ レシピURL、コメント、星評価の管理
- ✅ 星評価によるフィルター機能
- ✅ レスポンシブデザイン
- ✅ ダークモード対応

## 技術スタック

- **フロントエンド**: React + TypeScript + Vite
- **バックエンド**: Supabase
- **ホスティング**: GitHub Pages
- **スタイリング**: CSS

## セットアップ

1. リポジトリをクローン
```bash
git clone https://github.com/yourusername/cook-memo.git
cd cook-memo
```

2. 依存関係をインストール
```bash
npm install
```

3. 環境変数を設定
```bash
cp .env.example .env
```

`.env`ファイルを編集して、SupabaseのURLとAPIキーを設定してください。

4. Supabaseデータベースを設定

**オプション A: 自動マイグレーション（推奨）**
```bash
# 1. Supabaseアクセストークンを取得
# https://supabase.com/dashboard/account/tokens

# 2. .envファイルにトークンを追加
echo "SUPABASE_ACCESS_TOKEN=your_token_here" >> .env

# 3. マイグレーション実行
npm run migrate
```

**オプション B: 手動設定**
Supabaseダッシュボードで`supabase-schema.sql`の内容を手動で実行。

5. 開発サーバーを起動
```bash
npm run dev
```

## ビルド

```bash
npm run build
```

## 使用方法

1. 「レシピを追加」フォームで新しいレシピを追加
2. レシピ一覧で既存のレシピを表示・編集・削除
3. 星評価でフィルターして特定の評価のレシピのみを表示

## データベースマイグレーション

Supabase CLIを使用してデータベーススキーマを自動更新できます。

### 利用可能なコマンド

```bash
# 完全な自動マイグレーション（推奨）
npm run migrate

# Supabaseプロジェクトへのリンク
npm run db:link

# マイグレーションファイルのプッシュ
npm run db:push
```

### マイグレーションファイルの管理

- マイグレーションファイル: `supabase/migrations/`
- スキーマ変更時: 新しいマイグレーションファイルを作成してコミット
- チーム開発: すべてのメンバーが同じスキーマを共有

### 必要な設定

1. **Supabaseアクセストークン**: [Dashboard](https://supabase.com/dashboard/account/tokens)で生成
2. **環境変数**: `.env`に`SUPABASE_ACCESS_TOKEN`を追加

## デプロイ

このプロジェクトはVercelでデプロイされます。

### Vercelデプロイ手順
1. [Vercel](https://vercel.com) にアクセス
2. GitHubリポジトリを連携
3. 環境変数を設定（詳細は `VERCEL_DEPLOY_GUIDE.md` を参照）
4. デプロイ実行

### 自動デプロイ
mainブランチにプッシュすると自動的にVercelでビルド・デプロイされます。