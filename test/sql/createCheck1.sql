CREATE TABLE Bees (
  id int PRIMARY KEY,
  name varchar(50) NOT NULL UNIQUE,
  wings int CHECK(wings >= 2),
  legs int CHECK (legs < 8)
);
