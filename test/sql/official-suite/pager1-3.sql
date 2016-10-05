-- original: pager1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA locking_mode=EXCLUSIVE;
    SELECT count(*) FROM sqlite_master;
    PRAGMA lock_status
;PRAGMA cache_size = 10;
    PRAGMA page_size = 1024;
    CREATE TABLE t1(x, y, UNIQUE(x, y));
    INSERT INTO t1 VALUES(randomblob(1500), randomblob(1500));
    INSERT INTO t1 SELECT randomblob(1500), randomblob(1500) FROM t1;
    INSERT INTO t1 SELECT randomblob(1500), randomblob(1500) FROM t1;
    INSERT INTO t1 SELECT randomblob(1500), randomblob(1500) FROM t1;
    INSERT INTO t1 SELECT randomblob(1500), randomblob(1500) FROM t1;
    INSERT INTO t1 SELECT randomblob(1500), randomblob(1500) FROM t1;
    INSERT INTO t1 SELECT randomblob(1500), randomblob(1500) FROM t1;
    INSERT INTO t1 SELECT randomblob(1500), randomblob(1500) FROM t1;
    INSERT INTO t1 SELECT randomblob(1500), randomblob(1500) FROM t1;
    INSERT INTO t1 SELECT randomblob(1500), randomblob(1500) FROM t1;
    INSERT INTO t1 SELECT randomblob(1500), randomblob(1500) FROM t1;
    BEGIN;
      UPDATE t1 SET y = randomblob(1499)
;PRAGMA integrity_check
;CREATE TABLE t1(x, y)
;BEGIN;
    INSERT INTO t1 VALUES(1, randomblob(10000))
;PRAGMA cache_size = 10;
    INSERT INTO t1 VALUES(1, randomblob(10000));
    INSERT INTO t1 VALUES(2, randomblob(10000));
    INSERT INTO t1 SELECT x+2, randomblob(10000) from t1;
    INSERT INTO t1 SELECT x+4, randomblob(10000) from t1;
    INSERT INTO t1 SELECT x+8, randomblob(10000) from t1;
    INSERT INTO t1 SELECT x+16, randomblob(10000) from t1;
    SELECT count(*) FROM t1;
    COMMIT
;CREATE TABLE t1(x);
      INSERT INTO t1 VALUES('one');
      INSERT INTO t1 VALUES('two');
      BEGIN;
        INSERT INTO t1 VALUES('three');
        INSERT INTO t1 VALUES('four')
;SELECT * FROM t1
;CREATE TABLE t1(x, y);
    PRAGMA journal_mode = WAL;
    INSERT INTO t1 VALUES(1, 2)
;BEGIN;
      CREATE TABLE t2(a, b)
;PRAGMA auto_vacuum = 0;
    CREATE TABLE t1(x, y);
    INSERT INTO t1 VALUES(1, 2)
;PRAGMA max_page_count = 2
;PRAGMA checkpoint_fullfsync = 1
;CREATE TABLE t2(x)
;INSERT INTO t2 VALUES('xyz')
;CREATE TABLE t1(x);
      INSERT INTO t1 VALUES(1);
      SELECT * FROM t1
;PRAGMA auto_vacuum = 1;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES('xxx');
    INSERT INTO t1 VALUES('two');
    INSERT INTO t1 VALUES(randomblob(400));
    INSERT INTO t1 VALUES(randomblob(400));
    INSERT INTO t1 VALUES(randomblob(400));
    INSERT INTO t1 VALUES(randomblob(400));
    BEGIN;
    UPDATE t1 SET x = 'one' WHERE rowid=1
;CREATE TABLE t2(x)
;PRAGMA auto_vacuum = 2;
  CREATE TABLE t3(x);
  CREATE TABLE t4(x);

  DROP TABLE t2;
  DROP TABLE t3;
  DROP TABLE t4
;PRAGMA cache_size = 1;
    PRAGMA incremental_vacuum;
    PRAGMA integrity_check
;PRAGMA auto_vacuum = 1;
    CREATE TABLE t1(x PRIMARY KEY);
    INSERT INTO t1 VALUES(randomblob(1200));
    PRAGMA page_count
;INSERT INTO t1 VALUES(randomblob(1200));
    INSERT INTO t1 VALUES(randomblob(1200));
    INSERT INTO t1 VALUES(randomblob(1200))
;PRAGMA cache_size = 1;
    CREATE TABLE t2(x);
    PRAGMA integrity_check
;CREATE TABLE t1(x PRIMARY KEY);
    INSERT INTO t1 VALUES(randomblob(200));
    INSERT INTO t1 SELECT randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200) FROM t1
;PRAGMA cache_size = 1;
    DELETE FROM t1 WHERE rowid%4;
    PRAGMA integrity_check
;CREATE TABLE t1(x, y);
    INSERT INTO t1 VALUES(randomblob(200), randomblob(200));
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1
;PRAGMA mmap_size = 0
;CREATE TABLE t1(x, y);
    INSERT INTO t1 VALUES(randomblob(200), randomblob(200));
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1;
    INSERT INTO t1 SELECT randomblob(200), randomblob(200) FROM t1
;UPDATE t1 SET x = randomblob(200)
;CREATE TABLE t1(x, y);
    INSERT INTO t1 VALUES(1, 2);
    CREATE TABLE t2(x, y);
    INSERT INTO t2 VALUES(1, 2);
    CREATE TABLE t3(x, y);
    INSERT INTO t3 VALUES(1, 2)
;PRAGMA mmap_size = 0
;SELECT * FROM t1
;SELECT * FROM t2
;SELECT * FROM t3;