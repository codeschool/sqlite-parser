SELECT m.title, r.id "Theatre Number"
FROM Movies m
INNER JOIN (
  SELECT r2.movie_id
  FROM Rooms r2
  WHERE r2.seats >= 50
) AS r
ON m.id = r.movie_id AND m.title != 'Batman';
