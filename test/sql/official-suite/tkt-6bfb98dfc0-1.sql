-- original: tkt-6bfb98dfc0.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size=512;
    CREATE TABLE t1(x INTEGER PRIMARY KEY, y);
    INSERT INTO t1 VALUES(1,randomblob(400));
    INSERT INTO t1 VALUES(2,randomblob(400));
    INSERT INTO t1 SELECT x+2, randomblob(400) FROM t1;
    INSERT INTO t1 SELECT x+4, randomblob(400) FROM t1;
    INSERT INTO t1 SELECT x+8, randomblob(400) FROM t1;
    INSERT INTO t1 SELECT x+16, randomblob(400) FROM t1;
    INSERT INTO t1 SELECT x+32, randomblob(400) FROM t1;
    INSERT INTO t1 SELECT x+64, randomblob(400) FROM t1 WHERE x<10;
    CREATE TRIGGER r1 AFTER INSERT ON t1 WHEN new.x=74 BEGIN
      DELETE FROM t1;
      INSERT INTO t1 VALUES(75, randomblob(400));
      INSERT INTO t1 VALUES(76, randomblob(400));
    END;
    INSERT INTO t1 VALUES(74, randomblob(400));
    SELECT x, length(y) FROM t1 ORDER BY x;