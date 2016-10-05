-- original: btree02.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(a TEXT, ax INTEGER, b INT, PRIMARY KEY(a,ax)) WITHOUT ROWID;
  WITH RECURSIVE c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<10)
    INSERT INTO t1(a,ax,b) SELECT printf('%02x',i), random(), i FROM c;
  CREATE INDEX t1a ON t1(a);
  CREATE TABLE t2(x,y);
  CREATE TABLE t3(cnt);
  WITH RECURSIVE c(i) AS (VALUES(1) UNION ALL SELECT i+1 FROM c WHERE i<4)
    INSERT INTO t3(cnt) SELECT i FROM c;
  SELECT count(*) FROM t1
;SELECT a, ax, b, cnt FROM t1 CROSS JOIN t3 WHERE b IS NOT NULL
;INSERT INTO t2(x,y) VALUES(sub_b,sub_cnt)
;INSERT INTO t1(a,ax,b) VALUES(printf('(%s)',sub_a),random(),sub_bx)
;DELETE FROM t1 WHERE a=sub_a
;COMMIT; BEGIN;