-- original: fts4growth.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE x1 USING fts3
;INSERT INTO x1 VALUES(sub_L)
;SELECT end_block, length(root) FROM x1_segdir
;INSERT INTO x1(x1) VALUES('optimize');
  SELECT level, end_block, length(root) FROM x1_segdir
;INSERT INTO x1 VALUES(sub_L)
;INSERT INTO x1(x1) VALUES('merge=4,4');
    SELECT level, end_block, length(root) FROM x1_segdir
;SELECT length(block) FROM x1_segments
;INSERT INTO x1 VALUES(sub_L)
;SELECT level, end_block, length(root) FROM x1_segdir
;SELECT sum(length(block)) FROM x1_segments WHERE blockid IN (129, 130)
;CREATE TABLE t1(docid, words);
  CREATE VIRTUAL TABLE x2 USING fts4
;SELECT docid FROM t1
;INSERT INTO x2(docid, content) SELECT sub_id, words FROM t1 WHERE docid=sub_id
;SELECT docid FROM t1
;INSERT INTO x2(docid, content) SELECT NULL, words FROM t1 WHERE docid=sub_id
;SELECT count(*) FROM x2_segdir WHERE level=2;
  SELECT count(*) FROM x2_segdir WHERE level=3
;INSERT INTO x2(x2) VALUES('merge=4,4');
  SELECT count(*) FROM x2_segdir WHERE level=2;
  SELECT count(*) FROM x2_segdir WHERE level=3
;SELECT end_block FROM x2_segdir WHERE level=3;
  INSERT INTO x2(x2) VALUES('merge=4,4');
  SELECT end_block FROM x2_segdir WHERE level=3;
  INSERT INTO x2(x2) VALUES('merge=4,4');
  SELECT end_block FROM x2_segdir WHERE level=3
;SELECT sum(length(block)) FROM x2_segdir, x2_segments WHERE 
    blockid BETWEEN start_block AND leaves_end_block
    AND level=3
;INSERT INTO x2(x2) VALUES('merge=1000,4');
  SELECT end_block FROM x2_segdir WHERE level=3
;SELECT sum(length(block)) FROM x2_segdir, x2_segments WHERE 
    blockid BETWEEN start_block AND leaves_end_block
    AND level=3
;REPLACE INTO x3(docid, content) VALUES(sub_iDoc, sub_L)
;DELETE FROM x3 WHERE docid = sub_iDoc
;CREATE VIRTUAL TABLE x3 USING fts4
;SELECT level, idx, second(end_block) FROM x3_segdir
;SELECT count(*) FROM x3_segdir
;SELECT level, idx, second(end_block) FROM x3_segdir
;INSERT INTO x3(x3) VALUES('optimize')
;SELECT level, idx, second(end_block) FROM x3_segdir
;DELETE FROM x3
;SELECT count(*) FROM x3_segdir
;INSERT INTO x3(x3) VALUES('merge=500,10')
;SELECT level, idx, second(end_block) FROM x3_segdir
;DELETE FROM x3
;SELECT count(*) FROM x3_segdir
;SELECT level, idx, second(end_block) FROM x3_segdir WHERE level=1
;DROP TABLE IF EXISTS x4;
  DROP TABLE IF EXISTS t1;
  CREATE TABLE t1(docid, words);
  CREATE VIRTUAL TABLE x4 USING fts4(words)
;INSERT INTO x4 SELECT words FROM t1
;INSERT INTO x4 SELECT words FROM t1
;SELECT level, idx, second(end_block) FROM x4_segdir
;INSERT INTO x4(x4) VALUES('merge=10,2');
  SELECT count(*) FROM x4_segdir
;INSERT INTO x4(x4) VALUES('merge=10,2');
  SELECT count(*) FROM x4_segdir
;INSERT INTO x4(x4) VALUES('merge=1000,2');
  SELECT count(*) FROM x4_segdir
;DROP TABLE IF EXISTS x2;
  DROP TABLE IF EXISTS t1;
  CREATE TABLE t1(docid, words);
  CREATE VIRTUAL TABLE x2 USING fts4
;SELECT rowid FROM t1
;INSERT INTO x2(docid, content) SELECT docid, words FROM t1 WHERE rowid=sub_r
;SELECT docid FROM t1 LIMIT -1 OFFSET 20
;DELETE FROM x2 WHERE docid = sub_d
;INSERT INTO x2(x2) VALUES('optimize');
    SELECT level, idx, end_block FROM x2_segdir
;UPDATE x2_segdir SET end_block = CAST( first(end_block) AS INTEGER );
  SELECT end_block, typeof(end_block) FROM x2_segdir
;INSERT INTO x2 SELECT words FROM t1 LIMIT 50;
  SELECT level, idx, end_block FROM x2_segdir
;UPDATE x2_segdir SET end_block = end_block || ' 1926' WHERE level=2;
  INSERT INTO x2 SELECT words FROM t1 LIMIT 40;
  SELECT level, idx, end_block FROM x2_segdir
;SELECT docid FROM t1 LIMIT 2
;DELETE FROM x2 WHERE docid=sub_id;
      INSERT INTO x2(docid, content) SELECT sub_id, words FROM t1 WHERE docid=sub_id
;CREATE VIRTUAL TABLE x5 USING fts4;
  INSERT INTO x5 SELECT words FROM t1 LIMIT 100 OFFSET 0;
  INSERT INTO x5 SELECT words FROM t1 LIMIT 100 OFFSET 25;
  INSERT INTO x5 SELECT words FROM t1 LIMIT 100 OFFSET 50;
  INSERT INTO x5 SELECT words FROM t1 LIMIT 100 OFFSET 75;
  SELECT count(*) FROM x5_segdir
;INSERT INTO x5(x5) VALUES('merge=2,4');
  SELECT level, idx, end_block FROM x5_segdir
;INSERT INTO x5 SELECT words FROM t1 LIMIT 100 OFFSET 100;
  SELECT level, idx, end_block FROM x5_segdir
;INSERT INTO x5(x5) VALUES('merge=200,4');
  SELECT level, idx, end_block FROM x5_segdir
;INSERT INTO x5 SELECT words FROM t1;
  SELECT level, idx, end_block FROM x5_segdir
;CREATE VIRTUAL TABLE x6 USING fts4;
  INSERT INTO x6 SELECT words FROM t1;
  INSERT INTO x6 SELECT words FROM t1;
  INSERT INTO x6 SELECT words FROM t1;
  INSERT INTO x6 SELECT words FROM t1;
  INSERT INTO x6 SELECT words FROM t1;
  INSERT INTO x6 SELECT words FROM t1;
  SELECT level, idx, end_block FROM x6_segdir
;INSERT INTO x6(x6) VALUES('merge=25,4');
  SELECT level, idx, end_block FROM x6_segdir
;UPDATE x6_segdir SET end_block = first(end_block) WHERE level=1;
  SELECT level, idx, end_block FROM x6_segdir
;INSERT INTO x6(x6) VALUES('merge=25,4');
  SELECT level, idx, end_block FROM x6_segdir
;INSERT INTO x6(x6) VALUES('merge=2500,4');
  SELECT level, idx, end_block FROM x6_segdir
;INSERT INTO x6(x6) VALUES('merge=2500,2');
  SELECT level, idx, start_block, leaves_end_block, end_block FROM x6_segdir
;SELECT sum(length(block)) FROM x6_segments 
  WHERE blockid BETWEEN 23695 AND 24147;