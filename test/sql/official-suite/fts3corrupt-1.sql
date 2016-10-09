-- original: fts3corrupt.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts3;
  INSERT INTO t1 VALUES('hello')
;UPDATE t1_segdir SET root = sub_blob
;INSERT INTO t1 VALUES(sub_w)
;DROP TABLE t1
;CREATE VIRTUAL TABLE t1 USING fts3;
  BEGIN;
    INSERT INTO t1 VALUES('hello');
    INSERT INTO t1 VALUES('hello');
    INSERT INTO t1 VALUES('hello');
    INSERT INTO t1 VALUES('hello');
    INSERT INTO t1 VALUES('hello');
  COMMIT
;UPDATE t1_segdir SET root = sub_blob
;DROP TABLE t1;
  CREATE VIRTUAL TABLE t1 USING fts3;
  BEGIN;
    INSERT INTO t1 VALUES('hello');
    INSERT INTO t1 VALUES('world');
  COMMIT
;UPDATE t1_segdir SET root = sub_blob
;DROP TABLE t1;
  CREATE VIRTUAL TABLE t1 USING fts3;
  INSERT INTO t1(t1) VALUES('nodesize=24')
;INSERT INTO t1 VALUES(sub_s)
;DROP TABLE t1;
  CREATE VIRTUAL TABLE t1 USING fts4
;INSERT INTO t1 VALUES('one')
;INSERT INTO t1 VALUES('two')
;INSERT INTO t1 VALUES('three')
;INSERT INTO t1 VALUES('four');