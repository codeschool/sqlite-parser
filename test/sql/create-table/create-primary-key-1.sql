CREATE TABLE Bees (
  id int,
  color int,
  hive_id int UNIQUE,
  PRIMARY KEY (id) ON CONFLICT FAIL
);
