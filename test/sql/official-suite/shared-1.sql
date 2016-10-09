-- original: shared.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

pragma auto_vacuum=sub_av
;pragma auto_vacuum
;CREATE TABLE abc(a, b, c);
    INSERT INTO abc VALUES(1, 2, 3)
;SELECT * FROM abc
;BEGIN;
    SELECT * FROM abc
;SELECT * FROM abc
;CREATE TABLE def(d, e, f);
    INSERT INTO def VALUES('IV', 'V', 'VI')
;SELECT * FROM sqlite_master
;COMMIT
;BEGIN;
    SELECT * FROM abc
;BEGIN;
    SELECT * FROM abc
;ROLLBACK;
    BEGIN;
    SELECT * FROM abc
;INSERT INTO def VALUES('VII', 'VIII', 'IX')
;COMMIT
;SELECT * FROM sqlite_master
;PRAGMA read_uncommitted = 1
;SELECT i FROM seq ORDER BY i
;SELECT max(i) FROM seq
;INSERT INTO seq SELECT i +:max, x FROM seq
;SELECT i FROM seq
;DELETE FROM seq WHERE i = :i
;SELECT * FROM seq
;ATTACH 'test2.db' AS test2
;ATTACH 'test.db' AS test
;CREATE TABLE abc(a, b, c);
    CREATE TABLE def(d, e, f);
    INSERT INTO abc VALUES('i', 'ii', 'iii');
    INSERT INTO def VALUES('I', 'II', 'III')
;SELECT * FROM test.abc
;BEGIN;
    SELECT * FROM test.abc
;COMMIT
;CREATE TABLE test2.ghi(g, h, i);
      SELECT 'test.db:'||name FROM sqlite_master 
      UNION ALL
      SELECT 'test2.db:'||name FROM test2.sqlite_master
;SELECT 'test2.db:'||name FROM sqlite_master 
      UNION ALL
      SELECT 'test.db:'||name FROM test.sqlite_master
;BEGIN;
    CREATE TABLE jkl(j, k, l)
;ATTACH 'test1.db' AS test1;
    ATTACH 'test2.db' AS test2;
    ATTACH 'test3.db' AS test3
;ATTACH 'test3.db' AS test3;
    ATTACH 'test2.db' AS test2;
    ATTACH 'test1.db' AS test1
;CREATE TABLE test1.t1(a, b);
    CREATE INDEX test1.i1 ON t1(a, b)
;CREATE VIEW test1.v1 AS SELECT * FROM t1
;CREATE TRIGGER test1.trig1 AFTER INSERT ON t1 BEGIN
        INSERT INTO t1 VALUES(new.a, new.b);
      END
;DROP INDEX i1
;DROP VIEW v1
;DROP TRIGGER trig1
;DROP TABLE t1
;SELECT * FROM sqlite_master UNION ALL SELECT * FROM test1.sqlite_master
;CREATE TABLE t1(a, b);
    CREATE TABLE t2(a, b);
    INSERT INTO t1 VALUES(1, 2);
    INSERT INTO t2 VALUES(3, 4)
;SELECT * FROM t1 UNION ALL SELECT * FROM t2
;BEGIN;
    INSERT INTO t2 VALUES(5, 6)
;SELECT * FROM t1 UNION ALL SELECT * FROM t2
;COMMIT;
    BEGIN;
    INSERT INTO t1 VALUES(7, 8)
;SELECT (CASE WHEN a>4 THEN (SELECT a FROM t1) ELSE 0 END) AS d FROM t2
;BEGIN;
    CREATE TABLE t1(a PRIMARY KEY, b);
    CREATE TABLE t2(a PRIMARY KEY, b)
;INSERT INTO t1 VALUES(:a, :b)
;INSERT INTO t2 SELECT * FROM t1;
    COMMIT
;SELECT oid AS i, a, b FROM sub_tbl ORDER BY a
;SELECT oid FROM sub_tbl
;DELETE FROM t1
;PRAGMA encoding = 'UTF-16';
      SELECT * FROM sqlite_master
;PRAGMA encoding
;PRAGMA encoding = 'UTF-8';
      CREATE TABLE abc(a, b, c)
;SELECT * FROM sqlite_master
;PRAGMA encoding
;ATTACH 'test2.db' AS aux;
      SELECT * FROM aux.sqlite_master
;PRAGMA encoding = 'UTF-16';
      CREATE TABLE def(d, e, f)
;PRAGMA encoding
;CREATE TABLE def(d, e, f)
;PRAGMA encoding
;CREATE TABLE abc(a, b, c);
    CREATE TABLE abc_mirror(a, b, c);
    CREATE TEMP TRIGGER BEFORE INSERT ON abc BEGIN 
      INSERT INTO abc_mirror(a, b, c) VALUES(new.a, new.b, new.c);
    END;
    INSERT INTO abc VALUES(1, 2, 3);
    SELECT * FROM abc_mirror
