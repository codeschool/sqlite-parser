-- original: tkt-4a03edc4c8.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(
      a INTEGER PRIMARY KEY ON CONFLICT REPLACE,
      b UNIQUE ON CONFLICT FAIL
    );
    INSERT INTO t1 VALUES(1, 1);
    INSERT INTO t1 VALUES(2, 2)
;PRAGMA integrity_check
;SELECT * FROM t1 ORDER BY a;