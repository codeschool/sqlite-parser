-- original: tkt3791.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x, y DEFAULT(datetime('now')));
    INSERT INTO t1(x) VALUES(1);
    SELECT x, length(y) FROM t1;