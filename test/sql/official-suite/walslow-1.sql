-- original: walslow.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA journal_mode = wal
;CREATE TABLE t1(a, b)
;CREATE INDEX i1 ON t1(a)
;CREATE INDEX i2 ON t1(b)
;INSERT INTO t1 VALUES(randomblob(sub_w), randomblob(sub_x))
;PRAGMA integrity_check
;PRAGMA wal_checkpoint
;PRAGMA integrity_check
;PRAGMA journal_mode = WAL
;PRAGMA integrity_check
;SELECT count(*) FROM t1 WHERE a!=b
;SELECT count(*) FROM t1 WHERE a!=b;