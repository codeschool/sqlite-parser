-- original: fts3expr.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts3(a, b, c)
;CREATE VIRTUAL TABLE t1 USING fts3(a)
;INSERT INTO t1 VALUES(sub_v)
;SELECT rowid FROM t1 WHERE t1 MATCH 'five four one' ORDER BY rowid
;SELECT rowid FROM t1 WHERE t1 MATCH sub_expr ORDER BY rowid
;SELECT rowid FROM t1 WHERE t1 MATCH sub_expr ORDER BY rowid
;CREATE VIRTUAL TABLE test USING fts3 (keyword);
    INSERT INTO test VALUES ('abc');
    SELECT * FROM test WHERE keyword MATCH '""';