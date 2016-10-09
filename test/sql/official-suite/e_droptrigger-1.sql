-- original: e_droptrigger.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT 'sub_name.' || name FROM sub_tbl WHERE type = 'trigger'
;INSERT INTO sub_tbl VALUES('1', '2')
;INSERT INTO sub_tbl VALUES('1', '2')
;UPDATE sub_tbl SET a = 'abc'
;UPDATE sub_tbl SET a = 'abc'
;DELETE FROM sub_tbl
;DELETE FROM sub_tbl
;DROP TABLE t1
;DROP TABLE t1
;DROP TABLE t1;