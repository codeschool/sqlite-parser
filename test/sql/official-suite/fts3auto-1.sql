-- original: fts3auto.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

INSERT INTO sub_tbl (sub_name) VALUES(sub_doc)
;INSERT INTO sub_tbl (sub_name) VALUES('aaaaaaa sub_tokenaaaaa')
;PRAGMA table_info(sub_tbl)
;SELECT docid, * FROM sub_tbl
;CREATE VIRTUAL TABLE t1 USING sub_create
;INSERT INTO t1 VALUES(sub_doc, null)
;CREATE VIRTUAL TABLE t1 USING sub_create
;INSERT INTO t1(t1) VALUES('optimize')
;INSERT INTO t1(a, b) VALUES(sub_a, sub_b)
;INSERT INTO t1 VALUES(sub_a, sub_b, sub_c, sub_d)
;INSERT INTO t1 VALUES(sub_x);