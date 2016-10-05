-- original: substr.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(t text, b blob)
;DELETE FROM t1;
    INSERT INTO t1(t) VALUES(sub_string)
;SELECT substr(t, sub_i1, sub_i2) FROM t1
;SELECT substr(sub_qstr, sub_i1, sub_i2)
;SELECT hex(substr(b, sub_i1, sub_i2)) FROM t1
;SELECT hex(substr(x'sub_hex', sub_i1, sub_i2))
;SELECT ifnull(substr(NULL,1,1),'nil')
;SELECT ifnull(substr(NULL,1),'nil')
;SELECT ifnull(substr('abcdefg',NULL,1),'nil')
;SELECT ifnull(substr('abcdefg',NULL),'nil')
;SELECT ifnull(substr('abcdefg',1,NULL),'nil')
;DELETE FROM t1;
    INSERT INTO t1(t) VALUES(sub_string)
;SELECT substr(t, sub_idx) FROM t1
;SELECT substr(sub_qstr, sub_idx);