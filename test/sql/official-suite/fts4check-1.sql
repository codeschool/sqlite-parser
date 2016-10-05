-- original: fts4check.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

INSERT INTO sub_tbl (sub_tbl) VALUES('integrity-check')
;CREATE VIRTUAL TABLE t3 USING fts4(x, y, prefix="2,3", languageid=langid)
;SELECT docid FROM t1 ORDER BY 1 ASC
;INSERT INTO t3(x, y, langid) 
      SELECT x, y, (docid%9)*4 FROM t1 WHERE docid=sub_docid
;CREATE VIRTUAL TABLE t4 USING fts4(a, b, c, notindexed=b);
  INSERT INTO t4 VALUES('text one', 'text two', 'text three');
  INSERT INTO t4(t4) VALUES('integrity-check')
;PRAGMA writable_schema = 1;
  UPDATE sqlite_master 
    SET sql = 'CREATE VIRTUAL TABLE t4 USING fts4(a, b, c)' 
    WHERE name = 't4'
;BEGIN;
  CREATE VIRTUAL TABLE t5 USING fts4(a, prefix="1,2,3");
  INSERT INTO t5 VALUES('And down by Kosiosko, where the reed-banks sweep');
  INSERT INTO t5 VALUES('and sway, and the rolling plains are wide, the');
  INSERT INTO t5 VALUES('man from snowy river is a household name today,');
  INSERT INTO t5 VALUES('and the stockmen tell the story of his ride')
;INSERT INTO t5(t5) VALUES('integrity-check')
;CREATE VIRTUAL TABLE t5 USING fts4(a, prefix="1,2,3");
  INSERT INTO t5(t5) VALUES('integrity-check');