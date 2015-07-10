CREATE TABLE [bees] AS
  SELECT
    name,
    color,
    legs,
    id
  FROM
    [old_bees]
  WHERE
    name IS NOT NULL
