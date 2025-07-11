# GitHub Pages 設定手順

## 1. GitHub Repository Secrets 設定

GitHub Pages で正しく動作させるには、以下の環境変数を Repository Secrets に設定する必要があります。

### 設定手順

1. GitHub リポジトリのページに移動
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret**をクリック
4. 以下の 2 つのシークレットを追加：

## 2. GitHub Pages 設定

1. **Settings** → **Pages**
2. **Source**: "GitHub Actions"を選択
3. **Save**をクリック

## 3. デプロイ確認

1. main ブランチにプッシュ
2. **Actions**タブでデプロイ状況を確認
3. 完了後、`https://USERNAME.github.io/cook-memo/`でアクセス

## 4. トラブルシューティング

### 白い画面が表示される場合

- [ ] Repository Secrets が正しく設定されているか確認
- [ ] GitHub Actions の Build ステップでエラーが発生していないか確認
- [ ] ブラウザの開発者ツールで JavaScript エラーをチェック
- [ ] コンソールログで Supabase 環境変数の状態を確認

### よくあるエラー

1. **Environment variables not found**: Repository Secrets が未設定
2. **Supabase connection error**: 無効な URL/API キー
3. **404 Error**: GitHub Pages 設定が不完全
4. **White screen**: ベースパス設定や JavaScript エラー

### デバッグ方法

1. **コンソールログ確認**: F12 でデベロッパーツールを開く
2. **環境変数確認**: 「Missing Supabase environment variables」エラーをチェック
3. **ネットワークエラー**: Supabase への接続状況を確認

## 5. 確認用テストページ

デプロイ確認用の簡単なテストページ:
`https://USERNAME.github.io/cook-memo/test.html`

このページで"hello, world"が表示されれば、GitHub Pages 自体は正常に動作しています。
