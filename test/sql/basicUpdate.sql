UPDATE bees
SET name = 'drone', wings = 2
WHERE name NOT IN (SELECT name from bee_names WHERE size < 3.14)
