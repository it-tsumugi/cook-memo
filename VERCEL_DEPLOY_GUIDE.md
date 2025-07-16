# Vercel デプロイガイド

## 概要
CookMemo アプリケーションをVercelにデプロイする手順です。

## 1. Vercelアカウント設定

### 前提条件
- Vercelアカウントを作成: https://vercel.com/signup
- GitHubアカウントとの連携

## 2. デプロイ手順

### 方法A: Vercel Dashboard（推奨）
1. https://vercel.com/dashboard にアクセス
2. "New Project" をクリック
3. GitHubリポジトリ `it-tsumugi/cook-memo` を選択
4. "Import" をクリック
5. 設定確認（自動検出されます）:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. "Deploy" をクリック

### 方法B: Vercel CLI
```bash
# Vercel CLI をインストール
npm i -g vercel

# プロジェクトディレクトリで実行
vercel

# 初回設定
# - Set up and deploy? Yes
# - Which scope? (あなたのアカウント)
# - Link to existing project? No
# - Project name: cook-memo
# - In which directory? ./
# - Want to override the settings? No
```

## 3. 環境変数設定

### Vercel Dashboard で設定
1. プロジェクトの Settings → Environment Variables
2. 以下の変数を追加:

```
Name: VITE_SUPABASE_URL
Value: your_supabase_project_url

Name: VITE_SUPABASE_ANON_KEY
Value: your_supabase_anon_key
```

### 環境別設定
- **Production**: 本番環境用
- **Preview**: プレビュー環境用（オプション）
- **Development**: 開発環境用（オプション）

## 4. 自動デプロイ設定

### Git連携
- **main ブランチ**: 自動で本番環境にデプロイ
- **その他のブランチ**: プレビュー環境にデプロイ

### デプロイトリガー
```bash
# 本番デプロイ
git push origin main

# プレビューデプロイ
git push origin feature-branch
```

## 5. カスタムドメイン（オプション）

### 設定方法
1. Vercel Dashboard → Project Settings → Domains
2. "Add Domain" をクリック
3. ドメイン名を入力
4. DNS設定を更新

## 6. ファイル構成

```
cook-memo/
├── vercel.json          # Vercel設定ファイル
├── vite.config.ts       # Vite設定（outDir: 'dist'）
├── package.json         # ビルドコマンド設定
├── .gitignore          # .vercel追加
└── src/                # ソースコード
```

## 7. 設定ファイル詳細

### vercel.json
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 重要なポイント
- **SPA対応**: rewritesでルーティングを設定
- **自動ビルド**: プッシュ時に自動でビルド・デプロイ
- **環境変数**: Vercel Dashboard で安全に管理

## 8. デプロイ後の確認

### アクセス確認
- **本番URL**: https://cook-memo-xxx.vercel.app
- **プレビューURL**: https://cook-memo-git-branch-xxx.vercel.app

### 動作確認
1. アプリケーションが正常に読み込まれる
2. Supabase認証が機能する
3. レシピのCRUD操作が可能
4. レスポンシブデザインが適用される

## 9. トラブルシューティング

### よくある問題
1. **白い画面**: 環境変数が設定されていない
2. **ビルドエラー**: TypeScriptエラーや依存関係の問題
3. **404エラー**: vercel.jsonのrewrites設定が必要

### デバッグ方法
1. Vercel Dashboard → Functions → View Function Logs
2. ブラウザの開発者ツールでコンソールエラーを確認
3. Network タブで API リクエストの状況を確認

## 10. 利点

### GitHub Pages との比較
- **環境変数**: 安全に管理可能
- **自動デプロイ**: プッシュ時に自動実行
- **プレビュー**: ブランチごとにプレビュー環境
- **パフォーマンス**: CDN とエッジ配信
- **SSL**: 自動でHTTPS対応

### 開発体験
- **リアルタイム**: 変更が即座に反映
- **ログ**: 詳細なビルドログ
- **分析**: アクセス解析機能
- **チーム**: 複数人での開発に対応