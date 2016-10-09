-- original: tkt-78e04e52ea.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE ""("" UNIQUE, x CHAR(100));
    CREATE TABLE t2(x);
    INSERT INTO ""("") VALUES(1);
    INSERT INTO t2 VALUES(2);
    SELECT * FROM "", t2
;PRAGMA table_info("")
;CREATE INDEX i1 ON ""("" COLLATE nocase)
;EXPLAIN QUERY PLAN SELECT "" FROM "" WHERE "" LIKE 'abc%'
;DROP TABLE "";
    SELECT name FROM sqlite_master
;CREATE INDEX "" ON t2(x);
    EXPLAIN QUERY PLAN SELECT * FROM t2 WHERE x=5
;DROP INDEX "";
    EXPLAIN QUERY PLAN SELECT * FROM t2 WHERE x=2;