-- original: fts3cov.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

CREATE VIRTUAL TABLE t1 USING fts3(x);
    INSERT INTO t1(t1) VALUES('nodesize=24');
    BEGIN;
      INSERT INTO t1 VALUES('Is the night chilly and dark?');
      INSERT INTO t1 VALUES('The night is chilly, but not dark.');
      INSERT INTO t1 VALUES('The thin gray cloud is spread on high,');
      INSERT INTO t1 VALUES('It covers but not hides the sky.');
    COMMIT;
    SELECT count(*)>0 FROM t1_segments
;INSERT INTO t1(t1) VALUES('nodesize=24');
    BEGIN;
      INSERT INTO t1 VALUES('The moon is behind, and at the full;');
      INSERT INTO t1 VALUES('And yet she looks both small and dull.');
      INSERT INTO t1 VALUES('The night is chill, the cloud is gray:');
      INSERT INTO t1 VALUES('''T is a month before the month of May,');
      INSERT INTO t1 VALUES('And the Spring comes slowly up this way.');
      INSERT INTO t1 VALUES('The lovely lady, Christabel,');
      INSERT INTO t1 VALUES('Whom her father loves so well,');
      INSERT INTO t1 VALUES('What makes her in the wood so late,');
      INSERT INTO t1 VALUES('A furlong from the castle gate?');
      INSERT INTO t1 VALUES('She had dreams all yesternight');
      INSERT INTO t1 VALUES('Of her own betrothed knight;');
      INSERT INTO t1 VALUES('And she in the midnight wood will pray');
      INSERT INTO t1 VALUES('For the weal of her lover that''s far away.');
    COMMIT
;INSERT INTO t1(t1) VALUES('optimize');
    SELECT substr(hex(root), 1, 2) FROM t1_segdir
;DELETE FROM t1_segments WHERE blockid = sub_left_child
;INSERT INTO t1_segments VALUES(sub_left_child, NULL)
;CREATE VIRTUAL TABLE t3 USING fts3(x);
    INSERT INTO t3(t3) VALUES('nodesize=24');
    INSERT INTO t3(t3) VALUES('maxpending=100')
;CREATE VIRTUAL TABLE t4 USING fts3(x);
    INSERT INTO t4(t4) VALUES('nodesize=24')
;INSERT INTO t4 VALUES('extra!')
;INSERT INTO t4 VALUES('more extra!')
;CREATE VIRTUAL TABLE t5 USING fts3(x)
;INSERT INTO t5 VALUES('termsub_i')
;SELECT count(*) FROM t5_segdir
;INSERT INTO t5 VALUES('termsub_i')
;SELECT count(*) FROM t5_segdir
;CREATE VIRTUAL TABLE t7 USING fts3(a, b, c);
    INSERT INTO t7 VALUES('A', 'B', 'C');
    UPDATE t7 SET docid = 5;
    SELECT docid, * FROM t7
;INSERT INTO t7 VALUES('D', 'E', 'F');
    UPDATE t7 SET docid = 1 WHERE docid = 6;
    SELECT docid, * FROM t7
;BEGIN;
    CREATE VIRTUAL TABLE t8 USING fts3;
    INSERT INTO t8 VALUES('the output of each batch run');
    INSERT INTO t8 VALUES('(possibly a day''s work)');
    INSERT INTO t8 VALUES('was written to two separate disks');
  COMMIT
;CREATE VIRTUAL TABLE xx USING fts3
;INSERT INTO xx(xx) VALUES('optimize')
;CREATE VIRTUAL TABLE t10 USING fts3;
  INSERT INTO t10 VALUES('Optimising images for the web is a tricky business');
  BEGIN;
    INSERT INTO t10 VALUES('You have to get the right balance between')
;CREATE VIRTUAL TABLE xx USING fts3;
    INSERT INTO xx VALUES('one two three');
    INSERT INTO xx VALUES('four five six');
    DELETE FROM xx WHERE docid = 1
;SELECT * FROM xx WHERE xx MATCH 'two'
;CREATE VIRTUAL TABLE t12 USING fts3;
  INSERT INTO t12 VALUES('is one of the two togther');
  BEGIN;
    INSERT INTO t12 VALUES('one which was appropriate at the time')
;PRAGMA encoding = 'UTF-16';
  CREATE VIRTUAL TABLE t13 USING fts3;
  INSERT INTO t13 VALUES('two scalar functions');
  INSERT INTO t13 VALUES('scalar two functions');
  INSERT INTO t13 VALUES('functions scalar two')
;CREATE VIRTUAL TABLE t14 USING fts4(a, b);
  INSERT INTO t14 VALUES('one two three', 'one three four');
  INSERT INTO t14 VALUES('a b c', 'd e a')
;SELECT rowid FROM t14 WHERE t14 MATCH '"one two three"'
;SELECT rowid FROM t14 WHERE t14 MATCH '"one four"'
;SELECT rowid FROM t14 WHERE t14 MATCH '"e a"'
;SELECT rowid FROM t14 WHERE t14 MATCH '"e b"'
;CREATE VIRTUAL TABLE t15 USING fts4(a, b, c);
  INSERT INTO t15 VALUES('abc def ghi', 'abc2 def2 ghi2', 'abc3 def3 ghi3');
  INSERT INTO t15 VALUES('abc2 def2 ghi2', 'abc2 def2 ghi2', 'abc def3 ghi3')
;SELECT rowid FROM t15 WHERE t15 MATCH '"abc* def2"'
;CREATE VIRTUAL TABLE t16 USING fts4;
  INSERT INTO t16 VALUES('theoretical work to examine the relationship');
  INSERT INTO t16 VALUES('solution of our problems on the invisible');
  DELETE FROM t16_content WHERE rowid = 2
;CREATE VIRTUAL TABLE t17 USING fts4;
  INSERT INTO t17(content) VALUES('one one one');
  UPDATE t17_segdir SET root = X'00036F6E65FFFFFFFFFFFFFFFFFFFFFF02030300';