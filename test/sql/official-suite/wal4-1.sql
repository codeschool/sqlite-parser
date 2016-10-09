-- original: wal4.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA journal_mode=WAL;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(1);
    INSERT INTO t1 VALUES(2);
    SELECT x FROM t1 ORDER BY x
;SELECT name FROM sqlite_master;