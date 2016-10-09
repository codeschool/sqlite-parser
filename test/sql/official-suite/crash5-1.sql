-- original: crash5.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

pragma auto_vacuum = 1;
      CREATE TABLE t1(a, b, c);
      INSERT INTO t1 VALUES('1111111111', '2222222222', sub_c)
;CREATE UNIQUE INDEX i1 ON t1(a)
;pragma integrity_check
;SELECT * FROM t1;