-- original: tkt-fa7bf5ec.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x);
    INSERT INTO t1 VALUES ('a');
    INSERT INTO t1 VALUES ('A');
    INSERT INTO t1 VALUES ('A');
    SELECT count(CASE WHEN x='a' THEN 1 END),
           count(CASE WHEN x='A' THEN 1 END)
      FROM t1;