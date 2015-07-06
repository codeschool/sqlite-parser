CREATE TRIGGER cust_addr_chng
INSTEAD OF UPDATE OF cust_addr ON customer_address
WHEN cust_addr NOT NULL
BEGIN
  UPDATE customer
  SET cust_addr=NEW.cust_addr
  WHERE cust_id=NEW.cust_id;
END;
