-- original: attach4.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

ATTACH 'sub_f' AS sub_name
;CREATE TABLE sub_name.tbl(x)
;INSERT INTO sub_name.tbl VALUES('sub_f')
;SELECT x FROM sub_name.tbl
;SELECT x FROM sub_name.tbl
;UPDATE sub_name.tbl SET x = 'sub_f'
;SELECT x FROM sub_name.tbl;