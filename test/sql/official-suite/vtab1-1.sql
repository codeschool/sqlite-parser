-- original: vtab1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT name FROM sqlite_master ORDER BY 1
;SELECT name FROM sqlite_master ORDER BY 1
;SELECT name FROM sqlite_master ORDER BY 1
;CREATE TABLE t2152b(x,y)
;DROP TABLE t2152a; DROP TABLE t2152b
;DROP TABLE treal;
    SELECT name FROM sqlite_master ORDER BY 1
;CREATE TABLE treal(a, b, c);
    CREATE VIRTUAL TABLE techo USING echo(treal)
;DROP TABLE techo;
    CREATE TABLE logmsg(log)
;DROP TABLE treal;
    DROP TABLE logmsg;
    SELECT sql FROM sqlite_master
;CREATE TABLE template(a, b, c)
;PRAGMA table_info(template)
;CREATE VIRTUAL TABLE t1 USING echo(template)
;PRAGMA table_info(t1)
;PRAGMA table_info(t1)
;DROP TABLE t1
;PRAGMA table_info(t1)
;SELECT sql FROM sqlite_master
;DROP TABLE template;
    SELECT sql FROM sqlite_master
;CREATE TABLE treal(a INTEGER, b INTEGER, c); 
    CREATE INDEX treal_idx ON treal(b);
    CREATE VIRTUAL TABLE t1 USING echo(treal)
;SELECT a, b, c FROM t1
;INSERT INTO treal VALUES(1, 2, 3);
    INSERT INTO treal VALUES(4, 5, 6);
    SELECT * FROM t1
;SELECT a FROM t1
;SELECT rowid FROM t1
;SELECT * FROM t1
;SELECT rowid, * FROM t1
;SELECT a AS d, b AS e, c AS f FROM t1
;SELECT * FROM t1
;SELECT * FROM t1 WHERE b = 5
;SELECT * FROM t1 WHERE b >= 5 AND b <= 10
;SELECT * FROM t1 WHERE b BETWEEN 2 AND 10
;SELECT * FROM t1 WHERE b MATCH 'string'
;DROP TABLE t1;
  DROP TABLE treal
;CREATE TABLE t1(a, b, c);
    CREATE TABLE t2(d, e, f);
    INSERT INTO t1 VALUES(1, 'red', 'green');
    INSERT INTO t1 VALUES(2, 'blue', 'black');
    INSERT INTO t2 VALUES(1, 'spades', 'clubs');
    INSERT INTO t2 VALUES(2, 'hearts', 'diamonds');
    CREATE VIRTUAL TABLE et1 USING echo(t1);
    CREATE VIRTUAL TABLE et2 USING echo(t2)
;SELECT * FROM et1, et2
;SELECT * FROM et1, et2 WHERE et2.d = 2
;CREATE INDEX i1 ON t2(d)
;SELECT * FROM et1, et2 WHERE et2.d = 2
;DROP TABLE t1;
  DROP TABLE t2;
  DROP TABLE et1;
  DROP TABLE et2
;SELECT sql FROM sqlite_master
;CREATE TABLE treal(a PRIMARY KEY, b, c);
    CREATE VIRTUAL TABLE techo USING echo(treal);
    SELECT name FROM sqlite_master WHERE type = 'table'
;PRAGMA count_changes=ON;
    INSERT INTO techo VALUES(1, 2, 3)
;SELECT * FROM techo
;UPDATE techo SET a = 5
;SELECT * FROM techo
;UPDATE techo SET a=6 WHERE a<0
;SELECT * FROM techo
;UPDATE techo set a = a||b||c
;SELECT * FROM techo
;UPDATE techo set rowid = 10
;SELECT rowid FROM techo
;INSERT INTO techo VALUES(11,12,13)
;SELECT * FROM techo ORDER BY a
;UPDATE techo SET b=b+1000
;SELECT * FROM techo ORDER BY a
;DELETE FROM techo WHERE a=5
;SELECT * FROM techo ORDER BY a
;DELETE FROM techo
;SELECT * FROM techo ORDER BY a
;PRAGMA count_changes=OFF
;CREATE TABLE techo(a PRIMARY KEY, b, c)
;SELECT rowid, * FROM techo
;SELECT rowid, * FROM techo
;CREATE TABLE real_abc(a PRIMARY KEY, b, c);
    CREATE VIRTUAL TABLE echo_abc USING echo(real_abc)
;INSERT INTO echo_abc VALUES(1, 2, 3);
    SELECT last_insert_rowid()
;INSERT INTO echo_abc(rowid) VALUES(31427);
    SELECT last_insert_rowid()
;INSERT INTO echo_abc SELECT a||'.v2', b, c FROM echo_abc;
    SELECT last_insert_rowid()
;SELECT rowid, a, b, c FROM echo_abc
;UPDATE echo_abc SET c = 5 WHERE b = 2;
    SELECT last_insert_rowid()
;UPDATE echo_abc SET rowid = 5 WHERE rowid = 1;
    SELECT last_insert_rowid()
;DELETE FROM echo_abc WHERE b = 2;
    SELECT last_insert_rowid()
;SELECT rowid, a, b, c FROM echo_abc
;DELETE FROM echo_abc WHERE b = 2;
    SELECT last_insert_rowid()
;SELECT rowid, a, b, c FROM real_abc
;DELETE FROM echo_abc;
    SELECT last_insert_rowid()
;SELECT rowid, a, b, c FROM real_abc
;ATTACH 'test2.db' AS aux;
      CREATE VIRTUAL TABLE aux.e2 USING echo(real_abc)
;DROP TABLE treal;
    DROP TABLE techo;
    DROP TABLE echo_abc;
    DROP TABLE real_abc
;DROP TABLE e;
    SELECT name FROM sqlite_master
;CREATE TABLE del(d);
    CREATE VIRTUAL TABLE e2 USING echo(del)
;DROP TABLE del
;EXPLAIN SELECT * FROM e WHERE rowid = 2;
    EXPLAIN QUERY PLAN SELECT * FROM e WHERE rowid = 2 ORDER BY rowid
;SELECT * FROM e WHERE rowid||'' MATCH 'pattern'
;SELECT * FROM e WHERE match('pattern', rowid, 'pattern2')
;INSERT INTO r(a,b,c) VALUES(1,'?',99);
    INSERT INTO r(a,b,c) VALUES(2,3,99);
    SELECT a GLOB b FROM e
;SELECT a like 'b' FROM e
;SELECT a glob '2' FROM e
;SELECT  glob('2',a) FROM e
;SELECT  glob(a,'2') FROM e
;CREATE TABLE b(a, b, c);
    CREATE TABLE c(a UNIQUE, b, c);
    INSERT INTO b VALUES(1, 'A', 'B');
    INSERT INTO b VALUES(2, 'C', 'D');
    INSERT INTO b VALUES(3, 'E', 'F');
    INSERT INTO c VALUES(3, 'G', 'H');
    CREATE VIRTUAL TABLE echo_c USING echo(c)
;SELECT * FROM c
;BEGIN
;SELECT * FROM c
;COMMIT
;SELECT * FROM c
;SELECT * FROM echo_c WHERE a IS NULL
;INSERT INTO c VALUES(NULL, 15, 16);
    SELECT * FROM echo_c WHERE a IS NULL
;INSERT INTO c VALUES(15, NULL, 16);
    SELECT * FROM echo_c WHERE b IS NULL
;SELECT * FROM echo_c WHERE b IS sub_null
;SELECT * FROM echo_c WHERE b IS NULL AND a = 15
;SELECT * FROM echo_c WHERE NULL IS b AND a IS 15;