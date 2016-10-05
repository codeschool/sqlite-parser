-- original: keyword1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b);
  INSERT INTO t1 VALUES(1, 'one');
  INSERT INTO t1 VALUES(2, 'two');
  INSERT INTO t1 VALUES(3, 'three')
;CREATE TABLE "sub_kw"(sub_kw sub_kw)
;CREATE TABLE sub_kw(sub_kw sub_kw)
;INSERT INTO sub_kw VALUES(99)
;INSERT INTO sub_kw SELECT a FROM t1
;SELECT * FROM sub_kw ORDER BY sub_kw ASC
;SELECT * FROM sub_kw ORDER BY "sub_kw" ASC
;DROP TABLE "sub_kw"
;CREATE INDEX "sub_kw" ON t1(a)
;DROP TABLE sub_kw
;CREATE INDEX sub_kw ON t1(a)
;SELECT b FROM t1 INDEXED BY sub_kw WHERE a=2;