-- original: orderby8.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x);
    INSERT INTO t1(x) VALUES(1),(5),(9),(7),(3),(2),(4),(6),(8)
;SELECT sub_result_set FROM t1 ORDER BY x LIMIT -1;