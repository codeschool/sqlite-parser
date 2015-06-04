INSERT INTO foods (item, size, id, price)
  SELECT 'banana', size, null, price
  FROM bananas
  WHERE color != 'red'
