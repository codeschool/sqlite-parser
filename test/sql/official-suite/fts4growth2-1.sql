-- original: fts4growth2.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE TABLE t1(docid, words)
;SELECT level, count(*) FROM x1_segdir GROUP BY level
;DELETE FROM x1 
      WHERE docid IN (SELECT docid FROM t1 WHERE (rowid-1)%4==sub_val+0)
;INSERT INTO x1(docid, content) 
      SELECT docid, words FROM t1 WHERE (rowid%4)==sub_val+0
;CREATE VIRTUAL TABLE x1 USING fts4;
  INSERT INTO x1(x1) VALUES('automerge=2')
;SELECT max(level) FROM x1_segdir; 
    SELECT count(*) FROM x1_segdir WHERE level=2
;SELECT max(level) FROM x1_segdir; 
    SELECT count(*) FROM x1_segdir WHERE level=2
;DELETE FROM t1 WHERE rowid>16;
  DROP TABLE IF EXISTS x1;
  CREATE VIRTUAL TABLE x1 USING fts4
;SELECT max(level) FROM x1_segdir;