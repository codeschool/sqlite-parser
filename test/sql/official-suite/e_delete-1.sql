-- original: e_delete.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
  CREATE INDEX i1 ON t1(a)
;ATTACH 'test.db2' AS aux;
  ATTACH 'test.db3' AS aux2;

  CREATE TABLE temp.t7(a, b);   INSERT INTO temp.t7 VALUES(1, 2);
  CREATE TABLE main.t7(a, b);   INSERT INTO main.t7 VALUES(3, 4);
  CREATE TABLE aux.t7(a, b);    INSERT INTO aux.t7 VALUES(5, 6);
  CREATE TABLE aux2.t7(a, b);   INSERT INTO aux2.t7 VALUES(7, 8);

  CREATE TABLE main.t8(a, b);   INSERT INTO main.t8 VALUES(1, 2);
  CREATE TABLE aux.t8(a, b);    INSERT INTO aux.t8 VALUES(3, 4);
  CREATE TABLE aux2.t8(a, b);   INSERT INTO aux2.t8 VALUES(5, 6);

  CREATE TABLE aux.t9(a, b);    INSERT INTO aux.t9 VALUES(1, 2);
  CREATE TABLE aux2.t9(a, b);   INSERT INTO aux2.t9 VALUES(3, 4);

  CREATE TABLE aux2.t10(a, b);  INSERT INTO aux2.t10 VALUES(1, 2)
;DROP TRIGGER main.tr1;
  DROP TRIGGER aux.tr2
;DROP TRIGGER aux.tr1;
  DROP TRIGGER main.tr1;
  DELETE FROM main.t8 WHERE oid>1;
  DELETE FROM aux.t8 WHERE oid>1;
  INSERT INTO aux.t9 VALUES(1, 2);
  INSERT INTO main.t7 VALUES(3, 4)
;SELECT count(*) FROM temp.t7 UNION ALL SELECT count(*) FROM main.t7 UNION ALL
  SELECT count(*) FROM aux.t7  UNION ALL SELECT count(*) FROM aux2.t7;

  SELECT count(*) FROM main.t8 UNION ALL SELECT count(*) FROM aux.t8  
  UNION ALL SELECT count(*) FROM aux2.t8;

  SELECT count(*) FROM aux.t9  UNION ALL SELECT count(*) FROM aux2.t9;

  SELECT count(*) FROM aux2.t10
;CREATE TRIGGER temp.tr1 AFTER INSERT ON t7 BEGIN
    DELETE FROM t7;
    DELETE FROM t8;
    DELETE FROM t9;
    DELETE FROM t10;
  END;
  INSERT INTO temp.t7 VALUES('hello', 'world')
;SELECT count(*) FROM temp.t7 UNION ALL SELECT count(*) FROM main.t7 UNION ALL
  SELECT count(*) FROM aux.t7  UNION ALL SELECT count(*) FROM aux2.t7;

  SELECT count(*) FROM main.t8 UNION ALL SELECT count(*) FROM aux.t8  
  UNION ALL SELECT count(*) FROM aux2.t8;

  SELECT count(*) FROM aux.t9  UNION ALL SELECT count(*) FROM aux2.t9;

  SELECT count(*) FROM aux2.t10
;CREATE INDEX i8 ON t8(a, b)
;CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 'one');
    INSERT INTO t1 VALUES(2, 'two');
    INSERT INTO t1 VALUES(3, 'three');
    INSERT INTO t1 VALUES(4, 'four');
    INSERT INTO t1 VALUES(5, 'five')
;CREATE TABLE t1log(x);
    CREATE TRIGGER tr1 AFTER DELETE ON t1 BEGIN
      INSERT INTO t1log VALUES(old.a);
    END;