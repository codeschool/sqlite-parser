-- original: fts3d.test
-- credit:   http://www.sqlite.org/src/tree?ci=trunk&name=test

DROP TABLE IF EXISTS t1;
  CREATE VIRTUAL TABLE t1 USING fts3(c);
  INSERT INTO t1 (docid, c) VALUES (1, 'This is a test');
  INSERT INTO t1 (docid, c) VALUES (2, 'That was a test');
  INSERT INTO t1 (docid, c) VALUES (3, 'This is a test');
  DELETE FROM t1 WHERE 1=1; -- Delete each row rather than dropping table.
  INSERT INTO t1 (docid, c) VALUES (1, 'This is a test')
;SELECT level, idx FROM t1_segdir ORDER BY level, idx
;SELECT OFFSETS(t1) FROM t1
     WHERE t1 MATCH 'this OR that OR was OR a OR is OR test' ORDER BY docid
;DROP TABLE IF EXISTS t1;
  CREATE VIRTUAL TABLE t1 USING fts3(c);
  INSERT INTO t1 (docid, c) VALUES (1, 'This is a test');
  INSERT INTO t1 (docid, c) VALUES (2, 'That was a test');
  INSERT INTO t1 (docid, c) VALUES (3, 'This is a test');
  DELETE FROM t1 WHERE docid IN (1,3);
  DROP TABLE IF EXISTS t1old;
  ALTER TABLE t1 RENAME TO t1old;
  CREATE VIRTUAL TABLE t1 USING fts3(c);
  INSERT INTO t1 (docid, c) SELECT docid, c FROM t1old;
  DROP TABLE t1old
;SELECT level, idx FROM t1_segdir ORDER BY level, idx
;SELECT OFFSETS(t1) FROM t1
     WHERE t1 MATCH 'this OR that OR was OR a OR is OR test' ORDER BY docid
;DROP TABLE IF EXISTS t1;
  CREATE VIRTUAL TABLE t1 USING fts3(c);
  INSERT INTO t1 (docid, c) VALUES (1, 'This is a test');
  INSERT INTO t1 (docid, c) VALUES (2, 'That was a test');
  INSERT INTO t1 (docid, c) VALUES (3, 'This is a test');
  DELETE FROM t1 WHERE docid IN (1,3);
  SELECT OPTIMIZE(t1) FROM t1 LIMIT 1
;SELECT level, idx FROM t1_segdir ORDER BY level, idx
;SELECT OFFSETS(t1) FROM t1
     WHERE t1 MATCH 'this OR that OR was OR a OR is OR test' ORDER BY docid
;DROP TABLE IF EXISTS t1;
  CREATE VIRTUAL TABLE t1 USING fts3(c);

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
     WHERE t1 MATCH 'this OR that OR was OR a OR is OR test' ORDER BY docid
;SELECT c FROM t1
;SELECT OPTIMIZE(t1) FROM t1 LIMIT 1;
    SELECT level, idx FROM t1_segdir ORDER BY level, idx
;SELECT OFFSETS(t1) FROM t1
     WHERE t1 MATCH 'this OR that OR was OR a OR is OR test' ORDER BY docid
;SELECT OPTIMIZE(t1) FROM t1 LIMIT 1;
    SELECT level, idx FROM t1_segdir ORDER BY level, idx
;UPDATE t1_segdir SET level = 2 WHERE level = 1 AND idx = 0;
    SELECT OPTIMIZE(t1) FROM t1 LIMIT 1;
    SELECT level, idx FROM t1_segdir ORDER BY level, idx
;PRAGMA encoding=UTF8;
    CREATE VIRTUAL TABLE fts USING fts3(a,b,c);
    SELECT name FROM sqlite_master WHERE name GLOB '???_*' ORDER BY 1
;ALTER TABLE fts RENAME TO xyz;
    SELECT name FROM sqlite_master WHERE name GLOB '???_*' ORDER BY 1
;PRAGMA encoding=UTF16le;
    CREATE VIRTUAL TABLE fts USING fts3(a,b,c);
    SELECT name FROM sqlite_master WHERE name GLOB '???_*' ORDER BY 1
;ALTER TABLE fts RENAME TO xyz;
    SELECT name FROM sqlite_master WHERE name GLOB '???_*' ORDER BY 1
;PRAGMA encoding=UTF16be;
    CREATE VIRTUAL TABLE fts USING fts3(a,b,c);
    SELECT name FROM sqlite_master WHERE name GLOB '???_*' ORDER BY 1
;ALTER TABLE fts RENAME TO xyz;
    SELECT name FROM sqlite_master WHERE name GLOB '???_*' ORDER BY 1
;INSERT INTO xyz(xyz) VALUES('merge=2,2')
;ALTER TABLE xyz RENAME TO ott;
    SELECT name FROM sqlite_master WHERE name GLOB '???_*' ORDER BY 1;