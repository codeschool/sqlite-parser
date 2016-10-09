-- original: analyze9.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a TEXT, b TEXT); 
  INSERT INTO t1 VALUES('(0)', '(0)');
  INSERT INTO t1 VALUES('(1)', '(1)');
  INSERT INTO t1 VALUES('(2)', '(2)');
  INSERT INTO t1 VALUES('(3)', '(3)');
  INSERT INTO t1 VALUES('(4)', '(4)');
  CREATE INDEX i1 ON t1(a, b)
;ANALYZE
;SELECT tbl,idx,nEq,nLt,nDLt,test_decode(sample) FROM sqlite_stat4
;SELECT tbl,idx,nEq,nLt,nDLt,s(sample) FROM sqlite_stat4
;CREATE TABLE t1(a, b, c);
  INSERT INTO t1 VALUES('some text', 14, NULL);
  INSERT INTO t1 VALUES(22.0, NULL, x'656667');
  CREATE INDEX i1 ON t1(a, b, c);
  ANALYZE;
  SELECT test_decode(sample) FROM sqlite_stat4
;CREATE TABLE t2(a, b);
  CREATE INDEX i2 ON t2(a, b);
  BEGIN
;INSERT INTO t2 VALUES(sub_a, sub_b)
;SELECT count(*) FROM t2 GROUP BY a
;ANALYZE;
  SELECT lindex(nEq, 0) FROM sqlite_stat4
;DROP TABLE IF EXISTS t1;
  CREATE TABLE t1(a INTEGER PRIMARY KEY, b, c);
  INSERT INTO t1 VALUES(1, 1, 'one-a');
  INSERT INTO t1 VALUES(11, 1, 'one-b');
  INSERT INTO t1 VALUES(21, 1, 'one-c');
  INSERT INTO t1 VALUES(31, 1, 'one-d');
  INSERT INTO t1 VALUES(41, 1, 'one-e');
  INSERT INTO t1 VALUES(51, 1, 'one-f');
  INSERT INTO t1 VALUES(61, 1, 'one-g');
  INSERT INTO t1 VALUES(71, 1, 'one-h');
  INSERT INTO t1 VALUES(81, 1, 'one-i');
  INSERT INTO t1 VALUES(91, 1, 'one-j');
  INSERT INTO t1 SELECT a+1,2,'two' || substr(c,4) FROM t1;
  INSERT INTO t1 SELECT a+2,3,'three'||substr(c,4) FROM t1 WHERE c GLOB 'one-*';
  INSERT INTO t1 SELECT a+3,4,'four'||substr(c,4) FROM t1 WHERE c GLOB 'one-*';
  INSERT INTO t1 SELECT a+4,5,'five'||substr(c,4) FROM t1 WHERE c GLOB 'one-*';
  INSERT INTO t1 SELECT a+5,6,'six'||substr(c,4) FROM t1 WHERE c GLOB 'one-*';	
  CREATE INDEX t1b ON t1(b);
  ANALYZE;
  SELECT c FROM t1 WHERE b=3 AND a BETWEEN 30 AND 60
;DROP TABLE IF EXISTS t1;
  CREATE TABLE t1(a, b, c);
  CREATE INDEX i1 ON t1(c, b, a)
;INSERT INTO t1 VALUES(sub_iVal, sub_iVal, sub_iVal)
;BEGIN
;INSERT INTO t1(c, b, a) VALUES(200, 1, 'a');
    INSERT INTO t1(c, b, a) VALUES(200, 1, 'b');
    INSERT INTO t1(c, b, a) VALUES(200, 1, 'c');

    INSERT INTO t1(c, b, a) VALUES(200, 2, 'e');
    INSERT INTO t1(c, b, a) VALUES(200, 2, 'f');

    INSERT INTO t1(c, b, a) VALUES(201, 3, 'g');
    INSERT INTO t1(c, b, a) VALUES(201, 4, 'h');

    ANALYZE;
    SELECT count(*) FROM sqlite_stat4;
    SELECT count(*) FROM t1
;SELECT 
    neq,
    lrange(nlt, 0, 2),
    lrange(ndlt, 0, 2),
    lrange(test_decode(sample), 0, 2)
    FROM sqlite_stat4
  ORDER BY rowid LIMIT 16
;SELECT 
    neq,
    lrange(nlt, 0, 2),
    lrange(ndlt, 0, 2),
    lrange(test_decode(sample), 0, 1)
    FROM sqlite_stat4
  ORDER BY rowid DESC LIMIT 2
;SELECT count(DISTINCT c) FROM t1 WHERE c<201
;SELECT count(DISTINCT c) FROM t1 WHERE c<200
;SELECT count(*) FROM sqlite_stat4
  WHERE lindex(test_decode(sample), 3) IN 
    ('34', '68', '102', '136', '170', '204', '238', '272')
;BEGIN;
    CREATE TABLE t1(o,t INTEGER PRIMARY KEY);
    CREATE INDEX i1 ON t1(o)
;INSERT INTO t1 VALUES('x', sub_i)
;COMMIT;
    ANALYZE;
    SELECT count(*) FROM sqlite_stat4
