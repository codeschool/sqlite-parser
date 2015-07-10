CREATE VIRTUAL TABLE happy_table
USING happy_module(
  id int PRIMARY KEY,
  name varchar(50),
  category varchar(15),
  cost int);
