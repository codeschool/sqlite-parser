-- original: mmap1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA cache_size=2000
;PRAGMA cache_size=2000
;PRAGMA page_size=1024
;PRAGMA page_size=1024;
      PRAGMA auto_vacuum = 1;
      CREATE TABLE t1(a, b, UNIQUE(a, b));
      INSERT INTO t1 VALUES(rblob(500), rblob(500));
      INSERT INTO t1 SELECT rblob(500), rblob(500) FROM t1; --    2
      INSERT INTO t1 SELECT rblob(500), rblob(500) FROM t1; --    4
      INSERT INTO t1 SELECT rblob(500), rblob(500) FROM t1; --    8
      INSERT INTO t1 SELECT rblob(500), rblob(500) FROM t1; --   16
      INSERT INTO t1 SELECT rblob(500), rblob(500) FROM t1; --   32
;SELECT count(*) FROM t1; PRAGMA integrity_check ; PRAGMA page_count
;DELETE FROM t1 WHERE rowid%2
;SELECT count(*) FROM t1; PRAGMA integrity_check ; PRAGMA page_count
;INSERT INTO t1 SELECT rblob(500), rblob(500) FROM t1
;SELECT count(*) FROM t1; PRAGMA integrity_check ; PRAGMA page_count
;INSERT INTO t1 SELECT rblob(500), rblob(500) FROM t1
;SELECT count(*) FROM t1; PRAGMA integrity_check ; PRAGMA page_count
;PRAGMA auto_vacuum = 1;
    PRAGMA mmap_size = 67108864;
    PRAGMA journal_mode = wal;
    CREATE TABLE t1(a, b, UNIQUE(a, b));
    INSERT INTO t1 VALUES(rblob(500), rblob(500));
    INSERT INTO t1 SELECT rblob(500), rblob(500) FROM t1; --    2
    INSERT INTO t1 SELECT rblob(500), rblob(500) FROM t1; --    4
    INSERT INTO t1 SELECT rblob(500), rblob(500) FROM t1; --    8
    INSERT INTO t1 SELECT rblob(500), rblob(500) FROM t1; --   16
    INSERT INTO t1 SELECT rblob(500), rblob(500) FROM t1; --   32
    PRAGMA wal_checkpoint
;PRAGMA auto_vacuum;
    SELECT count(*) FROM t1
;DELETE FROM t1 WHERE (rowid%4);
          PRAGMA wal_checkpoint
;INSERT INTO t1 SELECT rblob(500), rblob(500) FROM t1; --    16
        SELECT count(*) FROM t1
;PRAGMA wal_checkpoint
;PRAGMA mmap_size = 67108864
;PRAGMA auto_vacuum = 1;

  CREATE TABLE t1(a, b, UNIQUE(a, b));
  INSERT INTO t1 VALUES(rblob(500), rblob(500));
  INSERT INTO t1 SELECT rblob(500), rblob(500) FROM t1; --    2
  INSERT INTO t1 SELECT rblob(500), rblob(500) FROM t1; --    4
  INSERT INTO t1 SELECT rblob(500), rblob(500) FROM t1; --    8

  CREATE TABLE t2(a, b, UNIQUE(a, b));
  INSERT INTO t2 SELECT * FROM t1
;SELECT * FROM t2 ORDER BY a, b
;DELETE FROM t1
;PRAGMA mmap_size = 67108864
;PRAGMA page_size = 1024;
  CREATE TABLE t1(x);
  INSERT INTO t1 VALUES(sub_aaa);
  INSERT INTO t1 VALUES(sub_bbb);
  INSERT INTO t1 VALUES(sub_ccc);
  INSERT INTO t1 VALUES(sub_ddd);
  SELECT * FROM t1;
  BEGIN
;COMMIT
;PRAGMA mmap_size = 67108864
;PRAGMA auto_vacuum = 2;
  PRAGMA page_size = 1024;
  CREATE TABLE t1(x);
  INSERT INTO t1 VALUES(sub_aaa);
  INSERT INTO t1 VALUES(sub_bbb);
  INSERT INTO t1 VALUES(sub_ccc);
  INSERT INTO t1 VALUES(sub_ddd);

  PRAGMA auto_vacuum;
  SELECT * FROM t1
;CREATE TABLE t2(x);
  INSERT INTO t2 VALUES('tricked you!');
  INSERT INTO t2 VALUES('tricked you!')
;CREATE TABLE t1(a PRIMARY KEY);
      CREATE TABLE t2(x);
      INSERT INTO t2 VALUES('')
;PRAGMA mmap_size = sub_mmap1
;PRAGMA mmap_size = sub_mmap2;