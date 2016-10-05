-- original: syscall.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(x, y);
  INSERT INTO t1 VALUES(1, 2);
  ATTACH 'test.db2' AS aux;
  CREATE TABLE aux.t2(x, y);
  INSERT INTO t2 VALUES(3, 4)
;ATTACH 'test.db2' AS aux
;PRAGMA main.journal_mode = sub_jrnl
;PRAGMA aux.journal_mode = sub_jrnl
;BEGIN;
          INSERT INTO t1 VALUES(5, 6);
          INSERT INTO t2 VALUES(7, 8);
        COMMIT
;ATTACH 'test.db2' AS aux
;SELECT * FROM t1;
        SELECT * FROM t2
;CREATE TABLE t1(a, b);
      INSERT INTO t1 VALUES(1, 2);
      BEGIN;
        INSERT INTO t1 VALUES(3, 4)
;SELECT * FROM t1
;COMMIT
;PRAGMA temp_store = file;

    PRAGMA main.cache_size = 10;
    PRAGMA temp.cache_size = 10;
    CREATE TABLE temp.tt(a, b);
    INSERT INTO tt VALUES(randomblob(500), randomblob(600));
    INSERT INTO tt SELECT randomblob(500), randomblob(600) FROM tt;
    INSERT INTO tt SELECT randomblob(500), randomblob(600) FROM tt;
    INSERT INTO tt SELECT randomblob(500), randomblob(600) FROM tt;
    INSERT INTO tt SELECT randomblob(500), randomblob(600) FROM tt;
    INSERT INTO tt SELECT randomblob(500), randomblob(600) FROM tt;
    INSERT INTO tt SELECT randomblob(500), randomblob(600) FROM tt;
    INSERT INTO tt SELECT randomblob(500), randomblob(600) FROM tt;
    INSERT INTO tt SELECT randomblob(500), randomblob(600) FROM tt;