CREATE TABLE Actors (
  name varchar(50),
  country varchar(50),
  salary integer
);

INSERT INTO Actors (name, country, salary) VALUES
  ('Vivien Leigh', 'IN', 150000),
  ('Clark Gable', 'USA', 120000),
  ('Olivia de Havilland', 'Japan', 30000),
  ('Hattie McDaniel', 'USA', 45000);

SELECT
 MIN(salary) AS "MinSalary",
 MAX(salary) AS "MaxSalary"
FROM
 Actors;
