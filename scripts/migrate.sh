#!/bin/bash

# CookMemo - Supabase Migration Script
# データベーススキーマの自動更新スクリプト

set -e

echo "🚀 CookMemo - Supabase Migration Script"
echo "========================================"

# 設定確認
if [ ! -f ".env" ]; then
    echo "❌ エラー: .env ファイルが見つかりません"
    exit 1
fi

# 環境変数の読み込み
source .env

# Project ID を URL から抽出
PROJECT_ID=$(echo $VITE_SUPABASE_URL | sed 's/https:\/\/\(.*\)\.supabase\.co/\1/')

echo "📋 プロジェクト情報:"
echo "   Project ID: $PROJECT_ID"
echo "   URL: $VITE_SUPABASE_URL"
echo ""

# Supabase CLI のバージョン確認
echo "🔧 Supabase CLI バージョン:"
supabase --version
echo ""

# アクセストークンの確認
if [ -z "$SUPABASE_ACCESS_TOKEN" ]; then
    echo "⚠️  警告: SUPABASE_ACCESS_TOKEN が設定されていません"
    echo "   手順:"
    echo "   1. https://supabase.com/dashboard/account/tokens でアクセストークンを生成"
    echo "   2. .env ファイルに SUPABASE_ACCESS_TOKEN=your_token を追加"
    echo "   3. このスクリプトを再実行"
    echo ""
    echo "   または、以下のコマンドでプロジェクトにリンクしてマイグレーションを実行:"
    echo "   supabase link --project-ref $PROJECT_ID"
    echo "   supabase db push"
    exit 1
fi

# プロジェクトにリンク
echo "🔗 プロジェクトにリンクしています..."
supabase link --project-ref $PROJECT_ID

# マイグレーションファイルの確認
echo "📁 マイグレーションファイルの確認:"
ls -la supabase/migrations/

# マイグレーションの実行
echo "🔄 マイグレーションを実行しています..."
supabase db push

echo "✅ マイグレーションが完了しました！"
echo ""
echo "📊 データベース情報:"
echo "   Dashboard: https://supabase.com/dashboard/project/$PROJECT_ID"
echo "   Table Editor: https://supabase.com/dashboard/project/$PROJECT_ID/editor"
echo "   API: https://supabase.com/dashboard/project/$PROJECT_ID/api"