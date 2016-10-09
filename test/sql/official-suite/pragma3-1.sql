-- original: pragma3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA data_version
;PRAGMA temp.data_version
;PRAGMA main.data_version=1234;
  PRAGMA main.data_version
;PRAGMA data_version;
  BEGIN IMMEDIATE;
  PRAGMA data_version;
  CREATE TABLE t1(a);
  INSERT INTO t1 VALUES(100),(200),(300);
  PRAGMA data_version;
  COMMIT;
  SELECT * FROM t1;
  PRAGMA data_version
;SELECT * FROM t1;
    PRAGMA data_version
;PRAGMA data_version;
  BEGIN IMMEDIATE;
  PRAGMA data_version;
  INSERT INTO t1 VALUES(400),(500);
  PRAGMA data_version;
  COMMIT;
  SELECT * FROM t1;
  PRAGMA data_version;
  PRAGMA shrink_memory
;SELECT * FROM t1;
    PRAGMA data_version;
    BEGIN IMMEDIATE;
    PRAGMA data_version;
    UPDATE t1 SET a=a+1;
    COMMIT;
    SELECT * FROM t1;
    PRAGMA data_version
;SELECT * FROM t1;
  PRAGMA data_version
;BEGIN;
    PRAGMA data_version;
    UPDATE t1 SET a=555 WHERE a=501;
    PRAGMA data_version;
    SELECT * FROM t1 ORDER BY a;
    PRAGMA data_version
;PRAGMA data_version
;COMMIT;
    PRAGMA data_version
;PRAGMA data_version
;PRAGMA data_version
;PRAGMA data_version
;PRAGMA data_version; SELECT * FROM t1
;DELETE FROM t1 WHERE a>300
;PRAGMA data_version;
    SELECT * FROM t1
;PRAGMA data_version;
      BEGIN;
      CREATE TABLE t3(a,b,c);
      CREATE TABLE t4(x,y,z);
      INSERT INTO t4 VALUES(123,456,789);
      PRAGMA data_version;
      COMMIT;
      PRAGMA data_version
;PRAGMA data_version;
      BEGIN;
      INSERT INTO t3(a,b,c) VALUES('abc','def','ghi');
      SELECT * FROM t3;
      PRAGMA data_version
;PRAGMA data_version;
      SELECT * FROM t4
;COMMIT;
      PRAGMA data_version;
      SELECT * FROM t4
;PRAGMA data_version;
      SELECT * FROM t3;
      SELECT * FROM t4
;PRAGMA journal_mode=WAL
;PRAGMA data_version;
      PRAGMA journal_mode;
      SELECT * FROM t1
;PRAGMA data_version;
      PRAGMA journal_mode;
      SELECT * FROM t1
;UPDATE t1 SET a=111*(a/100); PRAGMA data_version; SELECT * FROM t1
;PRAGMA data_version; SELECT * FROM t1;