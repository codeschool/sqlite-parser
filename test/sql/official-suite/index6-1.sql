-- original: index6.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b,c);
    CREATE INDEX t1a ON t1(a) WHERE a IS NOT NULL;
    CREATE INDEX t1b ON t1(b) WHERE b>10;
    CREATE VIRTUAL TABLE nums USING wholenumber;
    INSERT INTO t1(a,b,c)
       SELECT CASE WHEN value%3!=0 THEN value END, value, value
         FROM nums WHERE value<=20;
    SELECT count(a), count(b) FROM t1;
    PRAGMA integrity_check
;SELECT count(*) FROM t1
;ANALYZE;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx;
    PRAGMA integrity_check
;UPDATE t1 SET a=b;
    ANALYZE;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx;
    PRAGMA integrity_check
;UPDATE t1 SET a=NULL WHERE b%3!=0;
    UPDATE t1 SET b=b+100;
    ANALYZE;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx;
    PRAGMA integrity_check
;UPDATE t1 SET a=CASE WHEN b%3!=0 THEN b END;
    UPDATE t1 SET b=b-100;
    ANALYZE;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx;
    PRAGMA integrity_check
;DELETE FROM t1 WHERE b BETWEEN 8 AND 12;
    ANALYZE;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx;
    PRAGMA integrity_check
;REINDEX;
    ANALYZE;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx;
    PRAGMA integrity_check
;CREATE INDEX t1c ON t1(c);
    ANALYZE;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx;
    PRAGMA integrity_check
;CREATE TABLE t2(a,b);
    INSERT INTO t2(a,b) SELECT value, value FROM nums WHERE value<1000;
    UPDATE t2 SET a=NULL WHERE b%2==0;
    CREATE INDEX t2a1 ON t2(a) WHERE a IS NOT NULL;
    SELECT count(*) FROM t2 WHERE a IS NOT NULL
;EXPLAIN QUERY PLAN
    SELECT * FROM t2 WHERE a=5
;EXPLAIN QUERY PLAN
      SELECT * FROM t2 WHERE a IS NOT NULL
;EXPLAIN QUERY PLAN
      SELECT * FROM t2 WHERE a IS NOT NULL AND a>0
;EXPLAIN QUERY PLAN
    SELECT * FROM t2 WHERE a IS NULL
;DROP INDEX t2a1;
  UPDATE t2 SET a=b, b=b+10000;
  SELECT b FROM t2 WHERE a=15
;CREATE INDEX t2a2 ON t2(a) WHERE a<100 OR a>200;
  SELECT b FROM t2 WHERE a=15;
  PRAGMA integrity_check
;EXPLAIN QUERY PLAN
  SELECT b FROM t2 WHERE a=15
;SELECT b FROM t2 WHERE a=15 AND a<100
;EXPLAIN QUERY PLAN
  SELECT b FROM t2 WHERE a=15 AND a<100
;SELECT b FROM t2 WHERE a=515 AND a>200
;EXPLAIN QUERY PLAN
  SELECT b FROM t2 WHERE a=515 AND a>200
;CREATE TABLE t3(a,b);
  INSERT INTO t3 SELECT value, value FROM nums WHERE value<200;
  UPDATE t3 SET a=999 WHERE b%5!=0;
  CREATE UNIQUE INDEX t3a ON t3(a) WHERE a<>999
;SELECT count(*) FROM t3 WHERE a=999
;VACUUM;
  PRAGMA integrity_check
;CREATE INDEX t3b ON t3(b) WHERE xyzzy.t3.b BETWEEN 5 AND 10;
                               /* ^^^^^-- ignored */
  ANALYZE;
  SELECT count(*) FROM t3 WHERE t3.b BETWEEN 5 AND 10;
  SELECT stat+0 FROM sqlite_stat1 WHERE idx='t3b'
