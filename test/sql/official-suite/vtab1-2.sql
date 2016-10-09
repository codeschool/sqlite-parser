-- original: vtab1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT rowid, * FROM echo_c WHERE +rowid IN (1,2,3)
;SELECT rowid, * FROM echo_c WHERE rowid IN (1,2,3)
;SELECT rowid, * FROM echo_c WHERE +rowid IN (0,1,5,2,'a',3,NULL)
;SELECT rowid, * FROM echo_c WHERE rowid IN (0,1,5,'a',2,3,NULL)
;SELECT rowid, * FROM echo_c WHERE rowid NOT IN (0,1,5,'a',2,3)
;SELECT rowid, * FROM echo_c WHERE rowid NOT IN (0,5,'a',2,3)
;SELECT rowid, * FROM echo_c WHERE +rowid NOT IN (0,5,'a',2,3,NULL)
;SELECT rowid, * FROM echo_c WHERE rowid NOT IN (0,5,'a',2,3,NULL)
;SELECT * FROM echo_c WHERE +a IN (1,3,8,'x',NULL,15,24)
;SELECT * FROM echo_c WHERE a IN (1,3,8,'x',NULL,15,24)
;SELECT * FROM echo_c WHERE a NOT IN (1,8,'x',15,24)
;SELECT * FROM echo_c WHERE a NOT IN (1,8,'x',NULL,15,24)
;SELECT * FROM echo_c WHERE +a NOT IN (1,8,'x',NULL,15,24)
;SELECT * FROM echo_c WHERE rowid = 1
;SELECT * FROM echo_c WHERE a = 1
;CREATE TABLE t1(a, b, c);
    CREATE VIRTUAL TABLE echo_t1 USING echo(t1)
;INSERT INTO echo_t1(rowid) VALUES(45);
    SELECT rowid, * FROM echo_t1
;INSERT INTO echo_t1(rowid) VALUES(NULL);
    SELECT rowid, * FROM echo_t1
;CREATE TABLE t2(a PRIMARY KEY, b, c);
    INSERT INTO t2 VALUES(1, 2, 3);
    INSERT INTO t2 VALUES(4, 5, 6);
    CREATE VIRTUAL TABLE echo_t2 USING echo(t2)
;PRAGMA writable_schema = 1;
    INSERT INTO sqlite_master VALUES(
      'table', 't3', 't3', 0, 'INSERT INTO "%s%s" VALUES(1)'
    )
;CREATE TABLE t5(a, b);
    CREATE VIRTUAL TABLE e5 USING echo_v2(t5);
    BEGIN;
      INSERT INTO e5 VALUES(1, 2);
      DROP TABLE e5;
      SAVEPOINT one;
      ROLLBACK TO one;
    COMMIT
;DELETE FROM sqlite_master WHERE sql LIKE 'insert%'
;CREATE TABLE t6(a, b TEXT);
  CREATE INDEX i6 ON t6(b, a);
  INSERT INTO t6 VALUES(1, 'Peter');
  INSERT INTO t6 VALUES(2, 'Andrew');
  INSERT INTO t6 VALUES(3, 'James');
  INSERT INTO t6 VALUES(4, 'John');
  INSERT INTO t6 VALUES(5, 'Phillip');
  INSERT INTO t6 VALUES(6, 'Bartholomew');
  CREATE VIRTUAL TABLE e6 USING echo(t6)
;PRAGMA case_sensitive_like = ON
;PRAGMA case_sensitive_like = OFF
;CREATE TABLE t7 (a, b);
  CREATE TABLE t8 (c, d);
  CREATE INDEX i2 ON t7(a);
  CREATE INDEX i3 ON t7(b);
  CREATE INDEX i4 ON t8(c);
  CREATE INDEX i5 ON t8(d);

  CREATE VIRTUAL TABLE t7v USING echo(t7);
  CREATE VIRTUAL TABLE t8v USING echo(t8)
;INSERT INTO t7 VALUES(sub_i, sub_i)
;INSERT INTO t8 VALUES(sub_i, sub_i)
;SELECT a, b FROM (
      SELECT a, b FROM t7 WHERE a=11 OR b=12
      UNION ALL
      SELECT c, d FROM t8 WHERE c=5 OR d=6
  )
  ORDER BY 1, 2
;SELECT a, b FROM (
      SELECT a, b FROM t7v WHERE a=11 OR b=12
      UNION ALL
      SELECT c, d FROM t8v WHERE c=5 OR d=6
  )
  ORDER BY 1, 2
;CREATE TABLE t9(a,b,c);
  CREATE VIRTUAL TABLE t9v USING echo(t9);

  INSERT INTO t9 VALUES(1,2,3);
  INSERT INTO t9 VALUES(3,2,1);
  INSERT INTO t9 VALUES(2,2,2)
;SELECT * FROM t9v WHERE a<b
;SELECT * FROM t9v WHERE a=b
;ATTACH 'test.db2' AS sub_nm
;SELECT * FROM sqlite_master
;CREATE VIRTUAL TABLE sub_nm.t1 USING fts4
;CREATE VIRTUAL TABLE t1 USING wholenumber
;SELECT value FROM t1 WHERE value<10
;CREATE TABLE t2(value);
    INSERT INTO t2 VALUES(1), (2), (3)
;CREATE VIRTUAL TABLE t1e USING echo(t2)
;INSERT INTO t1e SELECT 4
;SELECT * FROM t1e
;CREATE VIRTUAL TABLE t4 USING fts3();
    SAVEPOINT a;
    INSERT INTO t4 VALUES('a b c');
    ROLLBACK TO a;
    RELEASE a;
    SELECT * FROM t4
;SELECT * FROM t4 WHERE t4 MATCH 'b'
;INSERT INTO t4(t4) VALUES('integrity-check')
;SAVEPOINT a;
    CREATE VIRTUAL TABLE t5 USING fts3();
    SAVEPOINT b;
    ROLLBACK TO a;
    SAVEPOINT c;
    RELEASE a;