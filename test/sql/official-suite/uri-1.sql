-- original: uri.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

ATTACH sub_uri AS aux
;CREATE TABLE t1(a, b)
;CREATE TABLE t1(a, b)
;SELECT * FROM t1
;BEGIN; INSERT INTO t1 VALUES(1, 2)
;ATTACH 'file:test.db2?vfs=tvfs2' AS aux;
      PRAGMA main.journal_mode = PERSIST;
      PRAGMA aux.journal_mode = PERSIST;
      CREATE TABLE t1(a, b);
      CREATE TABLE aux.t2(a, b);
      PRAGMA main.journal_mode = WAL;
      PRAGMA aux.journal_mode = WAL;
      INSERT INTO t1 VALUES('x', 'y');
      INSERT INTO t2 VALUES('x', 'y')
;CREATE TABLE t1(a, b);
    INSERT INTO t1 VALUES(1, 2);
    ATTACH 'test.db2' AS aux;
    CREATE TABLE aux.t2(a, b);
    INSERT INTO t1 VALUES('a', 'b')
;ATTACH 'file:test.db2?mode=rw' AS aux
;INSERT INTO t2 VALUES('c', 'd');