;CREATE TABLE t6(a,b);
  CREATE UNIQUE INDEX t6ab ON t1(a,b);
  CREATE INDEX t6b ON t6(b) WHERE b=1;
  INSERT INTO t6(a,b) VALUES(123,456);
  SELECT * FROM t6
;UPDATE OR REPLACE t6 SET b=789;
  SELECT * FROM t6
;PRAGMA integrity_check
;CREATE TABLE t7a(x);
  CREATE TABLE t7b(y);
  INSERT INTO t7a(x) VALUES(1);
  CREATE INDEX t7ax ON t7a(x) WHERE x=99;
  PRAGMA automatic_index=OFF;
  SELECT * FROM t7a LEFT JOIN t7b ON (x=99) ORDER BY x
;INSERT INTO t7b(y) VALUES(2);
  SELECT * FROM t7a JOIN t7b ON (x=99) ORDER BY x
;INSERT INTO t7a(x) VALUES(99);
  SELECT * FROM t7a LEFT JOIN t7b ON (x=99) ORDER BY x
;SELECT * FROM t7a JOIN t7b ON (x=99) ORDER BY x
;EXPLAIN QUERY PLAN
  SELECT * FROM t7a JOIN t7b ON (x=99) ORDER BY x
;CREATE TABLE t8a(a,b);
  CREATE TABLE t8b(x,y);
  CREATE INDEX i8c ON t8b(y) WHERE x = 'value';

  INSERT INTO t8a VALUES(1, 'one');
  INSERT INTO t8a VALUES(2, 'two');
  INSERT INTO t8a VALUES(3, 'three');

  INSERT INTO t8b VALUES('value', 1);
  INSERT INTO t8b VALUES('dummy', 2);
  INSERT INTO t8b VALUES('value', 3);
  INSERT INTO t8b VALUES('dummy', 4)
;SELECT * FROM t8a LEFT JOIN t8b ON (x = 'value' AND y = a)
;SELECT * FROM t8a LEFT JOIN t8b ON (x = 'value' AND y = a)
;CREATE TABLE t9(a int, b int, c int);
  CREATE INDEX t9ca ON t9(c,a) WHERE a in (10,12,20);
  INSERT INTO t9 VALUES(1,1,9),(10,2,35),(11,15,82),(20,19,5),(NULL,7,3);
  UPDATE t9 SET b=c WHERE a in (10,12,20);
  SELECT a,b,c,'|' FROM t9 ORDER BY a
;DROP TABLE t9;
  CREATE TABLE t9(a int, b int, c int, PRIMARY KEY(a)) WITHOUT ROWID;
  CREATE INDEX t9ca ON t9(c,a) WHERE a in (10,12,20);
  INSERT INTO t9 VALUES(1,1,9),(10,2,35),(11,15,82),(20,19,5);
  UPDATE t9 SET b=c WHERE a in (10,12,20);
  SELECT a,b,c,'|' FROM t9 ORDER BY a
;CREATE TABLE t10(a,b,c,d,e INTEGER PRIMARY KEY);
  INSERT INTO t10 VALUES
    (1,2,3,4,5),
    (2,3,4,5,6),
    (3,4,5,6,7),
    (1,2,3,8,9);
  CREATE INDEX t10x ON t10(d) WHERE a=1 AND b=2 AND c=3;
  SELECT e FROM t10 WHERE a=1 AND b=2 AND c=3 ORDER BY d
;EXPLAIN QUERY PLAN
  SELECT e FROM t10 WHERE a=1 AND b=2 AND c=3 ORDER BY d
;SELECT e FROM t10 WHERE c=3 AND 2=b AND a=1 ORDER BY d DESC
;EXPLAIN QUERY PLAN
  SELECT e FROM t10 WHERE c=3 AND 2=b AND a=1 ORDER BY d DESC
;SELECT e FROM t10 WHERE a=1 AND b=2 ORDER BY d DESC
;EXPLAIN QUERY PLAN
  SELECT e FROM t10 WHERE a=1 AND b=2 ORDER BY d DESC;