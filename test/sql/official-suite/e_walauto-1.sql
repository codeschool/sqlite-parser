-- original: e_walauto.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

INSERT INTO t1 VALUES(randomblob(100), randomblob(100))
;PRAGMA wal_autocheckpoint = sub_value
;PRAGMA auto_vacuum = 0
;INSERT INTO t1 VALUES(randomblob(100), randomblob(100))
;INSERT INTO t1 VALUES(randomblob(100), randomblob(100))
;INSERT INTO t1 VALUES(randomblob(100), randomblob(100))
;INSERT INTO t1 VALUES(randomblob(100), randomblob(100))
;INSERT INTO t1 VALUES(randomblob(100), randomblob(100))
;INSERT INTO t1 VALUES(randomblob(100), randomblob(100))
;INSERT INTO t1 VALUES(randomblob(100), randomblob(100))
;INSERT INTO t1 VALUES(randomblob(100), randomblob(100))
;INSERT INTO t1 VALUES(randomblob(100), randomblob(100))
;INSERT INTO t1 VALUES(randomblob(100), randomblob(100))
;INSERT INTO t1 VALUES(randomblob(100), randomblob(100))
;INSERT INTO t1 VALUES(randomblob(100), randomblob(100))
;INSERT INTO t1 VALUES(randomblob(100), randomblob(100))
;BEGIN; SELECT * FROM t1 LIMIT 10
;INSERT INTO t1 VALUES(randomblob(100), randomblob(100))
;INSERT INTO t1 VALUES(randomblob(100), randomblob(100));