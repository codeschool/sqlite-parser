-- original: analyze.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT count(*) FROM sqlite_master WHERE name='sqlite_stat1'
;SELECT count(*) FROM sqlite_master WHERE name='sqlite_stat1'
;SELECT count(*) FROM sqlite_master WHERE name='sqlite_stat1'
;SELECT * FROM sqlite_stat1 WHERE idx NOT NULL
;SELECT * FROM sqlite_stat1 WHERE idx NOT NULL
;SELECT * FROM sqlite_stat1
;SELECT * FROM sqlite_stat1
;CREATE INDEX t1i1 ON t1(a);
    ANALYZE main.t1;
    SELECT * FROM sqlite_stat1 ORDER BY idx
;CREATE INDEX t1i2 ON t1(b);
    ANALYZE t1;
    SELECT * FROM sqlite_stat1 ORDER BY idx
;CREATE INDEX t1i3 ON t1(a,b);
    ANALYZE main;
    SELECT * FROM sqlite_stat1 ORDER BY idx
;INSERT INTO t1 VALUES(1,2);
    INSERT INTO t1 VALUES(1,3);
    ANALYZE main.t1;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx
;INSERT INTO t1 VALUES(1,4);
    INSERT INTO t1 VALUES(1,5);
    ANALYZE t1;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx
;INSERT INTO t1 VALUES(2,5);
    ANALYZE main;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx
;CREATE TABLE t2 AS SELECT * FROM t1;
    CREATE INDEX t2i1 ON t2(a);
    CREATE INDEX t2i2 ON t2(b);
    CREATE INDEX t2i3 ON t2(a,b);
    ANALYZE;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx
;DROP INDEX t2i3;
    ANALYZE t1;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx
;ANALYZE t2;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx
;DROP INDEX t2i2;
    ANALYZE t2;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx
;CREATE TABLE t3 AS SELECT a, b, rowid AS c, 'hi' AS d FROM t1;
    CREATE INDEX t3i1 ON t3(a);
    CREATE INDEX t3i2 ON t3(a,b,c,d);
    CREATE INDEX t3i3 ON t3(d,b,c,a);
    DROP TABLE t1;
    DROP TABLE t2;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx
;ANALYZE;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx
;CREATE TABLE [silly " name](a, b, c);
    CREATE INDEX 'foolish '' name' ON [silly " name](a, b);
    CREATE INDEX 'another foolish '' name' ON [silly " name](c);
    INSERT INTO [silly " name] VALUES(1, 2, 3);
    INSERT INTO [silly " name] VALUES(4, 5, 6);
    ANALYZE;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx
;DROP INDEX "foolish ' name";
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx
;DROP TABLE "silly "" name";
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx
;CREATE TABLE t4(x,y,z);
    CREATE INDEX t4i1 ON t4(x);
    CREATE INDEX t4i2 ON t4(y);
    INSERT INTO t4 SELECT a,b,c FROM t3
;ANALYZE;
    SELECT idx, stat FROM sqlite_stat1 ORDER BY idx
;PRAGMA writable_schema=on;
    INSERT INTO sqlite_stat1 VALUES(null,null,null);
    PRAGMA writable_schema=off
;SELECT * FROM t4 WHERE x=1234
;PRAGMA writable_schema=on;
    DELETE FROM sqlite_stat1;
    INSERT INTO sqlite_stat1 VALUES('t4','t4i1','nonsense');
    INSERT INTO sqlite_stat1 VALUES('t4','t4i2','120897349817238741092873198273409187234918720394817209384710928374109827172901827349871928741910');
    PRAGMA writable_schema=off
;SELECT * FROM t4 WHERE x=1234
;INSERT INTO sqlite_stat1 VALUES('t4','xyzzy','0 1 2 3')
;SELECT * FROM t4 WHERE x=1234
;DELETE FROM t3;
    DELETE FROM t4;
    INSERT INTO t3 VALUES(1,2,3,4);
    INSERT INTO t3 VALUES(5,6,7,8);
    INSERT INTO t3 SELECT a+8, b+8, c+8, d+8 FROM t3;
    INSERT INTO t3 SELECT a+16, b+16, c+16, d+16 FROM t3;
    INSERT INTO t3 SELECT a+32, b+32, c+32, d+32 FROM t3;
    INSERT INTO t3 SELECT a+64, b+64, c+64, d+64 FROM t3;
    INSERT INTO t4 SELECT a, b, c FROM t3;
    ANALYZE;
    SELECT DISTINCT idx FROM sqlite_stat1 ORDER BY 1;
    SELECT DISTINCT tbl FROM sqlite_stat1 ORDER BY 1
;DROP INDEX t3i2;
    SELECT DISTINCT idx FROM sqlite_stat1 ORDER BY 1;
    SELECT DISTINCT tbl FROM sqlite_stat1 ORDER BY 1
;DROP TABLE t3;
    SELECT DISTINCT idx FROM sqlite_stat1 ORDER BY 1;
    SELECT DISTINCT tbl FROM sqlite_stat1 ORDER BY 1
;PRAGMA writable_schema=on;
    UPDATE sqlite_master SET sql='nonsense' WHERE name='sqlite_stat1';