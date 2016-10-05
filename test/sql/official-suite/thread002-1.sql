-- original: thread002.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(k, v);
      CREATE INDEX t1_i ON t1(v);
      INSERT INTO t1(v) VALUES(1.0)
;ATTACH 'testsub_T.db' AS auxsub_ii
;SELECT * FROM aux1.t1
;INSERT INTO aux1.t1(v) SELECT sum(v) FROM aux2.t1
;SELECT * FROM aux2.t1
;INSERT INTO aux2.t1(v) SELECT sum(v) FROM aux3.t1
;SELECT * FROM aux3.t1
;INSERT INTO aux3.t1(v) SELECT sum(v) FROM aux1.t1
;CREATE TABLE IF NOT EXISTS aux1.t2(a,b)
;DROP TABLE IF EXISTS aux1.t2
;SELECT count(*) FROM t1
;PRAGMA integrity_check;