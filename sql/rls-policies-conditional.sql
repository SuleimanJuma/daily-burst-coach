-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY IF NOT EXISTS "Users can view own profile" ON users 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Users can update own profile" ON users 
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY IF NOT EXISTS "Enable insert for authenticated users only" ON users 
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Lessons table policies
CREATE POLICY IF NOT EXISTS "Anyone can view published lessons" ON lessons 
  FOR SELECT USING (status = 'published');

CREATE POLICY IF NOT EXISTS "Admins can manage all lessons" ON lessons 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- User lessons table policies
CREATE POLICY IF NOT EXISTS "Users can view own lesson progress" ON user_lessons 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own lesson progress" ON user_lessons 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update own lesson progress" ON user_lessons 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Admins can view all lesson progress" ON user_lessons 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Lesson schedules table policies
CREATE POLICY IF NOT EXISTS "Users can view own lesson schedules" ON lesson_schedules 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own lesson schedules" ON lesson_schedules 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update own lesson schedules" ON lesson_schedules 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete own lesson schedules" ON lesson_schedules 
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Admins can manage all lesson schedules" ON lesson_schedules 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- Daily progress table policies
CREATE POLICY IF NOT EXISTS "Users can view own daily progress" ON daily_progress 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own daily progress" ON daily_progress 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update own daily progress" ON daily_progress 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Admins can view all daily progress" ON daily_progress 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- User streaks table policies
CREATE POLICY IF NOT EXISTS "Users can view own streaks" ON user_streaks 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own streaks" ON user_streaks 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update own streaks" ON user_streaks 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Admins can view all streaks" ON user_streaks 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- WhatsApp messages table policies
CREATE POLICY IF NOT EXISTS "Users can view own messages" ON whatsapp_messages 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own messages" ON whatsapp_messages 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Admins can manage all messages" ON whatsapp_messages 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );

-- User preferences table policies
CREATE POLICY IF NOT EXISTS "Users can view own preferences" ON user_preferences 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can insert own preferences" ON user_preferences 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can update own preferences" ON user_preferences 
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Users can delete own preferences" ON user_preferences 
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY IF NOT EXISTS "Admins can view all preferences" ON user_preferences 
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role = 'admin'
    )
  );