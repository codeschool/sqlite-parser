-- original: fts2p.test
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
  INSERT INTO t1 (rowid, c) VALUES (3, 'This is a test')
;SELECT level, idx FROM t1_segdir ORDER BY level, idx
;SELECT OFFSETS(t1) FROM t1
     WHERE t1 MATCH 'this OR that OR was OR a OR is OR test' ORDER BY rowid
;DROP TABLE IF EXISTS t1;
  CREATE VIRTUAL TABLE t1 USING fts2(c);
  INSERT INTO t1 (rowid, c) VALUES (1, 'This is a test');
  INSERT INTO t1 (rowid, c) VALUES (2, 'That was a test');
  INSERT INTO t1 (rowid, c) VALUES (3, 'This is a test');
  DELETE FROM t1 WHERE rowid = 1
;SELECT level, idx FROM t1_segdir ORDER BY level, idx
;SELECT OFFSETS(t1) FROM t1
     WHERE t1 MATCH 'this OR that OR was OR a OR is OR test' ORDER BY rowid
;DROP TABLE IF EXISTS t1;
  CREATE VIRTUAL TABLE t1 USING fts2(c);
  INSERT INTO t1 (rowid, c) VALUES (1, 'This is a test');
  INSERT INTO t1 (rowid, c) VALUES (2, 'That was a test');
  INSERT INTO t1 (rowid, c) VALUES (3, 'This is a test');
  DELETE FROM t1 WHERE rowid IN (1,3)
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
     WHERE t1 MATCH 'this OR that OR was OR a OR is OR test' ORDER BY rowid;