-- Create profile and subscription triggers on user creation --
CREATE OR REPLACE FUNCTION create_user_profile_subscription()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (user_id, created_at, updated_at)
  VALUES (NEW.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

  INSERT INTO subscriptions (user_id, is_active, sub_status, created_at, updated_at)
  VALUES (NEW.id, FALSE, 'no_subscription', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION create_user_profile_subscription();
