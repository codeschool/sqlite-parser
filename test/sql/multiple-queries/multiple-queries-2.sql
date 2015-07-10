CREATE TABLE Actors (
  id int PRIMARY KEY,
  name varchar(50) NOT NULL UNIQUE
);

INSERT INTO Actors (name) VALUES
  ('Vivien Leigh'),
  ('Clark Gable'),
  ('Olivia de Havilland');

CREATE TABLE Movies (
  id int PRIMARY KEY,
  title varchar(50) NOT NULL UNIQUE
);

INSERT INTO Movies (title) VALUES
  ('Don Juan'),
  ('The Lost World'),
  ('Peter Pan'),
  ('Robin Hood'),
  ('Wolfman');

CREATE TABLE Actors_Movies (
    actor_id int REFERENCES actors,
    movie_id int REFERENCES movies
);

INSERT INTO
  Actors_Movies(actor_id, movie_id)
VALUES
  (2, 5);
