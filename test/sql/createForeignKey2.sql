CREATE TABLE Bees (
  id int PRIMARY KEY,
  color int,
  hive_id int UNIQUE REFERENCES Hives(id)
);
