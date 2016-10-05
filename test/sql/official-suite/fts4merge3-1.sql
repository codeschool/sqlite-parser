-- original: fts4merge3.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size = 512
;SELECT docid FROM t2 WHERE t2 MATCH 'abc'
;SELECT docid FROM t2 WHERE t2 MATCH 'abc'
;SELECT level, count(*) FROM t2_segdir GROUP BY level ORDER BY 1
;INSERT INTO t2(t2) VALUES('merge=2,2')
;SELECT docid FROM t2 WHERE t2 MATCH 'abc'
;SELECT level, count(*) FROM t2_segdir GROUP BY level ORDER BY 1
;INSERT INTO t2 SELECT content FROM t2 WHERE docid = sub_i
;SELECT level, count(*) FROM t2_segdir GROUP BY level ORDER BY 1
;INSERT INTO t2(t2) VALUES('merge=2000,2')
;SELECT docid FROM t2 WHERE t2 MATCH 'abc'
;INSERT INTO t2 SELECT content FROM t2 WHERE docid = sub_i
;SELECT docid FROM t2 WHERE t2 MATCH 'abc'
;INSERT INTO t2(t2) VALUES('optimize')
;SELECT docid FROM t2 WHERE t2 MATCH 'abc'
;SELECT level, count(*) FROM t2_segdir GROUP BY level ORDER BY 1;