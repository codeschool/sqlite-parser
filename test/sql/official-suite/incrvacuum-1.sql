-- original: incrvacuum.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

pragma auto_vacuum
;pragma auto_vacuum = 'full';
    pragma auto_vacuum
;pragma auto_vacuum = 'incremental';
    pragma auto_vacuum
;pragma auto_vacuum = 'invalid';
    pragma auto_vacuum
;pragma auto_vacuum = 1;
    pragma auto_vacuum
;pragma auto_vacuum = '2';
    pragma auto_vacuum
;pragma auto_vacuum = 5;
    pragma auto_vacuum
;pragma auto_vacuum = 1;
    CREATE TABLE abc(a, b, c)
;pragma auto_vacuum = 'none';
    pragma auto_vacuum
;pragma auto_vacuum
;pragma auto_vacuum = 'incremental';
    pragma auto_vacuum
;pragma auto_vacuum = 'full';
    pragma auto_vacuum
;pragma auto_vacuum
;PRAGMA auto_vacuum = 2;
    BEGIN;
    CREATE TABLE tbl2(str);
    INSERT INTO tbl2 VALUES(sub_str);
    COMMIT
;DROP TABLE abc;
    DELETE FROM tbl2
;PRAGMA auto_vacuum = 1;
    INSERT INTO tbl2 VALUES('hello world')
;PRAGMA auto_vacuum = 2;
    INSERT INTO tbl2 VALUES(sub_str);
    CREATE TABLE tbl1(a, b, c)
;DELETE FROM tbl2;
    DROP TABLE tbl1
;pragma incremental_vacuum(10)
;BEGIN;
    DROP TABLE tbl2;
    PRAGMA incremental_vacuum;
    COMMIT
;BEGIN;
    CREATE TABLE tbl1(a);
    INSERT INTO tbl1 VALUES(sub_str);
    PRAGMA incremental_vacuum;                 -- this is a no-op.
    COMMIT
;BEGIN;
    INSERT INTO tbl1 VALUES(sub_str);
    INSERT INTO tbl1 SELECT * FROM tbl1;
    DELETE FROM tbl1 WHERE oid%2;        -- Put 2 overflow pages on free-list.
    COMMIT
;BEGIN;
    PRAGMA incremental_vacuum;           -- Vacuum up the two pages.
    CREATE TABLE tbl2(b);                -- Use one free page as a table root.
    INSERT INTO tbl2 VALUES('a nice string');
    COMMIT
;SELECT * FROM tbl2
;DROP TABLE tbl1;
    DROP TABLE tbl2;
    PRAGMA incremental_vacuum
;SELECT tbl_name FROM sqlite_master WHERE type = 'table'
;SELECT tbl_name FROM sqlite_master WHERE type = 'table'
;SELECT * FROM sub_tbl
;SELECT * FROM sub_tbl
;PRAGMA auto_vacuum = 'none'
;PRAGMA auto_vacuum = 'incremental'
;PRAGMA integrity_check
;PRAGMA integrity_check
;DROP TABLE IF EXISTS tbl1;
      DROP TABLE IF EXISTS tbl2;
      PRAGMA incremental_vacuum;
      CREATE TABLE tbl1(a, b);
      CREATE TABLE tbl2(a, b);
      BEGIN
;INSERT INTO tbl1 VALUES(sub_ii, sub_ii || sub_ii)
;INSERT INTO tbl2 SELECT * FROM tbl1;
      COMMIT;
      DROP TABLE tbl1
;SELECT a FROM tbl2
;PRAGMA incremental_vacuum
;DROP TABLE IF EXISTS tbl1;
      DROP TABLE IF EXISTS tbl2;
      PRAGMA incremental_vacuum;
      CREATE TABLE tbl1(a, b);
      CREATE TABLE tbl2(a, b);
      BEGIN
;INSERT INTO tbl1 VALUES(sub_ii, sub_ii || sub_ii)
;INSERT INTO tbl2 SELECT * FROM tbl1;
      COMMIT;
      DROP TABLE tbl1
