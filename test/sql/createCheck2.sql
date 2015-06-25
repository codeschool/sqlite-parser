CREATE TABLE Bees (
  id int PRIMARY KEY,
  name varchar(50) NOT NULL UNIQUE,
  wings int,
  legs int,
  CHECK (legs < 8),
  CHECK(wings >= 2)
);
