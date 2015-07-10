CREATE TEMPORARY TRIGGER IF NOT EXISTS happy_bee_time
BEFORE DELETE ON bees
FOR EACH ROW
WHEN name == 'Nick'
BEGIN
  INSERT INTO hive (id, name) VALUES
  (4, 'A Better Hive');
  INSERT INTO bees (name, color, hive_id) VALUES
  ('New Nick', 'purple', 4);
END;
