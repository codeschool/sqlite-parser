-- original: fts2q.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

DROP TABLE IF EXISTS t1;
  CREATE VIRTUAL TABLE t1 USING fts2(c);
  INSERT INTO t1 (rowid, c) VALUES (1, 'x')
;SELECT dump_terms(t1, sub_level, sub_index) FROM t1 LIMIT 1
;SELECT dump_terms(t1) FROM t1 LIMIT 1
;DROP TABLE IF EXISTS t1;
  CREATE VIRTUAL TABLE t1 USING fts2(c);
  INSERT INTO t1 (rowid, c) VALUES (1, 'This is a test');
  INSERT INTO t1 (rowid, c) VALUES (2, 'That was a test');
  INSERT INTO t1 (rowid, c) VALUES (3, 'This is a test');
  DELETE FROM t1 WHERE 1=1; -- Delete each row rather than dropping table.
  INSERT INTO t1 (rowid, c) VALUES (1, 'This is a test')
;SELECT level, idx FROM t1_segdir ORDER BY level, idx
;SELECT OFFSETS(t1) FROM t1
     WHERE t1 MATCH 'this OR that OR was OR a OR is OR test' ORDER BY rowid
;DROP TABLE IF EXISTS t1;
  CREATE VIRTUAL TABLE t1 USING fts2(c);
  INSERT INTO t1 (rowid, c) VALUES (1, 'This is a test');
  INSERT INTO t1 (rowid, c) VALUES (2, 'That was a test');
  INSERT INTO t1 (rowid, c) VALUES (3, 'This is a test');
  DELETE FROM t1 WHERE rowid IN (1,3);
  DROP TABLE IF EXISTS t1old;
  ALTER TABLE t1 RENAME TO t1old;
  CREATE VIRTUAL TABLE t1 USING fts2(c);
  INSERT INTO t1 (rowid, c) SELECT rowid, c FROM t1old;
  DROP TABLE t1old
;SELECT level, idx FROM t1_segdir ORDER BY level, idx
;SELECT OFFSETS(t1) FROM t1
     WHERE t1 MATCH 'this OR that OR was OR a OR is OR test' ORDER BY rowid
;DROP TABLE IF EXISTS t1;
  CREATE VIRTUAL TABLE t1 USING fts2(c);
  INSERT INTO t1 (rowid, c) VALUES (1, 'This is a test');
  INSERT INTO t1 (rowid, c) VALUES (2, 'That was a test');
  INSERT INTO t1 (rowid, c) VALUES (3, 'This is a test');
  DELETE FROM t1 WHERE rowid IN (1,3);
  SELECT OPTIMIZE(t1) FROM t1 LIMIT 1
;SELECT level, idx FROM t1_segdir ORDER BY level, idx
;SELECT OFFSETS(t1) FROM t1
     WHERE t1 MATCH 'this OR that OR was OR a OR is OR test' ORDER BY rowid
;DROP TABLE IF EXISTS t1;
  CREATE VIRTUAL TABLE t1 USING fts2(c);

  INSERT INTO t1 (rowid, c) VALUES (1, 'This is a test');
  INSERT INTO t1 (rowid, c) VALUES (2, 'That was a test');
  INSERT INTO t1 (rowid, c) VALUES (3, 'This is a test');

  UPDATE t1 SET c = 'This is a test one' WHERE rowid = 1;
  UPDATE t1 SET c = 'That was a test one' WHERE rowid = 2;
  UPDATE t1 SET c = 'This is a test one' WHERE rowid = 3;

  UPDATE t1 SET c = 'This is a test two' WHERE rowid = 1;
  UPDATE t1 SET c = 'That was a test two' WHERE rowid = 2;
  UPDATE t1 SET c = 'This is a test two' WHERE rowid = 3;

  UPDATE t1 SET c = 'This is a test three' WHERE rowid = 1;
  UPDATE t1 SET c = 'That was a test three' WHERE rowid = 2;
  UPDATE t1 SET c = 'This is a test three' WHERE rowid = 3;

  UPDATE t1 SET c = 'This is a test four' WHERE rowid = 1;
  UPDATE t1 SET c = 'That was a test four' WHERE rowid = 2;
  UPDATE t1 SET c = 'This is a test four' WHERE rowid = 3;

  UPDATE t1 SET c = 'This is a test' WHERE rowid = 1;
  UPDATE t1 SET c = 'That was a test' WHERE rowid = 2;
  UPDATE t1 SET c = 'This is a test' WHERE rowid = 3
;SELECT level, idx FROM t1_segdir ORDER BY level, idx
;SELECT OFFSETS(t1) FROM t1
     WHERE t1 MATCH 'this OR that OR was OR a OR is OR test' ORDER BY rowid
;SELECT OPTIMIZE(t1) FROM t1 LIMIT 1;
    SELECT level, idx FROM t1_segdir ORDER BY level, idx
;SELECT OFFSETS(t1) FROM t1
     WHERE t1 MATCH 'this OR that OR was OR a OR is OR test' ORDER BY rowid
;SELECT OPTIMIZE(t1) FROM t1 LIMIT 1;
    SELECT level, idx FROM t1_segdir ORDER BY level, idx
;UPDATE t1_segdir SET level = 2 WHERE level = 1 AND idx = 0;
    SELECT OPTIMIZE(t1) FROM t1 LIMIT 1;
    SELECT level, idx FROM t1_segdir ORDER BY level, idx;