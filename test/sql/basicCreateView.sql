CREATE VIEW happy.bananaView
AS
  SELECT type, name, origin
  FROM bananas
  WHERE color = 'red'