;INSERT INTO abc VALUES(4, 5, 6);
    SELECT * FROM abc_mirror
;CREATE TABLE ab(a PRIMARY KEY, b);
    CREATE TABLE de(d PRIMARY KEY, e);
    INSERT INTO ab VALUES('Chiang Mai', 100000);
    INSERT INTO ab VALUES('Bangkok', 8000000);
    INSERT INTO de VALUES('Ubon', 120000);
    INSERT INTO de VALUES('Khon Kaen', 200000)
;BEGIN;
    SELECT * FROM ab
;BEGIN;
    INSERT INTO de VALUES('Pataya', 30000)
;SELECT * FROM ab
;SELECT * FROM de
;COMMIT
;SELECT * FROM de
;CREATE TABLE abc(a, b, c);
    CREATE TABLE abc2(a, b, c);
    BEGIN;
    INSERT INTO abc VALUES(1, 2, 3)
;ROLLBACK;
    PRAGMA read_uncommitted = 1
;INSERT INTO abc2 VALUES(4, 5, 6);
    INSERT INTO abc2 VALUES(7, 8, 9)
;SELECT abc.a as I, abc2.a as II FROM abc, abc2
;DELETE FROM abc WHERE 1
;PRAGMA cache_size = 10;
      PRAGMA cache_size
;CREATE TABLE dbsub_i(a, b, c)
;INSERT INTO dbsub_i VALUES(1, 2, 3)
;SELECT * FROM [lindex sub_handles 0]
;ATTACH 'test2.db' AS aux2;
    ATTACH 'test3.db' AS aux3;
    ATTACH 'test4.db' AS aux4;
    ATTACH 'test5.db' AS aux5;
    DETACH aux2;
    DETACH aux3;
    DETACH aux4;
    ATTACH 'test2.db' AS aux2;
    ATTACH 'test3.db' AS aux3;
    ATTACH 'test4.db' AS aux4
;CREATE TABLE t1(a, b, c);
    CREATE TABLE aux2.t2(a, b, c);
    CREATE TABLE aux3.t3(a, b, c);
    CREATE TABLE aux4.t4(a, b, c);
    CREATE TABLE aux5.t5(a, b, c);
    SELECT count(*) FROM 
      aux2.sqlite_master, 
      aux3.sqlite_master, 
      aux4.sqlite_master, 
      aux5.sqlite_master
;SELECT name FROM sqlite_master
;SELECT name FROM sqlite_master
;CREATE TABLE t1(a, b, c);
    CREATE INDEX i1 ON t1(a, b);
    CREATE VIEW v1 AS SELECT * FROM t1; 
    CREATE VIEW v2 AS SELECT * FROM t1, v1 
                      WHERE t1.c=v1.c GROUP BY t1.a ORDER BY v1.b; 
    CREATE TRIGGER tr1 AFTER INSERT ON t1 
      WHEN new.a!=1
    BEGIN
      DELETE FROM t1 WHERE a=5;
      INSERT INTO t1 VALUES(1, 2, 3);
      UPDATE t1 SET c=c+1;
    END;

    INSERT INTO t1 VALUES(5, 6, 7);
    INSERT INTO t1 VALUES(8, 9, 10);
    INSERT INTO t1 VALUES(11, 12, 13);
    ANALYZE;
    SELECT * FROM t1
;DROP TABLE t1
;CREATE TABLE t1(x); INSERT INTO t1 VALUES(1),(2),(3)
;SELECT x FROM t1 ORDER BY x
;INSERT INTO t1 VALUES(99);
    DELETE FROM t1 WHERE x=2
;SELECT x FROM t1 ORDER BY x
;CREATE TABLE t1(x); INSERT INTO t1 VALUES(4),(5),(6)
;CREATE TABLE t1(x); INSERT INTO t1 VALUES(1),(2),(3)
;SELECT x FROM t1 ORDER BY x
;INSERT INTO t1 VALUES(99);
    DELETE FROM t1 WHERE x=2
;SELECT x FROM t1 ORDER BY x
;CREATE TABLE t1(x); INSERT INTO t1 VALUES(1),(2),(3)
;CREATE TABLE yy(a, b);
    INSERT INTO yy VALUES(77, 88)
;ATTACH 'file:mem?mode=memory&cache=shared' AS shared; 
    CREATE TABLE shared.xx(a, b);
    INSERT INTO xx VALUES(55, 66)
;ATTACH 'file:mem?mode=memory&cache=shared' AS shared;
    SELECT * FROM xx;