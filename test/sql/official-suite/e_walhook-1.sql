-- original: e_walhook.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(1)
;PRAGMA journal_mode = wal
;INSERT INTO t1 VALUES(2)
;BEGIN;
      INSERT INTO t1 VALUES(3);
      INSERT INTO t1 VALUES(4);
    COMMIT
;SELECT * FROM t1
;INSERT INTO t1 VALUES(5)
;ATTACH 'test.db2' AS aux;
    CREATE TABLE aux.t2(x);
    PRAGMA aux.journal_mode = wal
;INSERT INTO t2 VALUES('a')
;INSERT INTO t1 VALUES(6)
;SELECT * FROM t1
;INSERT INTO t1 VALUES(10)
;INSERT INTO t1 VALUES(11)
;INSERT INTO t1 VALUES(12)
;PRAGMA wal_autocheckpoint = 1000
;INSERT INTO t1 VALUES(12);