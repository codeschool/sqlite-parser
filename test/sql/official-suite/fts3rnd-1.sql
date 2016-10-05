-- original: fts3rnd.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

INSERT INTO t1(docid, a, b, c) VALUES(sub_rowid, sub_a, sub_b, sub_c)
;DELETE FROM t1 WHERE rowid = sub_rowid
;UPDATE t1 SET [lindex sub_cols sub_iCol] = sub_doc WHERE rowid = sub_rowid
;INSERT INTO t1(t1) VALUES('nodesize=sub_nodesize');