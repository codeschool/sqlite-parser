-- original: fts4merge4.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts4
;INSERT INTO t1 VALUES('a b c d e f g h i j k l')
;INSERT INTO t1 VALUES('a b c d e f g h i j k l')
;INSERT INTO t1(t1) VALUES('merge=8,50');
    COMMIT
;CREATE VIRTUAL TABLE t1 USING fts4
;INSERT INTO t1 VALUES('a b c d e f g h i j k l')
;SELECT count(*) FROM t1_segdir
;INSERT INTO t1(t1) VALUES('optimize')
;SELECT count(*) FROM t1_segdir
;CREATE VIRTUAL TABLE t2 USING fts4
;DELETE FROM t2
;INSERT INTO t2(t2) VALUES(sub_am)
;BEGIN;
            INSERT INTO t2 VALUES(sub_doc);
            INSERT INTO t2 VALUES(sub_doc);
            INSERT INTO t2 VALUES(sub_doc);
            INSERT INTO t2 VALUES(sub_doc);
            INSERT INTO t2 VALUES(sub_doc);
          COMMIT
;SELECT level, count(*) FROM t2_segdir GROUP BY level;