-- Debug用: RLSを一時的に無効化してCRUD操作確認
-- 本番環境では注意して使用

-- 1. 既存のRLSポリシーを削除
DROP POLICY IF EXISTS "Users can only see their own recipes" ON recipes;
DROP POLICY IF EXISTS "Users can only create their own recipes" ON recipes;
DROP POLICY IF EXISTS "Users can only update their own recipes" ON recipes;
DROP POLICY IF EXISTS "Users can only delete their own recipes" ON recipes;

-- 2. RLSを無効化
ALTER TABLE recipes DISABLE ROW LEVEL SECURITY;

-- 3. 匿名ユーザーでもアクセス可能にする一時的なポリシー
CREATE POLICY "Allow all operations for debugging" ON recipes
  FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- 4. RLSを再度有効化（ポリシーは緩い設定）
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- 5. テスト用のサンプルデータを挿入
INSERT INTO recipes (user_id, name, url, comment, rating) VALUES
  ('00000000-0000-0000-0000-000000000000', 'テストレシピ1', 'https://example.com/recipe1', 'とても美味しいレシピです', 5),
  ('00000000-0000-0000-0000-000000000000', 'テストレシピ2', 'https://example.com/recipe2', '簡単に作れます', 4),
  ('00000000-0000-0000-0000-000000000000', 'テストレシピ3', 'https://example.com/recipe3', '家族に好評でした', 5);

-- ============================================
-- デバッグ完了後に実行する復元用コマンド
-- ============================================
-- 以下のコマンドを実行してセキュリティを復元してください：
--
-- -- 1. デバッグ用ポリシーを削除
-- DROP POLICY IF EXISTS "Allow all operations for debugging" ON recipes;
-- 
-- -- 2. 元のRLSポリシーを復元
-- CREATE POLICY "Users can only see their own recipes" ON recipes
--   FOR SELECT
--   TO authenticated
--   USING (auth.uid() = user_id);
-- 
-- CREATE POLICY "Users can only create their own recipes" ON recipes
--   FOR INSERT
--   TO authenticated
--   WITH CHECK (auth.uid() = user_id);
-- 
-- CREATE POLICY "Users can only update their own recipes" ON recipes
--   FOR UPDATE
--   TO authenticated
--   USING (auth.uid() = user_id)
--   WITH CHECK (auth.uid() = user_id);
-- 
-- CREATE POLICY "Users can only delete their own recipes" ON recipes
--   FOR DELETE
--   TO authenticated
--   USING (auth.uid() = user_id);
-- 
-- -- 3. テストデータを削除
-- DELETE FROM recipes WHERE user_id = '00000000-0000-0000-0000-000000000000';