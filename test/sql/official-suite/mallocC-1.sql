-- original: mallocC.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

ROLLBACK
;PRAGMA auto_vacuum=1;
  CREATE TABLE t0(a, b, c);