;SELECT test_decode(sample) FROM sqlite_stat4
;PRAGMA encoding = 'utf-16';
  CREATE TABLE t0(v);
  ANALYZE
;CREATE TABLE t1(a, b);
  CREATE INDEX i1 ON t1(a);
  CREATE INDEX i2 ON t1(b);
  INSERT INTO t1 VALUES(1, 1);
  INSERT INTO t1 VALUES(2, 2);
  INSERT INTO t1 VALUES(3, 3);
  INSERT INTO t1 VALUES(4, 4);
  INSERT INTO t1 VALUES(5, 5);
  ANALYZE;
  PRAGMA writable_schema = 1;
  CREATE TEMP TABLE x1 AS
    SELECT tbl,idx,neq,nlt,ndlt,sample FROM sqlite_stat4
    ORDER BY (rowid%5), rowid;
  DELETE FROM sqlite_stat4;
  INSERT INTO sqlite_stat4 SELECT * FROM x1;
  PRAGMA writable_schema = 0;
  ANALYZE sqlite_master
;SELECT * FROM t1 WHERE a = 'abc'
;CREATE TABLE t1(a, b);
  CREATE INDEX i1 ON t1(a, b);
  INSERT INTO t1 VALUES(1, 1);
  INSERT INTO t1 VALUES(2, 2);
  INSERT INTO t1 VALUES(3, 3);
  INSERT INTO t1 VALUES(4, 4);
  INSERT INTO t1 VALUES(5, 5);
  ANALYZE;
  UPDATE sqlite_stat4 SET sample = X'' WHERE rowid = 1;
  ANALYZE sqlite_master
;UPDATE sqlite_stat4 SET sample = X'FFFF';
  ANALYZE sqlite_master;
  SELECT * FROM t1 WHERE a = 1
;ANALYZE;
  UPDATE sqlite_stat4 SET neq = '0 0 0';
  ANALYZE sqlite_master;
  SELECT * FROM t1 WHERE a = 1
;ANALYZE;
  UPDATE sqlite_stat4 SET ndlt = '0 0 0';
  ANALYZE sqlite_master;
  SELECT * FROM t1 WHERE a = 3
;ANALYZE;
  UPDATE sqlite_stat4 SET nlt = '0 0 0';
  ANALYZE sqlite_master;
  SELECT * FROM t1 WHERE a = 5
;CREATE TABLE t1(x TEXT);
  CREATE INDEX i1 ON t1(x);
  INSERT INTO t1 VALUES('1');
  INSERT INTO t1 VALUES('2');
  INSERT INTO t1 VALUES('3');
  INSERT INTO t1 VALUES('4');
  ANALYZE
;SELECT * FROM t1 WHERE x = 3
;CREATE TABLE t1(a, b, c, d, e);
  CREATE INDEX i1 ON t1(a, b, c, d);
  CREATE INDEX i2 ON t1(e)
;INSERT INTO t1 VALUES('x', 'y', 'z', 101, sub_i)
;SELECT * FROM t1 WHERE a='x' AND b='y' AND c='z' AND d=101 AND e=5
;SELECT * FROM t1 WHERE a='x' AND b='y' AND c='z' AND d=99 AND e=5
;SELECT * FROM t1 WHERE a='x' AND b='y' AND c='z' AND d=sub_value_d AND e=5
;SELECT * FROM t1 WHERE a='x' AND b='y' AND c='z' AND d=sub_value_d AND e=5
;DROP TABLE IF EXISTS t3;
  CREATE TABLE t3(a, b);
  CREATE INDEX t3a ON t3(a);
  CREATE INDEX t3b ON t3(b)
;INSERT INTO t3 VALUES(sub_a, sub_b)
;SELECT * FROM t3 WHERE a IS NULL AND b = 2
;SELECT * FROM t3 WHERE a IS NOT NULL AND b = 2
;DROP TABLE IF EXISTS t3;
  CREATE TABLE t3(x, a, b);
  CREATE INDEX t3a ON t3(x, a);
  CREATE INDEX t3b ON t3(x, b)
;INSERT INTO t3 VALUES('xyz', sub_a, sub_b)
;SELECT * FROM t3 WHERE x = 'xyz' AND a IS NULL AND b = 2
;SELECT * FROM t3 WHERE x = 'xyz' AND a IS NOT NULL AND b = 2
;INSERT INTO t4 VALUES(sub_a, sub_b)
;INSERT INTO t4 VALUES(X'abcdef', sub_a, sub_b)
;CREATE TABLE t1(a, b, c, d);
    CREATE INDEX i1 ON t1(a);
    CREATE INDEX i2 ON t1(b, c)
