-- original: securedel2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA secure_delete = 1
;PRAGMA auto_vacuum = 0
;CREATE TABLE t1(x, y)
;INSERT INTO t1 VALUES(sub_x, sub_y)
;PRAGMA secure_delete = 0
;DELETE FROM t1 WHERE rowid = 1
;PRAGMA secure_delete = 1
;DELETE FROM t1 WHERE rowid = 1
;DELETE FROM t1 WHERE rowid>850
;PRAGMA cache_size = 200;
    PRAGMA secure_delete = 1;
    CREATE TABLE t2(x);
    SELECT * FROM t1
;INSERT INTO t2 VALUES(randomblob(sub_i))
;DELETE FROM t1;