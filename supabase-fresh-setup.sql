-- 認証機能完全削除版 - シンプルなテーブル構造

-- 1. 既存のテーブルを完全削除（存在する場合）
DROP TABLE IF EXISTS recipes CASCADE;

-- 2. シンプルなテーブル構造を作成（user_id削除）
CREATE TABLE recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  comment TEXT DEFAULT '',
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. RLS を無効化
ALTER TABLE recipes DISABLE ROW LEVEL SECURITY;

-- 4. インデックスを作成
CREATE INDEX idx_recipes_rating ON recipes(rating);
CREATE INDEX idx_recipes_created_at ON recipes(created_at);

-- 5. テスト用のサンプルデータを挿入
INSERT INTO recipes (name, url, comment, rating) VALUES
  ('カレーライス', 'https://example.com/curry', 'スパイシーで美味しい', 5),
  ('オムライス', 'https://example.com/omrice', '簡単に作れます', 4),
  ('ハンバーグ', 'https://example.com/hamburg', '家族に好評でした', 5);

-- 6. 動作確認用クエリ
SELECT id, name, url, comment, rating, created_at FROM recipes ORDER BY created_at DESC;