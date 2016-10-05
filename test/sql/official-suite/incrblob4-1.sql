-- original: incrblob4.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size = 1024;
    CREATE TABLE t1(k INTEGER PRIMARY KEY, v)
;INSERT INTO t1(v) VALUES(sub_blob)
;DELETE FROM t1
;DELETE FROM t1 WHERE k=10
;DELETE FROM t1 WHERE k=9
;INSERT INTO t1(v) VALUES(sub_new)
;UPDATE t1 SET v = sub_new WHERE k = 20
;DELETE FROM t1 WHERE k=19
;INSERT INTO t1(v) VALUES(sub_new);