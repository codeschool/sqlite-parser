-- original: fts3corrupt2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t2 USING FTS3(a, b)
;INSERT INTO t2(t2) VALUES('nodesize=32')
;INSERT INTO t2 VALUES(sub_d, sub_d)
;SELECT count(*) FROM t2_segments
;SELECT rowid, length(block), block FROM t2_segments
;UPDATE t2_segments SET block = sub_b2 WHERE rowid = sub_rowid
;UPDATE t2_segments SET block = sub_blob WHERE rowid = sub_rowid
;SELECT rowid, length(root), root FROM t2_segdir
;UPDATE t2_segdir SET root = sub_b2 WHERE rowid = sub_rowid
;UPDATE t2_segdir SET root = sub_blob WHERE rowid = sub_rowid;