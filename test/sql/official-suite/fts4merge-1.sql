-- original: fts4merge.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

INSERT INTO sub_tbl (sub_tbl) VALUES('integrity-check')
;SELECT level, group_concat(idx, ' ') FROM t1_segdir GROUP BY level
;SELECT level, group_concat(idx, ' ') FROM t1_segdir GROUP BY level
;SELECT level, group_concat(idx, ' ') FROM t1_segdir GROUP BY level
;CREATE VIRTUAL TABLE t2 USING sub_mod
;PRAGMA page_size = 512
;SELECT level, group_concat(idx, ' ') FROM t2_segdir GROUP BY level
;INSERT INTO t2(t2) VALUES('merge=1000000,2');
    SELECT level, group_concat(idx, ' ') FROM t2_segdir GROUP BY level
;SELECT level, group_concat(idx, ' ') FROM t4_segdir GROUP BY level
;SELECT quote(value) FROM t4_stat WHERE rowid=1
;DELETE FROM t4_stat WHERE rowid=1;
    INSERT INTO t4(t4) VALUES('merge=1,12');
    SELECT level, group_concat(idx, ' ') FROM t4_segdir GROUP BY level
;SELECT level, group_concat(idx, ' ') FROM t1_segdir GROUP BY level
;INSERT INTO t1(t1) VALUES('merge=1,5');
    INSERT INTO t1(t1) VALUES('merge=1,5');
    SELECT level, group_concat(idx, ' ') FROM t1_segdir GROUP BY level
;SELECT quote(value) from t1_stat WHERE rowid=1
;SELECT docid FROM t1
;INSERT INTO t1 SELECT * FROM t1 WHERE docid=sub_docid
;SELECT quote(value) from t1_stat WHERE rowid=1
;SELECT level, group_concat(idx, ' ') FROM t1_segdir GROUP BY level;
    SELECT quote(value) from t1_stat WHERE rowid=1
;INSERT INTO t1(t1) VALUES('merge=1,6');
    INSERT INTO t1(t1) VALUES('merge=1,6');
    SELECT level, group_concat(idx, ' ') FROM t1_segdir GROUP BY level;
    SELECT quote(value) from t1_stat WHERE rowid=1
;SELECT docid FROM t1 UNION ALL SELECT docid FROM t1 LIMIT sub_L
;INSERT INTO t1 SELECT * FROM t1 WHERE docid=sub_docid
;SELECT level, group_concat(idx, ' ') FROM t1_segdir GROUP BY level;
    SELECT quote(value) from t1_stat WHERE rowid=1
;INSERT INTO t1(t1) VALUES('merge=1,6');
    SELECT level, group_concat(idx, ' ') FROM t1_segdir GROUP BY level;
    SELECT quote(value) from t1_stat WHERE rowid=1
;CREATE VIRTUAL TABLE t1 USING sub_mod
;BEGIN;
        INSERT INTO t1 VALUES(sub_a);
        INSERT INTO t1 VALUES(sub_b);
      COMMIT;
      BEGIN;
        INSERT INTO t1 VALUES(sub_c);
        INSERT INTO t1 VALUES(sub_d);
      COMMIT
;INSERT INTO t1(t1) VALUES('merge=1,2');
      INSERT INTO t1(t1) VALUES('merge=1,2')
;SELECT level, group_concat(idx, ' ') FROM t1_segdir GROUP BY level
;INSERT INTO t1(t1) VALUES('merge=2,10')
;INSERT INTO t1(t1) VALUES('merge=200,10')
;INSERT INTO t1(t1) VALUES('merge=200,10')
;INSERT INTO t1(t1) VALUES('merge=200,10');