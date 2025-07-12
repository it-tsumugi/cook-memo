# GitHub Pages 設定手順（/docs デプロイ）

## 概要
ビルド出力を `/docs` ディレクトリに配置し、GitHub Pages の標準機能でデプロイします。
GitHub Actions は不要で、mainブランチにプッシュすると自動でデプロイされます。

## 1. GitHub Pages 設定

### 設定手順
1. GitHubリポジトリページに移動: https://github.com/it-tsumugi/cook-memo
2. **Settings** → **Pages** に移動
3. **Source** を「Deploy from a branch」に設定
4. **Branch** を「main」に設定
5. **Folder** を「/ (root)」から「/docs」に変更
6. **Save** をクリック

## 2. ローカルでのビルドとデプロイ

### ビルドコマンド
```bash
# 本番ビルド（/docs に出力）
npm run build

# または
NODE_ENV=production npm run build
```

### デプロイの流れ
1. ローカルで `npm run build` を実行
2. `/docs` ディレクトリにビルド結果が生成される
3. 変更をコミットしてmainブランチにプッシュ
4. GitHub Pagesが自動で `/docs` の内容をデプロイ

## 3. 環境変数設定

### .env ファイル（ローカル用）
```bash
VITE_SUPABASE_URL=https://hrcroaattvljixtmnwaw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyY3JvYWF0dHZsaml4dG1ud2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNjA1MTAsImV4cCI6MjA2NzczNjUxMH0.e8kqElZEjIf_RMJd0sw7at04Af1XO-_7jOuoPS7kXtg
```

## 4. ファイル構成

```
cook-memo/
├── docs/                     # ビルド出力（GitHub Pages配信）
│   ├── .nojekyll             # Jekyll無効化
│   ├── index.html            # メインページ
│   └── assets/               # CSS/JS ファイル
├── src/                      # ソースコード
├── vite.config.ts            # outDir: 'docs' 設定
└── package.json              # deploy スクリプト
```

## 5. 利点

### GitHub Actions不要
- Secretsの設定が不要
- ワークフロー管理が不要
- シンプルな設定

### 環境変数の扱い
- ビルド時に `.env` から読み込み
- 本番環境の設定が簡単

### デプロイの簡易化
```bash
npm run build    # ビルド
git add docs/    # 変更をステージング
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## 6. アクセス確認

デプロイ完了後、以下のURLでアクセス:
- メインページ: https://it-tsumugi.github.io/cook-memo/
- テストページ: https://it-tsumugi.github.io/cook-memo/test.html

## 7. トラブルシューティング

### 白い画面が表示される場合
1. F12でコンソールログを確認
2. 環境変数が正しく設定されているかチェック
3. `/docs/.nojekyll` ファイルが存在するか確認

### 404エラーの場合
1. GitHub Pages の設定で「/docs」フォルダが選択されているか確認
2. `vite.config.ts` の `base` パスが正しいか確認