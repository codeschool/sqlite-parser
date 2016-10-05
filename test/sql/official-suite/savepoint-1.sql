-- original: savepoint.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SAVEPOINT sp1;
    RELEASE sp1
;SAVEPOINT sp1;
    ROLLBACK TO sp1
;SAVEPOINT sp1
;SAVEPOINT sp1;
    SAVEPOINT sp2;
    RELEASE sp1
;SAVEPOINT sp1;
    SAVEPOINT sp2;
    RELEASE sp2
;RELEASE sp1
;SAVEPOINT sp1;
    SAVEPOINT sp2;
    ROLLBACK TO sp1
;RELEASE SAVEPOINT sp1
;SAVEPOINT sp1;
    SAVEPOINT sp2;
    SAVEPOINT sp3;
    ROLLBACK TO SAVEPOINT sp3;
    ROLLBACK TRANSACTION TO sp2;
    ROLLBACK TRANSACTION TO SAVEPOINT sp1
;RELEASE SAVEPOINT SP1
;SAVEPOINT sp1;
    ROLLBACK TO sp1
;CREATE TABLE t1(a, b, c);
    BEGIN;
    INSERT INTO t1 VALUES(1, 2, 3);
    SAVEPOINT one;
    UPDATE t1 SET a = 2, b = 3, c = 4
;SELECT * FROM t1
;ROLLBACK TO one
;SELECT * FROM t1
;INSERT INTO t1 VALUES(4, 5, 6)
;SELECT * FROM t1
;ROLLBACK TO one
;SELECT * FROM t1
;INSERT INTO t1 VALUES(7, 8, 9);
    SAVEPOINT two;
    INSERT INTO t1 VALUES(10, 11, 12)
;SELECT * FROM t1
;ROLLBACK TO two
;SELECT * FROM t1
;INSERT INTO t1 VALUES(10, 11, 12)
;SELECT * FROM t1
;ROLLBACK TO one
;SELECT * FROM t1
;INSERT INTO t1 VALUES('a', 'b', 'c');
    SAVEPOINT two;
    INSERT INTO t1 VALUES('d', 'e', 'f')
;SELECT * FROM t1
;RELEASE two
;SELECT * FROM t1
;ROLLBACK
;SELECT * FROM t1
;SAVEPOINT "transaction"
;PRAGMA lock_status
;INSERT INTO t1 VALUES(1, 2, 3)
;PRAGMA lock_status
;ROLLBACK TO "transaction"
;PRAGMA lock_status
;INSERT INTO t1 VALUES(1, 2, 3)
;PRAGMA lock_status
;RELEASE "transaction"
;PRAGMA lock_status
;CREATE TABLE t2(d, e, f);
    SELECT sql FROM sqlite_master
;BEGIN;
    CREATE TABLE t3(g,h);
    INSERT INTO t3 VALUES('I', 'II');
    SAVEPOINT one;
    DROP TABLE t3
;CREATE TABLE t3(g, h, i);
    INSERT INTO t3 VALUES('III', 'IV', 'V')
;SELECT * FROM t3
;ROLLBACK TO one
;SELECT * FROM t3
;ROLLBACK;
    SELECT sql FROM sqlite_master
;BEGIN;
    INSERT INTO t1 VALUES('o', 't', 't');
    SAVEPOINT sp1;
    CREATE TABLE t3(a, b, c);
    INSERT INTO t3 VALUES('z', 'y', 'x')
;SELECT * FROM t3
;ROLLBACK TO sp1;
    CREATE TABLE t3(a);
    INSERT INTO t3 VALUES('value')
;SELECT * FROM t3
;CREATE TABLE blobs(x);
      INSERT INTO blobs VALUES('a twentyeight character blob')
;RELEASE abc
;SAVEPOINT abc
;SAVEPOINT def
;savepoint def
;release abc
;SAVEPOINT main;
      INSERT INTO blobs VALUES('another blob')
;BEGIN ; SELECT count(*) FROM blobs
;SELECT x FROM blobs WHERE rowid = 2
;SELECT count(*) FROM blobs
;PRAGMA auto_vacuum = incremental
;CREATE TABLE t1(a, b, c);
      CREATE INDEX i1 ON t1(a, b);
      BEGIN;
      INSERT INTO t1 VALUES(randstr(10,400),randstr(10,400),randstr(10,400))
;INSERT INTO t1 SELECT sub_r, sub_r, sub_r FROM t1
;COMMIT
;PRAGMA cache_size = 10;
      BEGIN;
        UPDATE t1 SET a = randstr(10,10) WHERE (rowid%4)==0;
        SAVEPOINT one;
          DELETE FROM t1 WHERE rowid%2;
          PRAGMA incr_vacuum;
          SAVEPOINT two;
            INSERT INTO t1 SELECT randstr(10,400), randstr(10,400), c FROM t1;
            DELETE FROM t1 WHERE rowid%2;
            PRAGMA incr_vacuum;
        ROLLBACK TO one;
      COMMIT
