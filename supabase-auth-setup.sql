-- 認証機能付きレシピテーブルのセットアップ

-- 1. 既存のテーブルを削除
DROP TABLE IF EXISTS recipes CASCADE;

-- 2. 認証機能付きテーブルを作成
CREATE TABLE recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  comment TEXT DEFAULT '',
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. RLS（Row Level Security）を有効化
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- 4. RLSポリシーを作成
-- ユーザーは自分のレシピのみ表示可能
CREATE POLICY "Users can view their own recipes" ON recipes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- ユーザーは自分のレシピのみ作成可能
CREATE POLICY "Users can create their own recipes" ON recipes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ユーザーは自分のレシピのみ更新可能
CREATE POLICY "Users can update their own recipes" ON recipes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ユーザーは自分のレシピのみ削除可能
CREATE POLICY "Users can delete their own recipes" ON recipes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- 5. インデックスを作成
CREATE INDEX idx_recipes_user_id ON recipes(user_id);
CREATE INDEX idx_recipes_rating ON recipes(rating);
CREATE INDEX idx_recipes_created_at ON recipes(created_at);

-- 6. テーブル構造確認
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default 
FROM information_schema.columns 
WHERE table_name = 'recipes' 
ORDER BY ordinal_position;