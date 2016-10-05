-- original: indexexpr1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a,b,c);
  INSERT INTO t1(a,b,c)
      /*  123456789 123456789 123456789 123456789 123456789 123456789 */ 
  VALUES('In_the_beginning_was_the_Word',1,1),
        ('and_the_Word_was_with_God',1,2),
        ('and_the_Word_was_God',1,3),
        ('The_same_was_in_the_beginning_with_God',2,1),
        ('All_things_were_made_by_him',3,1),
        ('and_without_him_was_not_any_thing_made_that_was_made',3,2);
  CREATE INDEX t1a1 ON t1(substr(a,1,12))
;SELECT b, c, '|' FROM t1 WHERE substr(a,1,12)=='and_the_Word' ORDER BY b, c
;EXPLAIN QUERY PLAN
  SELECT b, c, '|' FROM t1 WHERE substr(a,1,12)=='and_the_Word' ORDER BY b, c
;SELECT b, c, '|' FROM t1 WHERE 'and_the_Word'==substr(a,1,12) ORDER BY b, c
;EXPLAIN QUERY PLAN
  SELECT b, c, '|' FROM t1 WHERE 'and_the_Word'==substr(a,1,12) ORDER BY b, c
;CREATE INDEX t1ba ON t1(b,substr(a,2,3),c);
  SELECT c FROM t1 WHERE b=1 AND substr(a,2,3)='nd_' ORDER BY c
;EXPLAIN QUERY PLAN
  SELECT c FROM t1 WHERE b=1 AND substr(a,2,3)='nd_' ORDER BY c
;SELECT rowid, substr(a,b,3), '|' FROM t1 ORDER BY 2
;CREATE INDEX t1abx ON t1(substr(a,b,3));
  SELECT rowid FROM t1 WHERE substr(a,b,3)<='and' ORDER BY +rowid
;EXPLAIN QUERY PLAN
  SELECT rowid FROM t1 WHERE substr(a,b,3)<='and' ORDER BY +rowid
;SELECT rowid FROM t1 WHERE +substr(a,b,3)<='and' ORDER BY +rowid
;SELECT rowid FROM t1 WHERE substr(a,b,3) IN ('and','l_t','xyz')
   ORDER BY +rowid
;EXPLAIN QUERY PLAN
  SELECT rowid FROM t1 WHERE substr(a,b,3) IN ('and','l_t','xyz')
   ORDER BY +rowid
;ALTER TABLE t1 ADD COLUMN d;
  UPDATE t1 SET d=length(a);
  CREATE INDEX t1a2 ON t1(SUBSTR(a, 27, 3)) WHERE d>=29;
  SELECT rowid, b, c FROM t1
   WHERE substr(a,27,3)=='ord' AND d>=29
;EXPLAIN QUERY PLAN
  SELECT rowid, b, c FROM t1
   WHERE substr(a,27,3)=='ord' AND d>=29
;CREATE INDEX t1alen ON t1(length(a));
  SELECT length(a) FROM t1 ORDER BY length(a)
;EXPLAIN QUERY PLAN
  SELECT length(a) FROM t1 ORDER BY length(a)
;SELECT length(a) FROM t1 ORDER BY length(a) DESC
;EXPLAIN QUERY PLAN
  SELECT length(a) FROM t1 ORDER BY length(a) DESC
;DROP TABLE t1;
  CREATE TABLE t1(id ANY PRIMARY KEY, a,b,c) WITHOUT ROWID;
  INSERT INTO t1(id,a,b,c)
  VALUES(1,'In_the_beginning_was_the_Word',1,1),
        (2,'and_the_Word_was_with_God',1,2),
        (3,'and_the_Word_was_God',1,3),
        (4,'The_same_was_in_the_beginning_with_God',2,1),
        (5,'All_things_were_made_by_him',3,1),
        (6,'and_without_him_was_not_any_thing_made_that_was_made',3,2);
  CREATE INDEX t1a1 ON t1(substr(a,1,12))
;SELECT b, c, '|' FROM t1 WHERE substr(a,1,12)=='and_the_Word' ORDER BY b, c
;EXPLAIN QUERY PLAN
  SELECT b, c, '|' FROM t1 WHERE substr(a,1,12)=='and_the_Word' ORDER BY b, c
;SELECT b, c, '|' FROM t1 WHERE 'and_the_Word'==substr(a,1,12) ORDER BY b, c
;EXPLAIN QUERY PLAN
  SELECT b, c, '|' FROM t1 WHERE 'and_the_Word'==substr(a,1,12) ORDER BY b, c
;CREATE INDEX t1ba ON t1(b,substr(a,2,3),c);
  SELECT c FROM t1 WHERE b=1 AND substr(a,2,3)='nd_' ORDER BY c
;EXPLAIN QUERY PLAN
  SELECT c FROM t1 WHERE b=1 AND substr(a,2,3)='nd_' ORDER BY c
;SELECT id, substr(a,b,3), '|' FROM t1 ORDER BY 2
;CREATE INDEX t1abx ON t1(substr(a,b,3));
  SELECT id FROM t1 WHERE substr(a,b,3)<='and' ORDER BY +id
;EXPLAIN QUERY PLAN
  SELECT id FROM t1 WHERE substr(a,b,3)<='and' ORDER BY +id
