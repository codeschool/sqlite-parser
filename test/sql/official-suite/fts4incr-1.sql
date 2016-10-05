-- original: fts4incr.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts4(words)
;SELECT min(docid), max(docid) FROM t1
;INSERT INTO t1(t1) VALUES('test-no-incr-doclist=sub_s')
;INSERT INTO t2(docid, content) VALUES(sub_i, sub_x)
;INSERT INTO t2(t2) VALUES('optimize')
;SELECT count(*) FROM t2 WHERE t2 MATCH '"never zero"'
;SELECT count(*) FROM t2 WHERE t2 MATCH '"two zero"';