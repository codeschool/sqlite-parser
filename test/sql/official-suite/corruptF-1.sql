-- original: corruptF.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA auto_vacuum = 0;
    PRAGMA page_size = 1024;
    CREATE TABLE t1(x);         /* root page = 2 */
    CREATE TABLE t2(x);         /* root page = 3 */
    CREATE TABLE t3(x);         /* root page = 4 */

    INSERT INTO t1 VALUES(str(1));
    INSERT INTO t1 SELECT str(rowid+1) FROM t1;
    INSERT INTO t1 SELECT str(rowid+2) FROM t1;
    INSERT INTO t1 SELECT str(rowid+4) FROM t1;
    INSERT INTO t1 SELECT str(rowid+8) FROM t1;
    INSERT INTO t1 SELECT str(rowid+16) FROM t1;
    INSERT INTO t1 SELECT str(rowid+32) FROM t1;
    INSERT INTO t1 SELECT str(rowid+64) FROM t1;
    DROP TABLE t2;
    DROP TABLE t3
;CREATE TABLE t4(x);
  SELECT * FROM sqlite_master
;CREATE TABLE t4(x);
  SELECT * FROM sqlite_master;