;SELECT id FROM t1 WHERE +substr(a,b,3)<='and' ORDER BY +id
;SELECT id FROM t1 WHERE substr(a,b,3) IN ('and','l_t','xyz')
   ORDER BY +id
;EXPLAIN QUERY PLAN
  SELECT id FROM t1 WHERE substr(a,b,3) IN ('and','l_t','xyz')
   ORDER BY +id
;ALTER TABLE t1 ADD COLUMN d;
  UPDATE t1 SET d=length(a);
  CREATE INDEX t1a2 ON t1(SUBSTR(a, 27, 3)) WHERE d>=29;
  SELECT id, b, c FROM t1
   WHERE substr(a,27,3)=='ord' AND d>=29
;EXPLAIN QUERY PLAN
  SELECT id, b, c FROM t1
   WHERE substr(a,27,3)=='ord' AND d>=29
;CREATE TABLE t3(a,b,c);
  WITH RECURSIVE c(x) AS (VALUES(1) UNION SELECT x+1 FROM c WHERE x<30)
  INSERT INTO t3(a,b,c)
    SELECT x, printf('ab%04xyz',x), random() FROM c;
  CREATE UNIQUE INDEX t3abc ON t3(CAST(a AS text), b, substr(c,1,3));
  SELECT a FROM t3 WHERE CAST(a AS text)<='10' ORDER BY +a;
  PRAGMA integrity_check
;CREATE TABLE t5(a);
  CREATE TABLE cnt(x);
  WITH RECURSIVE
    c(x) AS (VALUES(1) UNION ALL SELECT x+1 FROM c WHERE x<5)
  INSERT INTO cnt(x) SELECT x FROM c;
  INSERT INTO t5(a) SELECT printf('abc%03dxyz',x) FROM cnt;
  CREATE INDEX t5ax ON t5( substr(a,4,3) )
;-- The use of the "k" alias in the WHERE clause is technically
  -- illegal, but SQLite allows it for historical reasons.  In this
  -- test and the next, verify that "k" can be used by the t5ax index
  SELECT substr(a,4,3) AS k FROM cnt, t5 WHERE k=printf('%03d',x)
;EXPLAIN QUERY PLAN
  SELECT substr(a,4,3) AS k FROM cnt, t5 WHERE k=printf('%03d',x)
;DROP TABLE IF EXISTS t4;
  CREATE TABLE t4(a,b,c,d,e,f,g,h,i);
  CREATE INDEX t4all ON t4(a,b,c<d,e,f,i,h);
  INSERT INTO t4 VALUES(1,2,3,4,5,6,7,8,9);
  ANALYZE;
  DELETE FROM sqlite_stat1;
  INSERT INTO sqlite_stat1
    VALUES('t4','t4all','600000 160000 40000 10000 2000 600 100 40 10');
  ANALYZE sqlite_master;
  SELECT i FROM t4 WHERE e=5
;DROP TABLE IF EXISTS t7;
  CREATE TABLE t7(a,b,c);
  INSERT INTO t7(a,b,c) VALUES(1,2,2),('abc','def','def'),(4,5,6);
  CREATE INDEX t7b ON t7(+b);
  CREATE INDEX t7c ON t7(+c);
  SELECT *, '|' FROM t7 WHERE +b=+c ORDER BY +a
;CREATE TABLE t71(a,b,c);
  CREATE INDEX t71bc ON t71(b+c);
  CREATE TABLE t72(x,y,z);
  CREATE INDEX t72yz ON t72(y+z);
  INSERT INTO t71(a,b,c) VALUES(1,11,2),(2,7,15),(3,5,4);
  INSERT INTO t72(x,y,z) VALUES(1,10,3),(2,8,14),(3,9,9);
  SELECT a, x, '|' FROM t71, t72
   WHERE b+c=y+z
  ORDER BY +a, +x
;DROP TABLE IF EXISTS t8;
  CREATE TABLE t8(a INTEGER PRIMARY KEY, b TEXT);
  CREATE UNIQUE INDEX t8bx ON t8(substr(b,2,4) COLLATE nocase);
  INSERT INTO t8(a,b) VALUES(1,'Alice'),(2,'Bartholemew'),(3,'Cynthia');
  SELECT * FROM t8 WHERE substr(b,2,4)='ARTH' COLLATE nocase
;CREATE TABLE t9(a,b,c,d);
  CREATE UNIQUE INDEX t9x1 ON t9(c,abs(d),b);
  INSERT INTO t9(rowid,a,b,c,d) VALUES(1,2,3,4,5);
  INSERT INTO t9(rowid,a,b,c,d) VALUES(2,NULL,NULL,NULL,NULL);
  INSERT INTO t9(rowid,a,b,c,d) VALUES(3,NULL,NULL,NULL,NULL);
  INSERT INTO t9(rowid,a,b,c,d) VALUES(4,5,6,7,8);
  PRAGMA integrity_check
;DROP TABLE IF EXISTS t0;
  CREATE TABLE t0(a,b,t);
  CREATE INDEX i ON t0(a in(0,1));
  INSERT INTO t0 VALUES(0,1,2),(2,3,4),(5,6,7);
  UPDATE t0 SET b=99 WHERE (a in(0,1))=0;
  SELECT *, '|' FROM t0 ORDER BY +a
;UPDATE t0 SET b=88 WHERE (a in(0,1))=1;
  SELECT *, '|' FROM t0 ORDER BY +a;