;PRAGMA incremental_vacuum
;CREATE TABLE tbl1(a, b);
          INSERT INTO tbl1 VALUES('hello', 'world')
;SELECT * FROM tbl1
;PRAGMA incremental_vacuum(50)
;PRAGMA auto_vacuum = 'incremental';
    CREATE TABLE t1(a, b, c);
    CREATE TABLE t2(a, b, c);
    INSERT INTO t2 VALUES(randstr(500,500),randstr(500,500),randstr(500,500));
    INSERT INTO t1 VALUES(1, 2, 3);
    INSERT INTO t1 SELECT a||a, b||b, c||c FROM t1;
    INSERT INTO t1 SELECT a||a, b||b, c||c FROM t1;
    INSERT INTO t1 SELECT a||a, b||b, c||c FROM t1;
    INSERT INTO t1 SELECT a||a, b||b, c||c FROM t1;
    INSERT INTO t1 SELECT a||a, b||b, c||c FROM t1;
    INSERT INTO t1 SELECT a||a, b||b, c||c FROM t1;
    INSERT INTO t1 SELECT a||a, b||b, c||c FROM t1;
    INSERT INTO t1 SELECT a||a, b||b, c||c FROM t1
;PRAGMA synchronous = 'OFF';
    BEGIN;
    UPDATE t1 SET a = a, b = b, c = c;
    DROP TABLE t2;
    PRAGMA incremental_vacuum(10);
    ROLLBACK
;PRAGMA cache_size = 10;
    BEGIN;
    UPDATE t1 SET a = a, b = b, c = c;
    DROP TABLE t2;
    PRAGMA incremental_vacuum(10);
    ROLLBACK
;DROP TABLE t1;
    DROP TABLE t2
;PRAGMA incremental_vacuum(1)
;PRAGMA incremental_vacuum(5)
;PRAGMA incremental_vacuum('1')
;PRAGMA incremental_vacuum("+3")
;PRAGMA incremental_vacuum = 1
;PRAGMA incremental_vacuum(2147483649)
;CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(hex(randomblob(1000)));
    DROP TABLE t1
;PRAGMA incremental_vacuum=-1
;PRAGMA auto_vacuum
;PRAGMA auto_vacuum
;PRAGMA auto_vacuum = incremental
;PRAGMA auto_vacuum
;PRAGMA auto_vacuum
;PRAGMA auto_vacuum = 'full';
    PRAGMA auto_vacuum
;PRAGMA auto_vacuum
;PRAGMA auto_vacuum = 1
;BEGIN EXCLUSIVE
;ROLLBACK
;PRAGMA auto_vacuum
;PRAGMA auto_vacuum
;SELECT * FROM sqlite_master
;PRAGMA auto_vacuum
;PRAGMA auto_vacuum = none;
    PRAGMA default_cache_size = 1024;
    PRAGMA auto_vacuum
;PRAGMA auto_vacuum
;PRAGMA cache_size = 10;
    PRAGMA auto_vacuum = incremental;
    CREATE TABLE t1(x, y);
    INSERT INTO t1 VALUES('a', sub_str);
    INSERT INTO t1 VALUES('b', sub_str);
    INSERT INTO t1 VALUES('c', sub_str);
    INSERT INTO t1 VALUES('d', sub_str);
    INSERT INTO t1 VALUES('e', sub_str);
    INSERT INTO t1 VALUES('f', sub_str);
    INSERT INTO t1 VALUES('g', sub_str);
    INSERT INTO t1 VALUES('h', sub_str);
    INSERT INTO t1 VALUES('i', sub_str);
    INSERT INTO t1 VALUES('j', sub_str);
    INSERT INTO t1 VALUES('j', sub_str);

    CREATE TABLE t2(x PRIMARY KEY, y);
    INSERT INTO t2 VALUES('a', sub_str);
    INSERT INTO t2 VALUES('b', sub_str);
    INSERT INTO t2 VALUES('c', sub_str);
    INSERT INTO t2 VALUES('d', sub_str);

    BEGIN;
      DELETE FROM t2;
      PRAGMA incremental_vacuum
;COMMIT;
    PRAGMA integrity_check;