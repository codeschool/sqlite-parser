BEGIN IMMEDIATE TRANSACTION;
CREATE TABLE foods (
  id int PRIMARY KEY,
  item varchar(50),
  size varchar(15),
  price int
);

INSERT INTO foods (item, size, id, price)
  SELECT 'banana', size, null, price
  FROM bananas
  WHERE color != 'red';

COMMIT;
