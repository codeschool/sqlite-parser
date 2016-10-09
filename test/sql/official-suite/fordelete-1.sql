-- original: fordelete.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT name, rootpage FROM sqlite_master
;CREATE TABLE t1(a PRIMARY KEY, b)
;CREATE TABLE t2(a, b, c);
  CREATE INDEX t2a ON t2(a);
  CREATE INDEX t2b ON t2(b);
  CREATE INDEX t2c ON t2(c)
;CREATE TABLE x1(a INTEGER PRIMARY KEY, b, c, d);
  CREATE TABLE x2(a INTEGER PRIMARY KEY, b, c, d)
;BEGIN IMMEDIATE
;COMMIT
;SELECT * FROM x1
;BEGIN IMMEDIATE
;COMMIT
;SELECT * FROM x2;