;PRAGMA auto_vacuum = incremental
;PRAGMA cache_size = 10;
    BEGIN;
    CREATE TABLE t1(a PRIMARY KEY, b);
      INSERT INTO t1(a) VALUES('alligator');
      INSERT INTO t1(a) VALUES('angelfish');
      INSERT INTO t1(a) VALUES('ant');
      INSERT INTO t1(a) VALUES('antelope');
      INSERT INTO t1(a) VALUES('ape');
      INSERT INTO t1(a) VALUES('baboon');
      INSERT INTO t1(a) VALUES('badger');
      INSERT INTO t1(a) VALUES('bear');
      INSERT INTO t1(a) VALUES('beetle');
      INSERT INTO t1(a) VALUES('bird');
      INSERT INTO t1(a) VALUES('bison');
      UPDATE t1 SET b =    randstr(1000,1000);
      UPDATE t1 SET b = b||randstr(1000,1000);
      UPDATE t1 SET b = b||randstr(1000,1000);
      UPDATE t1 SET b = b||randstr(10,1000);
    COMMIT
;PRAGMA page_count
;BEGIN;
      SAVEPOINT one;
      CREATE TABLE t2(a, b);
      INSERT INTO t2 SELECT a, b FROM t1;
      ROLLBACK TO one
;PRAGMA integrity_check
;COMMIT;
    PRAGMA integrity_check
;CREATE TABLE t2(a, b);
    INSERT INTO t2 SELECT a, b FROM t1
;BEGIN;
      SAVEPOINT one;
        DELETE FROM t2;
        PRAGMA incremental_vacuum;
        SAVEPOINT two;
          INSERT INTO t2 SELECT a, b FROM t1;
        ROLLBACK TO two;
    COMMIT
;PRAGMA integrity_check
;PRAGMA auto_vacuum = incremental
;CREATE TABLE t1(a, b, PRIMARY KEY(a, b));
    INSERT INTO t1 VALUES(randstr(1000,1000), randstr(1000,1000));
    BEGIN;
      DELETE FROM t1;
      SAVEPOINT one;
      PRAGMA incremental_vacuum;
      ROLLBACK TO one;
    COMMIT
;PRAGMA integrity_check
;PRAGMA incremental_vacuum;
    CREATE TABLE t5(x, y);
    INSERT INTO t5 VALUES(1, randstr(1000,1000));
    INSERT INTO t5 VALUES(2, randstr(1000,1000));
    INSERT INTO t5 VALUES(3, randstr(1000,1000));

    BEGIN;
      INSERT INTO t5 VALUES(4, randstr(1000,1000));
      INSERT INTO t5 VALUES(5, randstr(1000,1000));
      DELETE FROM t5 WHERE x=1 OR x=2;
      SAVEPOINT one;
        PRAGMA incremental_vacuum;
        SAVEPOINT two;
          INSERT INTO t5 VALUES(1, randstr(1000,1000));
          INSERT INTO t5 VALUES(2, randstr(1000,1000));
        ROLLBACK TO two;
      ROLLBACK TO one;
    COMMIT;
    PRAGMA integrity_check
;DROP TABLE t5
;SAVEPOINT "save1"
;RELEASE save1
;SAVEPOINT "Including whitespace "
;RELEASE "including Whitespace "
;SAVEPOINT sp1
;ROLLBACK TO sp1
;RELEASE sp1
;RELEASE one;
    ATTACH 'test2.db' AS aux
;RELEASE one;
    DETACH aux
;PRAGMA lock_status
;ATTACH 'test2.db' AS aux1;
      ATTACH 'test3.db' AS aux2;
      DROP TABLE t1;
      CREATE TABLE main.t1(x, y);
      CREATE TABLE aux1.t2(x, y);
      CREATE TABLE aux2.t3(x, y);
      SELECT name FROM sqlite_master;
      SELECT name FROM aux1.sqlite_master;
      SELECT name FROM aux2.sqlite_master
;PRAGMA lock_status
;SAVEPOINT one;
      INSERT INTO t1 VALUES(1, 2);
      PRAGMA lock_status
;INSERT INTO t3 VALUES(3, 4);
      PRAGMA lock_status
;SAVEPOINT two;
      INSERT INTO t2 VALUES(5, 6);
      PRAGMA lock_status
;SELECT * FROM t2
;ROLLBACK TO two;