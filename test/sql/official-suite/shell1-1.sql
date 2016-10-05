-- original: shell1.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

DROP VIEW v1; DROP VIEW v2; DROP TABLE t1
;PRAGMA encoding=UTF16;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(null), (''), (1), (2.25), ('hello'), (x'807f');
    CREATE TABLE t3(x,y);
    INSERT INTO t3 VALUES(1,null), (2,''), (3,1),
                         (4,2.25), (5,'hello'), (6,x'807f')
;PRAGMA encoding=UTF8;
    CREATE TABLE t1(x);
    INSERT INTO t1 VALUES(null), (''), (1), (2.25), ('hello'), (x'807f')
;CREATE TABLE t2(x,y);
    INSERT INTO t2 VALUES(null, ''), (1, 2.25), ('hello', x'807f');