;INSERT INTO t1(rowid, a, b, c) VALUES(sub_i, sub_a, sub_i, sub_i)
;SELECT * FROM t1 WHERE a='abc' AND rowid<15 AND b<12
;SELECT * FROM t1 WHERE a='abc' AND rowid<'15' AND b<12
;SELECT * FROM t1 WHERE a='abc' AND rowid<100 AND b<12
;SELECT * FROM t1 WHERE a='abc' AND rowid<'100' AND b<12
;CREATE TABLE t1(a, b INTEGER, c)
;INSERT INTO t1 VALUES('ott', sub_i, sub_c)
;CREATE INDEX i1 ON t1(a, b);
    CREATE INDEX i2 ON t1(c);
    ANALYZE
;SELECT * FROM t1 WHERE a='ott' AND b<10 AND c=1
;SELECT * FROM t1 WHERE a='ott' AND b<'10' AND c=1
;SELECT a, b, c, d FROM t1
;SELECT test_decode(sample) AS s FROM sqlite_stat4 WHERE idx='i1'
;CREATE TABLE t1(a,b,c,d);
    CREATE INDEX i1 ON t1(a,b,c,d)
;INSERT INTO t1 VALUES(sub_i,sub_i,sub_i,sub_i)
;INSERT INTO t1 VALUES(sub_i,sub_i,sub_i,sub_i)
;DELETE FROM t1
;INSERT INTO t1 VALUES(sub_i/10,sub_i/17,sub_i/27,sub_i/37)
;INSERT INTO t1 VALUES(sub_i*50,sub_i*50,sub_i*50,sub_i*50)
;INSERT INTO t1 VALUES(sub_i*50,sub_i*50,sub_i*50,sub_i*50)
;INSERT INTO t1 VALUES(sub_i*50,sub_i*50,sub_i*50,sub_i*50)
;INSERT INTO t1 VALUES(sub_i*50,sub_i*50,sub_i*50,sub_i*50)
;INSERT INTO t1 VALUES(sub_i*50,sub_i*50,sub_i*50,sub_i*50)
;INSERT INTO t1 VALUES(sub_i*50,sub_i*50,sub_i*50,sub_i*50)
;INSERT INTO t1 VALUES(sub_i*50,sub_i*50,sub_i*50,sub_i*50)
;INSERT INTO t1 VALUES(sub_i*50,sub_i*50,sub_i*50,sub_i*50)
;INSERT INTO t1 VALUES(sub_i*50,sub_i*50,sub_i*50,sub_i*50)
;INSERT INTO t1 VALUES(sub_i*50,sub_i*50,sub_i*50,sub_i*50)
;DELETE FROM t1
;INSERT INTO t1 VALUES(sub_i/10,sub_b,sub_i,sub_i)
;SELECT lrange(test_decode(sample), 0, 1) AS s FROM sqlite_stat4
  WHERE lindex(s, 1)=='1' ORDER BY rowid
;CREATE TABLE x1(a, b, UNIQUE(a, b));
  INSERT INTO x1 VALUES(1, 2);
  INSERT INTO x1 VALUES(3, 4);
  INSERT INTO x1 VALUES(5, 6);
  ANALYZE;
  INSERT INTO sqlite_stat4 VALUES(NULL, NULL, NULL, NULL, NULL, NULL)
;SELECT * FROM x1
;INSERT INTO sqlite_stat4 VALUES(42, 42, 42, 42, 42, 42)
;SELECT * FROM x1
;UPDATE sqlite_stat1 SET stat = NULL
;SELECT * FROM x1
;ANALYZE;
  UPDATE sqlite_stat1 SET tbl = 'no such tbl'
;SELECT * FROM x1
;ANALYZE;
  UPDATE sqlite_stat4 SET neq = NULL, nlt=NULL, ndlt=NULL
;SELECT * FROM x1
;ANALYZE;
  UPDATE sqlite_stat1 SET stat = stat || ' unordered'
;SELECT * FROM x1
;CREATE TABLE t1(a, UNIQUE(a));
    INSERT INTO t1 VALUES(sub_one);
    ANALYZE
;CREATE TABLE t1(a, UNIQUE(a));
    INSERT INTO t1 VALUES(sub_two);
    ANALYZE
;CREATE TABLE t1(a, b, c, d);
    CREATE INDEX i1 ON t1(a, b) WHERE d IS NOT NULL;
    INSERT INTO t1 VALUES(-1, -1, -1, NULL);
    INSERT INTO t1 SELECT 2*a,2*b,2*c,d FROM t1;
    INSERT INTO t1 SELECT 2*a,2*b,2*c,d FROM t1;
    INSERT INTO t1 SELECT 2*a,2*b,2*c,d FROM t1;
    INSERT INTO t1 SELECT 2*a,2*b,2*c,d FROM t1;
    INSERT INTO t1 SELECT 2*a,2*b,2*c,d FROM t1;
    INSERT INTO t1 SELECT 2*a,2*b,2*c,d FROM t1
;INSERT INTO t1 VALUES(sub_i%2, sub_b, sub_i/2, 'abc')
;ANALYZE main.t1
;SELECT * FROM t1 WHERE d IS NOT NULL AND a=0 AND b=10 AND c=10
;SELECT * FROM t1 WHERE d IS NOT NULL AND a=0 AND b=0 AND c=10
;CREATE INDEX i2 ON t1(c, d);
  ANALYZE main.i2;