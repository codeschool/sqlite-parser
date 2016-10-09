-- original: e_uri.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a, b) ; INSERT INTO t1 VALUES('a', 'b') 
;CREATE TABLE t1(x);
    INSERT INTO t1 VALUES('ok')
;BEGIN;
      INSERT INTO t1 VALUES('ko');