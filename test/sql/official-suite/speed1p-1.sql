-- original: speed1p.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

PRAGMA page_size=1024;
    PRAGMA cache_size=500;
    PRAGMA locking_mode=EXCLUSIVE;
    CREATE TABLE t1(a INTEGER, b INTEGER, c TEXT);
    CREATE TABLE t2(a INTEGER, b INTEGER, c TEXT);
    CREATE INDEX i2a ON t2(a);
    CREATE INDEX i2b ON t2(b)
;SELECT name FROM sqlite_master ORDER BY 1
;INSERT INTO t1 VALUES(sub_i,sub_r,sub_x)
;INSERT INTO t2 VALUES(sub_i,sub_r,sub_x)
;SELECT count(*), avg(b) FROM t1 WHERE b>=sub_lwr AND b<sub_upr
;SELECT count(*), avg(b) FROM t1 WHERE c LIKE sub_pattern
;SELECT count(*), avg(b) FROM t1 WHERE b>=sub_lwr AND b<sub_upr
;SELECT c FROM t1 WHERE rowid=sub_id
;SELECT c FROM t1 WHERE a=sub_id
;SELECT c FROM t1 ORDER BY random() LIMIT 50000
;SELECT c FROM t1 WHERE c=sub_c
;UPDATE t1 SET b=b*2 WHERE a>=sub_lwr AND a<sub_upr
;UPDATE t1 SET b=sub_r WHERE a=sub_i
;UPDATE t1 SET c=sub_x WHERE a=sub_i;