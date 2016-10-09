-- original: fts4onepass.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE ft USING fts3;
  INSERT INTO ft(rowid, content) VALUES(1, '1 2 3');
  INSERT INTO ft(rowid, content) VALUES(2, '4 5 6');
  INSERT INTO ft(rowid, content) VALUES(3, '7 8 9')
;CREATE TABLE t1(x);

  CREATE TRIGGER t1_ai AFTER INSERT ON t1 BEGIN
    DELETE FROM ft WHERE rowid=new.x;
  END;

  CREATE TRIGGER t1_ad AFTER DELETE ON t1 BEGIN
    UPDATE ft SET content = 'a b c' WHERE rowid=old.x;
  END;

  CREATE TRIGGER t1_bu BEFORE UPDATE ON t1 BEGIN
    DELETE FROM ft WHERE rowid=old.x;
  END;