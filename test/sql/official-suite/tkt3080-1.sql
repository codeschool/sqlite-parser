-- original: tkt3080.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

SELECT execsql('CREATE TABLE t1(x)')
;SELECT name FROM sqlite_master
;INSERT INTO t1 VALUES('CREATE TABLE t2(y);');
    SELECT execsql(x) FROM t1
;SELECT name FROM sqlite_master
;INSERT INTO t1 VALUES('CREATE TABLE t3(z); DROP TABLE t3;')
;SELECT name FROM sqlite_master
;SELECT execsql(x) FROM t1
;SELECT name FROM sqlite_master
;SELECT * FROM t2;