-- original: fts4docid.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts4
;INSERT INTO t1(docid, content) VALUES(sub_docid, sub_content)
;SELECT docid FROM t1 WHERE docid = 5
;SELECT docid FROM t1 WHERE docid = '5'
;SELECT docid FROM t1 WHERE docid = +5
;SELECT docid FROM t1 WHERE docid = +'5'
;SELECT docid FROM t1 WHERE docid < 5
;SELECT docid FROM t1 WHERE docid < '5'
;SELECT rowid FROM t1 WHERE rowid = 5
;SELECT rowid FROM t1 WHERE rowid = '5'
;SELECT rowid FROM t1 WHERE rowid = +5
;SELECT rowid FROM t1 WHERE rowid = +'5'
;SELECT rowid FROM t1 WHERE rowid < 5
;SELECT rowid FROM t1 WHERE rowid < '5';